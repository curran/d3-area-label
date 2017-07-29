# d3-area-label

A library for placing labels in areas.

[![image](https://user-images.githubusercontent.com/68416/28669943-0e11fa72-72f4-11e7-9aef-0c575cb20825.png)](https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b)

Example usage:

```js
const labels = svg.selectAll('text').data(stacked)
labels
  .enter().append('text')
    .attr('class', 'area-label')
  .merge(labels)
    .text(d => d.key)
    .attr('transform', d3.areaLabel(area)) // <---------- Call the function like this.
```

For more details and context, see [test/index.html](test/index.html) or [run the example on bl.ocks.org](https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b).

## Installing

If you use NPM, `npm install d3-area-label`. Otherwise, download the [latest release](https://github.com/curran/d3-area-label/releases/latest).

## API Reference

<a href="#area-label" name="area-label">#</a> d3.<b>areaLabel</b>([<i>area</i>])

Constructs a new label position generator.

If *area* is specified, invokes <a href="#area"><i>areaLabel</i>.<b>area</b></a> as well (equivalent to `d3.areaLabel().area(area)`).

<a name="_areaLabel" href="#_areaLabel">#</a> <i>areaLabel</i>(<i>data</i>)

Invoke the label position generator with the given *data* array.

This function computes the optimal position and size for a label and returns an SVG transform string.

<a name="area" href="#area">#</a> <i>areaLabel</i>.<b>area</b>(<i>area</i>)

Sets the *[x](#x)*, *[y0](#y0)*, and *[y1](#y1)* accessors applied to the data array from the given *area*, an instance of [d3.area](https://github.com/d3/d3-shape#area).

<a name="x" href="#x">#</a> <i>xLabel</i>.<b>x</b>(<i>x</i>)

If *x* is specified, sets the x accessor applied to the data array and returns the label position generator. If *x* is not specified, returns the current x.

<a name="y0" href="#y0">#</a> <i>y0Label</i>.<b>y0</b>(<i>y0</i>)

If *y0* is specified, sets the y0 accessor applied to the data array and returns the label position generator. If *y0* is not specified, returns the current y0.

<a name="y1" href="#y1">#</a> <i>y1Label</i>.<b>y1</b>(<i>y1</i>)

If *y1* is specified, sets the y1 accessor applied to the data array and returns the label position generator. If *y1* is not specified, returns the current y1.

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
