// Finds the largest value that passes the test within some epsilon tolerance.
// See https://en.wikipedia.org/wiki/Bisection_method#Algorithm
function bisection(a, b, test, epsilon, maxIterations) {
  var i, c, passesTest, withinEpsilon;
  for(i = 0; i < maxIterations; i++){
    c = (a + b) / 2;
    passesTest = test(c);
    withinEpsilon = (b - a) / 2 < epsilon;

    // In our case, the returned value *must* pass the test,
    // so it's not enough only to check if the value is within epsilon.
    if ( passesTest && withinEpsilon) {
      return c;
    }
    if (passesTest) {
      a = c;
    } else {
      b = c;
    }
  }
  return null;
}

function areaLabel(area) {
  var x,
      y0,
      y1,
      bisectorX,

      // TODO move these words into README and out of code.
      // The minimum label bounding box height in pixels.
      minHeight = 2,

      // The maximum label bounding box height in pixels.
      maxHeight = 1000,

      // The tolerance within we wish to optimize the bounding box height.
      epsilon = 0.01,

      // The maximum number of iterations for the bisection method.
      // Typical iterations for convervence on 0.001 epsilon are between 15 and 20.
      maxIterations = 100,

      padding = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      };


  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, height, justTest) {
    var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,
        width = aspect * height,
        xMax = x(data[data.length - 1]);

    // Check if we can fit the rectangle at an X position
    // corresponding with one of the X values from the data.
    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;

      // Don't go off the right edge of the area.
      if (x1 > xMax) {
        break;
      }
      
      // Test until we reach the rightmost X position
      // within the X positions of the data points.
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

        // Break as soon as we know the rectangle wil not fit.
        if ((floor - ceiling) < height) {
          break;
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
          y: ceiling,
          width: width
        };
      }
    }
    return false;
  }

  function my(data) {

    // The bounding box of the text label as-is.
    var box = this.getBBox();

    // Account for padding.
    var paddingFactorX = 1 + padding.left + padding.right;
    var paddingFactorY = 1 + padding.top + padding.bottom;
    var boxWidth = box.width * paddingFactorX;
    var boxHeight = box.height * paddingFactorY;

    // The aspect ratio of the text label bounding box.
    var aspect = boxWidth / boxHeight;

    // The test function for use in the bisection method.
    var test = function (testHeight){
      return fits(data, aspect, testHeight, true);
    };

    // Use the bisection method to find the largest height label that fits.
    var height = bisection(minHeight, maxHeight, test, epsilon, maxIterations);
    var width = aspect * height;

    // Get the X and Y coordinates for the largest height label that fits.
    var fit = fits(data, aspect, height);

    // Account for padding.
    var fitX = fit.x + width / paddingFactorX * padding.left;
    var fitY = fit.y + height / paddingFactorY * padding.top;

    // Translate and scale the label to the computed position and size.
    return [
      "translate(" + fitX + "," + fitY + ")",
      "scale(" + height / boxHeight + ")",
      "translate(" + -box.x + "," + -box.y + ")"
    ].join(" ");
  }

  my.x = function(_) {
    if (arguments.length) {
      x = _;
      bisectorX = d3.bisector(x).right;
      return my;
    }
    return x;
  };

  my.y0 = function(_) {
    return arguments.length ? (y0 = _, my) : y0;
  };

  my.y1 = function(_) {
    return arguments.length ? (y1 = _, my) : y1;
  };

  my.area = function(area) {
    my.x(area.x()).y0(area.y0()).y1(area.y1());
  };

  my.minHeight = function(_) {
    return arguments.length ? (minHeight = +_, my) : minHeight;
  };

  // TODO compute this from the area, no need to have this constant.
  my.maxHeight = function(_) {
    return arguments.length ? (maxHeight = +_, my) : maxHeight;
  };

  my.epsilon = function(_) {
    return arguments.length ? (epsilon = +_, my) : epsilon;
  };

  my.maxIterations = function(_) {
    return arguments.length ? (maxIterations = +_, my) : maxIterations;
  };

  if (area) {
    my.area(area);
  }

  return my;
};

export default areaLabel;
