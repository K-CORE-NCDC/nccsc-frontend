import * as d3 from 'd3';
import React, { useEffect } from 'react';

export default function Genefusion() {
  function drawChart() {
    var margin = { top: 20, right: 50, bottom: 60, left: 50 };
    var svg = d3
      .select('#genefusion')
      .append('svg')
      .attr('width', 960)
      .attr('height', 200)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + -50 + ')');
    let domains = [
      { startCodon: 1, endCodon: 259, label: 'ENST00000394121', color: '#4EADBC' },
      { startCodon: 12000, endCodon: 12349, label: 'ENST00000394121', color: '#5EC53C' },
      { startCodon: 14679, endCodon: 14746, label: 'ENST00000394121', color: '#000E0C' },
      { startCodon: 15316, endCodon: 15416, label: 'ENST00000394121', color: '#26E802' },
      { startCodon: 21643, endCodon: 21790, label: 'ENST00000394121', color: '#3476D9' },
      { startCodon: 22418, endCodon: 22623, label: 'ENST00000394121', color: '#D0D4EF' },
      { startCodon: 24515, endCodon: 24661, label: 'ENST00000394121', color: '#4D16EA' },
      { startCodon: 26050, endCodon: 26308, label: 'ENST00000394121', color: '#DB935A' },
      { startCodon: 27014, endCodon: 27141, label: 'ENST00000394121', color: '#68FF6F' },
      { startCodon: 30828, endCodon: 31421, label: 'ENST00000394121', color: '#07BF4C' }
    ];
    var x = d3.scaleBand().range([0, 31421]).domain(domains).paddingInner(1).paddingOuter(0.5);
    svg
      .append('g')
      .attr('transform', 'translate(-50,' + 31421 + ')')
      .call(d3.axisBottom(x));

    svg
      .selectAll('boxes')
      .data(domains)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d);
      })
      .attr('width', function (d) {
        return d.endCodon - d.startCodon;
      })
      .attr('y', function (d) {
        return d.startCodon;
      })
      .attr('height', function () {
        return 20;
      })
      .attr('fill', function (d) {
        return d.color;
      });
    // .style("fill", "#69b3a2")
  }

  useEffect(() => {
    drawChart();
  }, []);

  return <div id="genefusion"></div>;
}
