d3.json('data.json', data => {
  vis(data.braille)
})

function vis(codes) {
  const chart = d3.select('#vis')
  for (const { key, group } of groupby(codes, code => code.category)) {
    chart.append('h2').text((key + 's').toUpperCase())
    for (const code of group) {
      const container = chart.append('div')
        .attr('class', 'container')
      container.append('h3')
        .text(code.symbol)
      container.append('svg')
        .attr('width', 80)
        .attr('height', 100)
        .selectAll('circle')
        .data(code.dots)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => (i % 2 + 1) * 20)
        .attr('cy', (d, i) => `${(Math.floor(i / 2) + 1) * 20}px`)
        .attr('r', '3px')
        .transition()
        .duration(400)
        .delay(400)
        .attr('r', d => `${(d * 3) + 3}px`)
    }
  }
}

function groupby (iterable, keyfunc) {
  const ret = []
  for (const elem of iterable) {
    const key = keyfunc(elem)
    if (ret.length === 0 || ret[ret.length - 1].key !== key) {
      ret.push({
        key,
        group: [elem]
      })
    } else {
      ret[ret.length - 1].group.push(elem)
    }
  }
  return ret
}
