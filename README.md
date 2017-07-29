# d3-area-label

A library for placing labels in areas.

[![image](https://user-images.githubusercontent.com/68416/28669943-0e11fa72-72f4-11e7-9aef-0c575cb20825.png)](https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b)
Example: https://bl.ocks.org/curran/2793201c7025c416c471e30d30546c6b

## Installing

If you use NPM, `npm install d3-area-label`. Otherwise, download the [latest release](https://github.com/curran/d3-area-label/releases/latest).

## API Reference

<a href="#area-label" name="area-label">#</a> <b>areaLabel</b>(<i>area</i>)

Returns a function that computes the optimal position and size for a label and returns a transform string.

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

For more details and context, see [test/index.html](test/index.html).

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
