d3.json('data.json', data => {
  vis(data.braille)
})

function vis(codes) {
  const chart = d3.select('#vis')

  for (const code of codes) {
    const container = chart.append('div')
      .attr('class', 'container')

    container.append('h1')
      .text(code.character)

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
