import React, { useEffect, useRef } from 'react'
// var venn = require("venn")
// import {VennDiagram} from 'venn.js'
import * as venn from 'venn.js'
import * as d3 from 'd3'
import '../../styles/survival.css'

export default function VennCmp({ width }) {
  useEffect(()=>{
    var sets = [ {sets: ['Global Proteome'], size: 12},
             {sets: ['RNA Expression'], size: 12},
             {sets: ['DNA Mutation'], size: 12},
             {sets: ['Global Proteome','RNA Expression'], size: 2},
             {sets: ['RNA Expression','DNA Mutation'], size: 4},
             {sets: ['Global Proteome','DNA Mutation'], size: 4},
             {sets: ['Global Proteome','RNA Expression','DNA Mutation'], size: 2}];

    var chart = venn.VennDiagram().width(width)
    var div = d3.select("#venn")
    .datum(sets)
    .call(chart);

    var tooltip = d3.select("body")
    .append("div")
    .attr("class", "venntooltip");

    div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)




    div.selectAll("g")
    .on("mouseover", function(d, i) {
        var s = i['sets']
        var html = []
        for (var j = 0; j < s.length; j++) {
          html.push(s[j])
        }
        var ht = html.join("/")
        ht = ht+"("+i.size+")"
        tooltip.html(ht)
        tooltip.transition().duration(40).style("opacity", 1);
    })
    .on("mousemove", function(d) {
        tooltip.style("left", (d.pageX) + "px")
               .style("top", (d.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(2500).style("opacity", 0);

    });

  },[width])

  return (
    <div id='venn' className='relative'></div>
  )
}
