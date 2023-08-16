import React, { useEffect, useRef } from 'react'
import d3 from 'd3v3/d3'
import '../../../styles/sankey.css'



function NewSankeyd3({ SankeyJson, idName, forGene }) {
  const svgRef = useRef(null);

  const maxDbsnpRsCount = 50;   // Maximum dbsnp_rs nodes
  const maxDrugnameCount = 20;  // Maximum drugname nodes

  let dbsnpRsCount = 0;        // Counter for dbsnp_rs nodes
  let drugnameCount = 0;

  var margin = { top: 1, right: 1, bottom: 6, left: 1 },
    width = 960 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

  const drawChart = (energyjson) => {

    var sankey = d3.sankey().nodeWidth(15).nodePadding(10).size([width, height]);
    let color_types = {
      "hugo_symbol": '#1f77b4',
      "variant_classification": '#17becf',
      "dbsnp_rs": '#ff7f0e',
      "diseasename": '#e377c2',
      'drugname': "#9467bd"
    }

    let dbsnpRsCount = 0;        // Counter for dbsnp_rs nodes
    let drugnameCount = 0;      // Counter for drugname nodes

    var formatNumber = d3.format(",.0f"),
      format = function (d) { return formatNumber(d) + " TWh"; }

    var svg1 = d3.select(`#${idName}`).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height)
      .attr('class', "inline mt-5");
    var svg = svg1.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var path = sankey.link();
    var nodeMap = {};
    let maxNode = {
      "hugo_symbol": 0,
      "variant_classification": 0,
      "dbsnp_rs": 0,
      "diseasename": 0,
      "drugname": 0,
    }
    energyjson.nodes.forEach(function (x) {
      nodeMap[x.name] = x;
      maxNode[x['type']] = maxNode[x['type']] + 1
    });
    let maxNameCount = 0
    let maxName = ''
    for (const key in maxNode) {
      if (maxNode[key] > maxNameCount) {
        maxNameCount = maxNode[key]
        maxName = key
      }
    }
    energyjson.links = energyjson.links.map(function (x) {
      return {
        source: nodeMap[x.source],
        target: nodeMap[x.target],
        value: x.value
      };
    });
    sankey
      .nodes(energyjson.nodes)
      .links(energyjson.links)
      .layout(32);

    var link = svg.append("g").selectAll(".link")
      .data(energyjson.links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .attr("id", function (d, i) {
        d.id = i;
        return "link-" + i;
      })
      .style("stroke-width", function (d) { return Math.max(1, d.dy); })
      .sort(function (a, b) { return b.dy - a.dy; });

    link.append("title")
      .text(function (d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    var node = svg.append("g").selectAll(".node")
      .data(energyjson.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", highlight_node_links)
      .call(d3.behavior.drag()
        .origin(function (d) { return d; })
        .on("drag", dragmove));

    var heigthCalc = 0
    node.append("rect")
      .attr("height", function (d) {
        if (d['type'] === maxName) {
          heigthCalc = heigthCalc + d.dy
        }
        // console.log('maxName',maxName);
        // console.log('d.dy',d.dy);
        // console.log('d',d);
        return d.dy;
      })
      .attr("width", sankey.nodeWidth())
      .style("fill", function (d) {
        let t = d['type']
        return color_types[t]
      })
      .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
      .append("title")
      .text(function (d) { return d.name + "\n" + format(d.value); });

    node.append("text")
      .attr("x", -6)
      .attr("y", function (d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function (d) { return d.name; })
      .filter(function (d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    function dragmove(d) {
      d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
      sankey.relayout();
      link.attr("d", path);
    }

    function highlight_node_links(node, i) {

      var remainingNodes = [],
        nextNodes = [];

      var stroke_opacity = 0;
      if (d3.select(this).attr("data-clicked") === "1") {
        d3.select(this).attr("data-clicked", "0");
        stroke_opacity = 0.2;
      } else {
        d3.select(this).attr("data-clicked", "1");
        stroke_opacity = 0.5;
      }

      var traverse = [{
        linkType: "sourceLinks",
        nodeType: "target"
      }, {
        linkType: "targetLinks",
        nodeType: "source"
      }];

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
      d3.select("#link-" + id).style("stroke-opacity", opacity);
    }

    svg1.attr("height", 1200)

    const svgWrapper = d3.select(`#${idName}`).append('div')
      .style('height', '500px') // Set the fixed height here
      .style('overflow', 'scroll');

    // Append the svg element to the wrapper div
    svgWrapper.node().appendChild(svg1.node());
  }

  useEffect(() => {
    if (SankeyJson) {
      if (svgRef.current) {
        svgRef.current.innerHTML = '';
      }

      if (document.getElementById(idName)) {
        document.getElementById(idName).innerHTML = '';
      }
      let j = SankeyJson;

      const maxDbsnpRsCount = 20;   // Maximum dbsnp_rs nodes
      const maxDrugnameCount = 20;  // Maximum drugname nodes

      let dbsnpRsCounter = 0;        // Counter for dbsnp_rs nodes
      let drugnameCounter = 0;       // Counter for drugname nodes

      const filteredNodes = j.nodes.filter(node => {
        if (
          (node.type === 'dbsnp_rs' && dbsnpRsCounter < maxDbsnpRsCount) ||
          (node.type === 'drugname' && drugnameCounter < maxDrugnameCount) ||
          (node.type !== 'dbsnp_rs' && node.type !== 'drugname')
        ) {
          if (node.type === 'dbsnp_rs') {
            dbsnpRsCounter++;
          } else if (node.type === 'drugname') {
            drugnameCounter++;
          }
          return true;
        }
        return false;
      });


      console.log('filteredNodes', filteredNodes);
      // Create a set of valid node names for efficient lookup
      const validNodeNames = new Set(filteredNodes.map(node => node.name));

      // Filter links to only include those that connect valid nodes
      const filteredLinks = j.links.filter(link =>
        validNodeNames.has(link.source) && validNodeNames.has(link.target)
      );
      
      console.log('filteredLinks',filteredLinks);

      const filteredSankeyJson = {
        nodes: filteredNodes,
        links: filteredLinks
      };

      drawChart(filteredSankeyJson);
    }
  }, [SankeyJson]);

  return (
    <div className='randomclass'>
      <div id={idName} ref={svgRef} name={forGene} className='relative w-full text-center' style={{ 'margin': "60px 0px" }}></div>
    </div>
  )
}

export default NewSankeyd3
