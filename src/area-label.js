export default function(area) {
  var x = area.x();
  var y0 = area.y0();
  var y1 = area.y1();
  var bisectorX = d3.bisector(x).right;

  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, height, justTest) {
    var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,
        width = aspect * height,
        xMax = x(data[data.length - 1]);

    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;

      if (x1 > xMax) {
        break;
      }
      
      i1 = bisectorX(data, x1);
      ceiling = -Infinity;
      floor = Infinity;
      for(j = i0; j < i1; j++) {
        d = data[j];

        bottom = y0(d);
        if(bottom < floor) {
          floor = bottom;
        }

        top = y1(d);
        if(top > ceiling) {
          ceiling = top;
        }
      }
      if ((floor - ceiling) >= height) {
        if (justTest) {
          return true;
        }
        return {
          x: x0,
          y: ceiling
        };
      }
    }
    return false;
  }

  return function (data) {
  
    // TODO make all this stuff configurable
    var fontUnit = "px";
    var measuredFontSize = 12;
    var minHeight = 2;

    var textNode = this;
    var text = d3.select(textNode)
        .attr("font-size", measuredFontSize + fontUnit);
    var measuredBox = textNode.getBBox();
    var measuredHeight = measuredBox.height;
    var measuredWidth = measuredBox.width;
    var aspect = measuredWidth / measuredHeight;
    var fontToHeightRatio = measuredFontSize / measuredHeight;

    // Find largest integer scale where label would fit.
    // TODO use Bisector method to speed up this part.
    var height = minHeight;
    while (fits(data, aspect, height, true)) {
      height++;
    }
    height--;
    var fit = fits(data, aspect, height);
    var fontSize = fontToHeightRatio * height;

    //var d = data[0];
    //console.log(x(d), y0(d), y1(d));

    // This is how we could set the x, y, and font-size
    d3.select(this)
      .attr("x", fit.x)
      .attr("y", fit.y)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "hanging")
      .attr("font-size", fontSize + fontUnit)
  }
};
