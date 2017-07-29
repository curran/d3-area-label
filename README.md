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

Constructs a new label position generator. If *area* is specified, sets [area](#area) as well (equivalent to `d3.areaLabel().area(area)`).

<a name="_areaLabel" href="#_areaLabel">#</a> <i>areaLabel</i>(<i>data</i>)

Invoke the label position generator with the given *data* array. This function computes the optimal position and size for a label and returns an SVG transform string.

<a name="area" href="#area">#</a> <i>areaLabel</i>.<b>area</b>([<i>area</i>])

Sets the x, y0, and y1 accessors applied to the data array from the given *area*, an instance of [d3.area](https://github.com/d3/d3-shape#area).

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
