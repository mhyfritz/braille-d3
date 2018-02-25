d3.json('data.json', data => {
  vis(data.braille)
})

function vis(codes) {
  const chart = d3.select('#vis')
  for (const group of R.groupWith((a, b) => a.category === b.category, codes)) {
    chart.append('h2').text((group[0].category + 's'))
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
        .attr('cx', (d, i) => (Math.floor(i / 3) + 1) * 20)
        .attr('cy', (d, i) => (i % 3 + 1) * 20)
        .attr('r', 3)
        .transition()
        .ease(d3.easeBackOut)
        .delay(1000)
        .duration(1000)
        .attr('r', d => (d * 3) + 3)
    }
  }
}
