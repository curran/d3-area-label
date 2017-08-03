// Returns a transform string that will
// translate and scale the label to the computed position and size.
const toTransformString = function (){
  return [
    "translate(" + this.xTranslate + "," + this.yTranslate + ")",
    "scale(" + this.scale + ")"
  ].join(" ");
};

function areaLabel(area) {
  var x,
      y0,
      y1,
      bisectorX,
      minHeight = 2,
      epsilon = 0.01,
      maxIterations = 100,
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      paddingBottom = 0,
      xValues = 100,
      xValuesScale = d3.scaleLinear(),
      numIterations;

  // Gets the height of the area for a particular datum.
  function getHeight(d) {
    return y0(d) - y1(d);
  }

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
        numIterations = i;
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
  
  function interpolate(data, xValue, yAccessor) {
    var i = bisectorX(data, xValue, 0, data.length - 1);
    if (i > 0) {
      var a = data[i - 1];
      var b = data[i];
      var t = (xValue - x(a)) / (x(b) - x(a));
      return yAccessor(a) * (1 - t) + yAccessor(b) * t;
    }
    return yAccessor(data[i]);
  }

  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, height, justTest) {
    var x0, x1, i0, i1, j, xValue, top, bottom, ceiling, floor,
        width = aspect * height,
        xMax = x(data[data.length - 1]);

    // Check if we can fit the rectangle at an X position
    // corresponding with one of the X values from the data.
    for (i0 = 0; i0 < xValues; i0++) {
      x0 = xValuesScale(i0);
      x1 = x0 + width;

      // Don't go off the right edge of the area.
      if (x1 > xMax) {
        break;
      }
      
      // Test until we reach the rightmost X position
      // within the X positions of the data points.
      ceiling = -Infinity;
      floor = Infinity;
      i1 = xValuesScale.invert(x1);
      for(j = i0; j <= i1; j++) {
        xValue = xValuesScale(j);

        bottom = interpolate(data, xValue, y0);
        top = interpolate(data, xValue, y1);

        if(bottom < floor) {
          floor = bottom;
        }

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

        // Output the solution for use in label transform.
        return {
          x: x0,
          y: ceiling,
          width: width,
          height: height
        };
      }
    }
    return false;
  }

  function my(data) {

    // The bounding box of the text label as-is.
    var box = this.getBBox();

    // Account for padding.
    var paddingFactorX = 1 + paddingLeft + paddingRight;
    var paddingFactorY = 1 + paddingTop + paddingBottom;
    var boxWidth = box.width * paddingFactorX;
    var boxHeight = box.height * paddingFactorY;

    // The aspect ratio of the text label bounding box.
    var aspect = boxWidth / boxHeight;

    // Compute maximum possible label bounding box height in pixels.
    var maxHeight = d3.max(data, getHeight);

    // Compute the X extent once, to be reused for every height test.
    xValuesScale
      .domain([0, xValues - 1])
      .range(d3.extent(data, x));

    // The test function for use in the bisection method.
    var test = function (testHeight){
      return fits(data, aspect, testHeight, true);
    };

    // Use the bisection method to find the largest height label that fits.
    var height = bisection(minHeight, maxHeight, test, epsilon, maxIterations);

    // If there's not any position that works,
    // return an object that will scale the label down to nothing,
    // and indicate that the algorithm failed.
    if (height === null) {
      return {
        failed: true,
        numIterations: maxIterations,
        scale: 0,
        xTranslate: 0,
        yTranslate: 0,
        toString: toTransformString
      };
    }

    // Get the (x, y, width, height) for the largest height label that fits.
    var fit = fits(data, aspect, height);

    // Account for padding.
    var xInner = fit.x + fit.width / paddingFactorX * paddingLeft;
    var yInner = fit.y + fit.height / paddingFactorY * paddingTop;

    // Compute the scale and translate.
    fit.scale = height / boxHeight;
    fit.xTranslate = xInner - fit.scale * box.x;
    fit.yTranslate = yInner - fit.scale * box.y;

    // Expose the toString method, which generates a transform string.
    fit.toString = toTransformString;

    // Expose how many iterations the bisection method took.
    fit.numIterations = numIterations;

    return fit;
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

  my.epsilon = function(_) {
    return arguments.length ? (epsilon = +_, my) : epsilon;
  };

  my.maxIterations = function(_) {
    return arguments.length ? (maxIterations = +_, my) : maxIterations;
  };

  my.xValues = function(_) {
    return arguments.length ? (xValues = +_, my) : xValues;
  };

  my.paddingLeft = function(_) {
    return arguments.length ? (paddingLeft = +_, my) : paddingLeft;
  };

  my.paddingRight = function(_) {
    return arguments.length ? (paddingRight = +_, my) : paddingRight;
  };

  my.paddingTop = function(_) {
    return arguments.length ? (paddingTop = +_, my) : paddingTop;
  };

  my.paddingBottom = function(_) {
    return arguments.length ? (paddingBottom = +_, my) : paddingBottom;
  };

  my.paddingX = function(_) {
    my.paddingLeft(_).paddingRight(_);
  };

  my.paddingY = function(_) {
    my.paddingTop(_).paddingBottom(_);
  };

  my.padding = function(_) {
    my.paddingX(_).paddingY(_);
  };

  if (area) {
    my.area(area);
  }

  return my;
};

export default areaLabel;
