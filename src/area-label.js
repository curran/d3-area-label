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
        height = scale / aspect;

    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;
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
        return true;
      }
    }
    return false;
  }

  return function (data) {
    var aspect = getAspectRatio(this);
    var scale = 5;
    while (fits(data, aspect, scale)) {
      scale++;
    }
    scale--;

    console.log("scale = " + scale);

    //var d = data[0];
    //console.log(x(d), y0(d), y1(d));

    // This is how we could set the x, y, and font-size
    d3.select(this)
      .attr('x', 300 + Math.random() * 200)
      .attr('y', 200 + Math.random() * 200)
      .attr('font-size', Math.random() * 40 + 'px');
  }
};
