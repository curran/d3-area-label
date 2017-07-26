function getAspectRatio(textNode) {
  var box = textNode.getBBox();
  return box.width / box.height;
}

export default function(area) {
  var x = area.x();
  var y0 = area.y0();
  var y1 = area.y1();
  var bisectorX = d3.bisector(x);

  // Returns true if there is at least one rectangle
  // of the given aspect ratio and scale
  // that fits somewhere within the area.
  function fits(data, aspect, scale) {
    var x0,
        x1,
        i0,
        i1,
        j,
        d,
        top,
        bottom,
        width = scale * aspect,
        height = scale / aspect;

    for(i0 = 0; i0 < data.length; i0++) {
      d = data[i0];
      x0 = x(d);
      x1 = x0 + width;
      i1 = bisectorX.right(data, x1);

      console.log("width " + width);
      console.log("height " + height);
      console.log("x0 " + x0);
      console.log("x1 " + x1);
      console.log("i0 " + i0);
      console.log("i1 " + i1);

      // TODO compute top and bottom,
      // TODO return true if (top-bottom) <= height
      //if(test(data, x0, x1, h
      //top = y0(d);
      //bottom = y1(d);
      //j = i;
      //while(x(d) < x1 && j < data.length) {
      //  d = data[j]
      //  j++;
      //}

      return false;
    }
  }

  return function (data) {
    var aspect = getAspectRatio(this);
    var scale = 5;

    console.log(fits(data, aspect, scale));

    //var d = data[0];
    //console.log(x(d), y0(d), y1(d));

    // This is how we could set the x, y, and font-size
    d3.select(this)
      .attr('x', 300 + Math.random() * 200)
      .attr('y', 200 + Math.random() * 200)
      .attr('font-size', Math.random() * 40 + 'px');
  }
};
