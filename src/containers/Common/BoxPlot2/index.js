/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { nest } from 'd3-collection';
import LoaderCmp from '../../Common/Loader';
import { useState } from 'react';

const BoxPlot = React.forwardRef(({ view_type, box_data, chart_type, watermarkCss }, ref) => {
  const [loader, setLoader] = useState(false);
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);

  function drawChart(d_) {
    // set the dimensions and margins of the graph
    let childnode = document.getElementById('box2');
    if (childnode.hasChildNodes()) {
      while (childnode.firstChild) {
        childnode.removeChild(childnode.firstChild);
      }
    }

    var margin = { top: 15, right: 50, bottom: 60, left: 50 },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    if (d_['datasets'].length > width) {
      width = d_['datasets'].length + 3000;
    }

    let childnode_ = document.getElementById('box3');
    if (childnode_.hasChildNodes()) {
      while (childnode_.firstChild) {
        childnode_.removeChild(childnode_.firstChild);
      }
    }

    var svg1 = d3
      .select('#box3')
      .append('svg')
      .attr('width', 250)
      .attr('height', height - 450 + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Adding tumor vs Normal Legends
    svg1.append('circle').attr('cx', 20).attr('cy', -5).attr('r', 6).style('fill', 'red');
    svg1
      .append('text')
      .attr('x', 30)
      .attr('y', 1)
      .text('Tumor')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'top');
    svg1.append('circle').attr('cx', 90).attr('cy', -5).attr('r', 6).style('fill', 'blue');
    svg1
      .append('text')
      .attr('x', 100)
      .attr('y', 1)
      .text('Normal')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'top');

    var max_vl = 5; //d_['max']
    var min_vl = 0; //d_['min']
    var domains = [];
    var sumstat = nest()
      .key(function (d) {
        return d.Species;
      })
      .rollup(function (d) {
        var t = [];
        var n = [];
        for (var i = 0; i < d.length; i++) {
          if (domains.includes(d[i]['Species']) === false) {
            domains.push(d[i]['Species']);
          }

          if (d[i]['type'] === 'T') {
            let q1 = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'T') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.25
            );
            let median = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'T') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.5
            );
            let q3 = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'T') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.75
            );
            let interQuantileRange = q3 - q1;
            let min = q1 - 1.5 * interQuantileRange;
            let max = q3 + 1.5 * interQuantileRange;

            t.push({
              q1: q1,
              median: median,
              q3: q3,
              interQuantileRange: interQuantileRange,
              min: min,
              max: max,
              Sepal_Length: d[i]['Sepal_Length'],
              type: 'T',
              Sample: d[i]['Sample']
            });

            if (min < min_vl) {
              min_vl = min;
            }
            if (max > max_vl) {
              max_vl = max + 2;
            }
          } else {
            let q1 = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'N') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.25
            );
            let median = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'N') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.5
            );
            let q3 = d3.quantile(
              d
                .map(function (g) {
                  if (g.type === 'N') return g.Sepal_Length;
                })
                .sort(d3.ascending),
              0.75
            );
            let interQuantileRange = q3 - q1;
            let min = q1 - 1.5 * interQuantileRange;
            let max = q3 + 1.5 * interQuantileRange;
            // let min = q1 - interQuantileRange;
            // let max = q3 - interQuantileRange;
            n.push({
              q1: q1,
              median: median,
              q3: q3,
              interQuantileRange: interQuantileRange,
              min: min,
              max: max,
              Sepal_Length: d[i]['Sepal_Length'],
              type: 'N',
              Sample: d[i]['Sample']
            });
            if (min < min_vl) {
              min_vl = min;
            }
            if (max > max_vl) {
              max_vl = max + 2;
            }
          }
        }
        return [t, n];
      })
      .entries(d_['datasets']);

    var svg = d3
      .select('#box2')
      .append('svg')
      .attr('width', 250 * sumstat.length + 250)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var tooltip = d3
      .select('#box2_tooltip')
      // .append("div").attr('class', 'boxplot_tooltip')
      .style('opacity', 1)

      .style('background-color', 'lavender')
      .style('padding', '1%');
    // Show the X scale
    var x = d3
      .scaleBand()
      .range([0, 250 * sumstat.length + 250])
      .domain(domains)
      .paddingInner(1)
      .paddingOuter(0.5);

    if (chart_type === 'proteome') {
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));
    } else {
      svg
        .append('g')
        .attr('transform', 'translate(-50,' + height + ')')
        .call(d3.axisBottom(x));
    }

    // Show the Y scale
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(function () {
        if (chart_type === 'proteome') {
          return 'Proteome expression';
        } else {
          return 'RNA expression';
        }
      });

    svg
      .append('text')
      .attr('transform', 'translate(' + width / 2 + ' ,' + (height + margin.top + 20) + ')')
      .style('text-anchor', 'middle');

    var y = d3
      .scaleLinear()
      .domain([min_vl - 1, max_vl])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    for (var i = 0; i < sumstat.length; i++) {
      var p = svg.append('g').attr('class', 'box').attr('id', i);

      var key = x(sumstat[i]['key']) - 50;
      var vl = sumstat[i]['value'];
      let p_value = d_['p_value'][sumstat[i]['key']];

      if (vl[1].length > 0) {
        p.selectAll('medianLines')
          .data([key])
          .enter()
          .append('line')
          .attr('x1', function () {
            return key - 8;
          })
          .attr('x2', function () {
            return key + 50;
          })
          .attr('y1', function () {
            return 10;
          })
          .attr('y2', function () {
            return 10;
          })
          .attr('stroke', 'black')
          .attr('class', 'pvalue');

        p.selectAll('medianLines')
          .data([key])
          .enter()
          .append('text')
          .attr('x', function () {
            return key;
          })
          .attr('y', function () {
            return 0;
          })
          .text('P-value:' + p_value);
      }
      for (var z = 0; z < vl.length; z++) {

        // First the boxes should render, so the scatter points will not overide the boxes.
        var boxWidth = 50;
        p.selectAll('boxes')
          .data(vl[z])
          .enter()
          .append('rect')
          .attr('x', function () {
            return key - boxWidth / 2;
          })
          .attr('y', function (d) {
            return y(d.q3);
          })
          .attr('height', function (d) {
            return y(d.q1) - y(d.q3) + 3;
          })
          .attr('width', boxWidth)
          .attr('stroke', 'black')
          .style('fill', '#fff')
          .on('mouseover', (d, i) => {
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
              .html(
                'Sample: &nbsp;' +
                BrstKeys[i.Sample] +
                `<br/>${view_type === 'gene_vl' ? 'gene val' : 'z-score'} &nbsp;` +
                i.Sepal_Length
              )
              .style('right', height - 25 + 'px')
              .style('top', height - 255 + 'px');
          })
          .on('mouseout', () => { });


        var jitterWidth = 50;
        let maxCx = 0;
        let minCx = 0;
        p.selectAll('indPoints')
          .data(vl[z])
          .enter()
          .append('circle')
          .attr('cx', function () {
            let pos = key - jitterWidth / 2 + Math.random() * jitterWidth;

            return pos;
          })
          .attr('cy', function (d) {

            let pos = y(d.Sepal_Length)
            if (minCx == 0) {
              minCx = pos
            }
            if (pos > maxCx) {
              maxCx = pos;
            }
            else if (pos < minCx) {
              minCx = pos
            }
            return pos;
          })
          .attr('r', 2)
          .style('fill', function (d) {
            if (d['type'] === 'N') {
              return 'blue';
            } else {
              return 'red';
            }
          })
          .attr('stroke', function (d) {
            if (d['type'] === 'N') {
              return 'blue';
            } else {
              return 'red';
            }
          })
          .on('mouseover', (d, i) => {
            tooltip.transition().duration(200).style('opacity', 1);
            tooltip.html(
              'Sample: &nbsp;' +
              BrstKeys[i.Sample] +
              `<br/>${view_type === 'gene_vl' ? 'gene val' : 'z-score'} &nbsp;` +
              i.Sepal_Length
            );

            if (document.getElementById('filterBoxCmp')) {
              tooltip.style('left', d.pageX - 550 + 'px');
              tooltip.style('top', d.pageY - 150 + 'px');
            } else {
              tooltip.style('right', height - 25 + 'px');
              tooltip.style('top', height - 255 + 'px');
            }
          })
          .on('mouseout', () => {
            tooltip.transition().duration(500).style('opacity', 1);
          });


        p.selectAll('vertLines')
          .data(vl[z])
          .enter()
          .append('line')
          .attr('x1', function () {
            return key;
          })
          .attr('x2', function () {
            return key;
          })
          .attr('y1', function (d) {
            return maxCx
          })
          .attr('y2', function (d) {
            return minCx
          })
          .attr('stroke', 'black');


        p.selectAll('medianLines')
          .data(vl[z])
          .enter()
          .append('line')
          .attr('x1', function () {
            return key - boxWidth / 2;
          })
          .attr('x2', function () {
            return key + boxWidth / 2;
          })
          .attr('y1', function (d) {
            return y(d.median);
          })
          .attr('y2', function (d) {
            return y(d.median);
          })
          .attr('class', 'black')
          .attr('stroke', 'black');
        p.selectAll('medianLines')
          .data(vl[z])
          .enter()
          .append('line')
          .attr('x1', function () {
            return key - boxWidth / 2;
          })
          .attr('x2', function () {
            return key + boxWidth / 2;
          })
          .attr('y1', function (d) {
            // return y(d.max);
            return minCx
          })
          .attr('y2', function (d) {
            // return y(d.max);
            return minCx
          })
          .attr('stroke', 'black')
          .attr('class', 'red black');

        p.selectAll('medianLines')
          .data(vl[z])
          .enter()
          .append('line')
          .attr('x1', function () {
            return key - boxWidth / 2;
          })
          .attr('x2', function () {
            return key + boxWidth / 2;
          })
          .attr('y1', function (d) {
            // return y(d.min);
            return maxCx
          })
          .attr('y2', function (d) {
            // return y(d.min);
            return maxCx
          })
          .attr('class', 'grey black')
          .attr('stroke', 'black');

        key = key + 80;
      }
      setLoader(false);
    }
  }

  useEffect(() => {
    if (Object.keys(box_data).length !== 0) {
      setLoader(true);
      drawChart(box_data);
    }
  }, [box_data]);

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <>
          <div id="box3"></div>
          <div
            ref={ref}
            className={watermarkCss + 'w-full overflow-x-auto '}
            style={{ overflowX: 'auto', position: 'relative', width: '100%' }}
            id="box2"
          ></div>{' '}
        </>
      )}
    </>
  );
});

export default BoxPlot;
