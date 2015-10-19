$(function() {
  $("#json-obj").bind("input propertychange", sync("stringify"));
  $("#json-str").bind("input propertychange", sync("parse"));
});

function sync(op) {
  return function() {
    var $inEls = { parse: $("#json-str"), stringify: $("#json-obj") };
    var $outEls = { parse: $("#json-obj"), stringify: $("#json-str") };
    var opts = getOpts();
    var output = "";

    try {
      output = JSON[op]($inEls[op].val());
    } catch(e) {
      output = "";
    }

    if (opts.stripcr && (op === "stringify")) {
      output = output.replace("\n", "");
    }

    $outEls[op].val(output);
  };
}

function getOpts() {
  var opts = {};
  var $opts = $("input[type='checkbox']");

  $opts.each(function() {
    opts[this.value] = this.checked;
  });

  return opts;
}
