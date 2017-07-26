function getAspectRatio(textNode) {
  var box = textNode.getBBox();
  return box.width / box.height;
}

export default function(area) {
  var x = area.x();
  var y0 = area.y0();
  var y1 = area.y1();
  var bisectorX = d3.bisector(x).right;

  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, scale) {
    var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,
        width = scale * aspect,
        height = scale / aspect,
        right = x(data[data.length - 1]);

    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;

      if (x1 > right) {
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
        return {
          x: (x0 + x1) / 2,
          y: (floor + ceiling) / 2
        };
      }
    }
    return false;
  }

  return function (data) {
    var aspect = getAspectRatio(this);

    // Find largest integer scale where label would fit.
    // TODO use Bisector method to speed up this part.
    var scale = 5;
    while (fits(data, aspect, scale)) {
      scale++;
    }
    scale--;
    var fit = fits(data, aspect, scale);


    //var d = data[0];
    //console.log(x(d), y0(d), y1(d));

    // This is how we could set the x, y, and font-size
    d3.select(this)
      .attr("x", fit.x)
      .attr("y", fit.y)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("font-size", Math.round(scale * 0.2) + "px")
  }
};
