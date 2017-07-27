# d3-area-label

A label placement library for area charts.

![image](https://user-images.githubusercontent.com/68416/28669943-0e11fa72-72f4-11e7-9aef-0c575cb20825.png)

## Installing

If you use NPM, `npm install d3-area-label`. Otherwise, download the [latest release](https://github.com/curran/d3-area-label/releases/latest).

## API Reference

<a href="#area-label" name="area-label">#</a> <b>areaLabel</b>(<i>area</i>)

Computes the optimal position and size for a label. Also positions the label using SVG transform.

Example usage (from [test/index.html](test/index.html)):

```js
const area = d3.area()
  .x(d => xScale(xValue(d.data)))
  .y0(d => yScale(d[0]))
  .y1(d => yScale(d[1]))
  
const paths = svg.selectAll('path').data(stacked)
paths
  .enter().append('path')
    .attr('fill-opacity', areaFillOpacity)
  .merge(paths)
    .attr('d', area)

const labels = svg.selectAll('text').data(stacked)
labels
  .enter().append('text')
    .attr('class', 'area-label')
  .merge(labels)
    .text(d => d.key)
    .each(d3.areaLabel(area))
```

# Thanks

Many thanks to Lee Byron, Noah Veltman, Philippe Rivière, and Adam Pearce for ideas and input.
