# d3-area-label

A library for placing labels in areas.

[![image](https://user-images.githubusercontent.com/68416/28745722-a5d9e7a4-749b-11e7-92a8-227a56cd3ead.png)](https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b)

You can use this to position labels on a StreamGraph or Stacked Area Chart.

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

<a name="x" href="#x">#</a> <i>areaLabel</i>.<b>x</b>(<i>x</i>)

If *x* is specified, sets the x accessor applied to the data array and returns the label position generator. If *x* is not specified, returns the current x.

<a name="y0" href="#y0">#</a> <i>areaLabel</i>.<b>y0</b>(<i>y0</i>)

If *y0* is specified, sets the y0 accessor applied to the data array and returns the label position generator. If *y0* is not specified, returns the current y0.

<a name="y1" href="#y1">#</a> <i>areaLabel</i>.<b>y1</b>(<i>y1</i>)

If *y1* is specified, sets the y1 accessor applied to the data array and returns the label position generator. If *y1* is not specified, returns the current y1.

<a name="minHeight" href="#minHeight">#</a> <i>areaLabel</i>.<b>minHeight</b>(<i>minHeight</i>)

The minimum label bounding box height in pixels. Default is 2.

<a name="epsilon" href="#epsilon">#</a> <i>areaLabel</i>.<b>epsilon</b>(<i>epsilon</i>)

The tolerance within we wish to optimize the bounding box height (in pixels). Default is 0.01;

<a name="maxIterations" href="#maxIterations">#</a> <i>areaLabel</i>.<b>maxIterations</b>(<i>maxIterations</i>)

The maximum number of iterations for the [bisection method algorithm](https://en.wikipedia.org/wiki/Bisection_method#Algorithm), which is used to find the maximum height rectangle that fits within the area.

<a name="paddingLeft" href="#paddingLeft">#</a> <i>areaLabel</i>.<b>paddingLeft</b>(<i>paddingLeft</i>)

The left padding for labels. This should be a value between 0 and 1. Default is 0.

<a name="paddingRight" href="#paddingRight">#</a> <i>areaLabel</i>.<b>paddingRight</b>(<i>paddingRight</i>)

The right padding for labels. This should be a value between 0 and 1. Default is 0.

<a name="paddingTop" href="#paddingTop">#</a> <i>areaLabel</i>.<b>paddingTop</b>(<i>paddingTop</i>)

The top padding for labels. This should be a value between 0 and 1. Default is 0.

<a name="paddingBottom" href="#paddingBottom">#</a> <i>areaLabel</i>.<b>paddingBottom</b>(<i>paddingBottom</i>)

The bottom padding for labels. This should be a value between 0 and 1. Default is 0.

<a name="paddingX" href="#paddingX">#</a> <i>areaLabel</i>.<b>paddingX</b>(<i>paddingX</i>)

A convenience method for simultaneously setting *[paddingLeft](#paddingLeft)* and *[paddingRight](#paddingRight)*.

<a name="paddingY" href="#paddingY">#</a> <i>areaLabel</i>.<b>paddingY</b>(<i>paddingY</i>)

A convenience method for simultaneously setting *[paddingTop](#paddingTop)* and *[paddingBottom](#paddingBottom)*.

<a name="padding" href="#padding">#</a> <i>areaLabel</i>.<b>padding</b>(<i>padding</i>)

A convenience method for simultaneously setting *[paddingX](#paddingX)* and *[paddingY](#paddingY)*.

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
