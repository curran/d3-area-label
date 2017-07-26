export default function(area) {
  return function (data) {
    var x = area.x();
    var y0 = area.y0();
    var y1 = area.y1();

    console.log(this.getBBox()) // We can measure the text aspect ratio from here.
    console.log(data) // We can access the area polygon from here, with `area`

    var d = data[0];
    console.log(x(d), y0(d), y1(d));

    // This is how we could set the x, y, and font-size
    d3.select(this)
      .attr('x', 300 + Math.random() * 200)
      .attr('y', 200 + Math.random() * 200)
      .attr('font-size', Math.random() * 40 + 'px');
  }
};
