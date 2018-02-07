d3.json('data.json', data => {
  vis(data.braille)
})

function vis(codes) {
  const chart = d3.select('#chart')

  const svgs = chart.selectAll('svg')
    .data(codes)
    .enter()
    .append('svg')
    .attr('width', 80)
    .attr('height', 100)

  svgs.selectAll('circle')
    .data(d => d.dots)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => (i % 2 + 1) * 20)
    .attr('cy', (d, i) => `${(Math.floor(i / 2) + 1) * 20}px`)
    // .attr('r', 0)
    // .transition()
    // .duration(400)
    // .delay(400)
    .attr('r', d => `${(d * 3) + 3}px`)
}
