var tape = require("tape"),
    areaLabel = require("../");

tape("areaLabel() returns the answer to the ultimate question of life, the universe, and everything.", function(test) {
  test.equal(areaLabel.areaLabel(), 42);
  test.end();
});
