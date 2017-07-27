// See https://en.wikipedia.org/wiki/Bisection_method#Algorithm
function bisection(a, b, f, epsilon, maxIterations) {
  var i, c, fc;
  for(i = 0; i < maxIterations; i++){
    c = (a + b) / 2;
    fc = f(c)
    if( fc && (b - a) / 2 < epsilon ) {
      return c;
    }
    if(fc) {
      a = c
    } else {
      b = c
    }
  }
  return null;
}

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

        // Avoid creating new objects unnecessarily while just testing.
        if (justTest) {
          return true;
        }

        // Output the coordinates for use in label transform.
        return {
          x: x0,
          y: ceiling
        };
      }
    }
    return false;
  }

  return function (data) {
  
    // TODO make these configurable

    // The minimum label bounding box height in pixels.
    var minHeight = 2;

    // The maximum label bounding box height in pixels.
    var maxHeight = 1000;

    // The tolerance within we wish to optimize the bounding box height.
    var epsilon = 0.1;

    // The maximum number of iterations for the bisection method.
    var maxIterations = 1000;

    var bbox = this.getBBox();
    var aspect = bbox.width / bbox.height;

    var f = testHeight => fits(data, aspect, testHeight, true);
    var height = bisection(minHeight, maxHeight, f, epsilon, maxIterations);

    var fit = fits(data, aspect, height);

    d3.select(this)
        .attr("transform", [
          "translate(" + fit.x + "," + fit.y + ")",
          "scale(" + height / bbox.height + ")",
          "translate(" + -bbox.x + "," + -bbox.y + ")"
        ].join(" "));
  }
};
