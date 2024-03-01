var tape = require("tape"),
  d3 = require("../build/d3-area-label");

tape(
  "areaLabel() returns the answer to the ultimate question of life, the universe, and everything.",
  function (test) {
    test.equal(typeof d3.areaLabel, "function");
    test.end();
  }
);
