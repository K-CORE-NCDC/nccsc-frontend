import React, { useState, useEffect, useRef } from 'react';
import d3 from 'd3v3/d3';
import '../../../styles/sankey.css';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';

function NewSankeyd3({ SankeyJson, idName, forGene, screenCapture, setToFalseAfterScreenCapture, tabName }) {
  const svgRef = useRef(null);
  const intl = useIntl();
  const [watermarkCss, setWatermarkCSS] = useState('');

  var margin = { top: 1, right: 1, bottom: 6, left: 1 },
    width = 960 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

  const drawChart = (energyjson) => {
    var sankey = d3.sankey().nodeWidth(15).nodePadding(10).size([width, height]);
    let color_types = {
      hugo_symbol: '#1f77b4',
      variant_classification: '#17becf',
      dbsnp_rs: '#ff7f0e',
      diseasename: '#e377c2',
      drugname: '#9467bd'
    };

    var formatNumber = d3.format(',.0f'),
      format = function (d) {
        return formatNumber(d) + ' TWh';
      };

    var svg1 = d3
      .select(`#${idName}`)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height)
      .attr('class', 'inline mt-5');
    var svg = svg1
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var path = sankey.link();
    var nodeMap = {};
    let maxNode = {
      hugo_symbol: 0,
      variant_classification: 0,
      dbsnp_rs: 0,
      diseasename: 0,
      drugname: 0
    };
    energyjson.nodes.forEach(function (x) {
      nodeMap[x.name] = x;
      maxNode[x['type']] = maxNode[x['type']] + 1;
    });
    let maxNameCount = 0;
    let maxName = '';
    for (const key in maxNode) {
      if (maxNode[key] > maxNameCount) {
        maxNameCount = maxNode[key];
        maxName = key;
      }
    }
    energyjson.links = energyjson.links.map(function (x) {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
      };
    });
    sankey.nodes(energyjson.nodes).links(energyjson.links).layout(32);

    var link = svg
      .append('g')
      .selectAll('.link')
      .data(energyjson.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', path)
      .attr('id', function (d, i) {
        d.id = i;
        return 'link-' + i;
      })
      // .style('stroke-width', function (d) {
      // return Math.max(1, d.dy);
      .style('stroke-width', function () {
        return Math.max(1, 10);
      })
      .sort(function (a, b) {
        return b.dy - a.dy;
      });

    link.append('title').text(function (d) {
      return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
    });

    var node = svg
      .append('g')
      .selectAll('.node')
      .data(energyjson.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .on('click', highlight_node_links)
      .call(
        d3.behavior
          .drag()
          .origin(function (d) {
            return d;
          })
          .on('drag', dragmove)
      );

    var heigthCalc = 0;
    node
      .append('rect')
      .attr('height', function (d) {
        if (d['type'] === maxName) {
          heigthCalc = heigthCalc + 20;
        }
        return d.dy;
      })
      .attr('width', sankey.nodeWidth())
      .style('fill', function (d) {
        let t = d['type'];
        return color_types[t];
      })
      .style('stroke', function (d) {
        return d3.rgb(d.color).darker(2);
      })
      .append('title')
      .text(function (d) {
        return d.name + '\n' + format(d.value);
      });

    node
      .append('text')
      .attr('x', -6)
      .attr('y', function (d) {
        return d.dy / 2;
      })
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('transform', null)
      .text(function (d) {
        return d.name;
      })
      .filter(function (d) {
        return d.x < width / 2;
      })
      .attr('x', 6 + sankey.nodeWidth())
      .attr('text-anchor', 'start');

    function dragmove(d) {
      d3.select(this).attr(
        'transform',
        'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ')'
      );
      sankey.relayout();
      link.attr('d', path);
    }

    function highlight_node_links(node) {
      var remainingNodes = [],
        nextNodes = [];

      var stroke_opacity = 0;
      if (d3.select(this).attr('data-clicked') === '1') {
        d3.select(this).attr('data-clicked', '0');
        stroke_opacity = 0.2;
      } else {
        d3.select(this).attr('data-clicked', '1');
        stroke_opacity = 0.5;
      }

      var traverse = [
        {
          linkType: 'sourceLinks',
          nodeType: 'target'
        },
        {
          linkType: 'targetLinks',
          nodeType: 'source'
        }
      ];

      traverse.forEach(function (step) {
        node[step.linkType].forEach(function (link) {
          remainingNodes.push(link[step.nodeType]);
          highlight_link(link.id, stroke_opacity);
        });

        while (remainingNodes.length) {
          nextNodes = [];
          remainingNodes.forEach(function (node) {
            node[step.linkType].forEach(function (link) {
              nextNodes.push(link[step.nodeType]);
              highlight_link(link.id, stroke_opacity);
            });
          });
          remainingNodes = nextNodes;
        }
      });
    }

    function highlight_link(id, opacity) {
      d3.select('#link-' + id).style('stroke-opacity', opacity);
    }

    svg1.attr('height', 1200);

    const svgWrapper = d3
      .select(`#${idName}`)
      .append('div')
      .style('height', '500px') // Set the fixed height here
      .style('overflow', 'scroll');

    // Append the svg element to the wrapper div
    svgWrapper.node().appendChild(svg1.node());
  };

  useEffect(() => {
    if (SankeyJson) {
      if (svgRef.current) {
        svgRef.current.innerHTML = '';
      }

      if (document.getElementById(idName)) {
        document.getElementById(idName).innerHTML = '';
      }

      drawChart(SankeyJson);
    }
  }, [SankeyJson]);

  useEffect(() => {
    if (tabName === 'drugRelation') {

      if (screenCapture) {
        setWatermarkCSS('watermark');
      } else {
        setWatermarkCSS('');
      }

      if (watermarkCss !== '' && screenCapture) {
        // if (svgRef !== null) {
        //   exportComponentAsJPEG(svgRef, {
        //     fileName: 'Sankey',
        //     html2CanvasOptions: {}
        //   });
        // }
        comingSoon()
        setToFalseAfterScreenCapture();
      }
    }

  }, [screenCapture, watermarkCss]);

  let comingSoon = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "Comingsoon", defaultMessage: 'Coming soon' }),
      icon: 'info',
      confirmButtonColor: '#003177',
      confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      allowOutsideClick: false,
    })
  }

  return (
    <div className="randomclass">
      <div
        id={idName}
        ref={svgRef}
        name={forGene}
        className="relative w-full text-center"
        style={{ margin: '60px 0px' }}
      ></div>
    </div>
  );
}

export default NewSankeyd3;
