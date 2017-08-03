// Determines whether or not a rectangle
// of the given width and height
// fits in side the given area.
export default function fits(options) {

  // Internall variables.
  var x0, x1, i0, i1, j, d, top, bottom, ceiling, floor,

      // The width in pixels of the rectangle to test.
      width = options.width,

      // The height in pixels of the rectangle to test.
      height = options.height,

      // The data that defines the area to test against.
      data = options.data,

      // A boolean that indicates we're only interested
      // in a Boolean return value, not full solution details.
      justTest = options.justTest,

      // The maximum X value.
      xMax = options.xMax,

      // A function that returns the index in the data array
      // that comes before the X value passed into it.
      xIndex = options.xIndex,

      // The X value accessor.
      x = options.x,

      // The Y0 value accessor.
      y1 = options.y1,

      // The Y1 value accessor.
      y0 = options.y0;

  // Check if we can fit the rectangle at an X position
  // corresponding with one of the X values from the data.
  for(i0 = 0; i0 < data.length; i0++) {
    d = data[i0];

    // The left edge of the rectangle.
    x0 = x(d);

    // The right edge of the rectangle.
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

    // If the rectangle fits at the current x0 position,
    // the report that the rectangle indeed fits.
    if ((floor - ceiling) >= height) {

      // Avoid creating new objects unnecessarily while just testing.
      if (justTest) {
        return true;
      }

      // Output the full solution for use in label transform.
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
