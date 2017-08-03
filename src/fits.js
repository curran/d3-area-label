
export default function fits(options) {
  var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,
      data = options.data,
      aspect = options.aspect,
      width = options.width,
      height = options.height,
      justTest = options.justTest,
      xMax = options.xMax,
      xIndex = options.xIndex;

  // Check if we can fit the rectangle at an X position
  // corresponding with one of the X values from the data.
  for(i0 = 0; i0 < data.length; i0++) {
    d = data[i0];
    x0 = d.x;
    x1 = x0 + width;

    // Don't go off the right edge of the area.
    if (x1 > xMax) {
      break;
    }
    
    // Test until we reach the rightmost X position
    // within the X positions of the data points.
    i1 = xIndex(x1);
    ceiling = -Infinity;
    floor = Infinity;
    for(j = i0; j <= i1; j++) {
      d = data[j];

      bottom = d.y0;
      if(bottom < floor) {
        floor = bottom;
      }

      top = d.y1;
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
};
