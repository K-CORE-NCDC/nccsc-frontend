import React, {useEffect,useRef } from 'react';
import * as d3 from 'd3'
import * as d3Collection from 'd3-collection';


export default function Boxplot({data}) {
  const elementRef = useRef(null);

  const drawChart = (w,dt)=>{
    var doc = document.getElementById('my_dataviz')
    if(doc.hasChildNodes()){
      document.getElementById('my_dataviz').innerHTML=''
    }
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = w - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform","translate(40,-40)");

    var div = d3.select("#my_dataviz").append("div").attr('class','boxplot_tooltip').style("opacity", 0);
    var data = dt

    var domains = []
    var max_d = []
    for (var i = 0; i < data.length; i++) {
      domains.push(data[i].label)
      max_d.push(...data[i].data)
    }
    var colors = {
      'In_Frame_Del': '#1b4879',
      'In_Frame_Ins': '#c74951',
      'Frame_Shift_Del': '#603d92',
      'Frame_Shift_Ins': '#3778ae',
      'Nonsense_Mutation': '#d3352b',
      'Splice_Site': '#f28432',
      'Germline': '#000000',
      'Missense_Mutation': '#549d3e'
    }
    var sumstat = d3Collection.nest().key(function(d) { return d.label;}).rollup(function(a) {
      let d = a[0]
      var data_sorted = d['data'].sort(d3.ascending)
      var q1 = d3.quantile(data_sorted,.25)
      var median = d3.quantile(data_sorted,.5)
      var q3 = d3.quantile(data_sorted,.75)
      var interQuantileRange = q3 - q1
      var min = q1 - 1.5 * interQuantileRange
      var max = q3 + 1.5 * interQuantileRange
      if(min<1){
        min=2
      }
      return({'color':colors[d['label']],q1: q1, median: median, q3: q3, min: min, max: max})
    })
    .entries(data)

        // Show the X scale
     var x = d3.scaleBand()
       .range([ 0, width ])
       .domain(domains)
       .paddingInner(1)
       .paddingOuter(.5)

     svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .selectAll("text")
       .attr("y", 0)
       .attr("x", 9)
       .attr("dy", ".35em")
       .attr("font-size", "0.8em")
       .attr("transform", "rotate(60)")
       .style("text-anchor", "start");
    

      var y = d3.scaleLinear()
              .domain([0, 400])
              .range([height, 0])
      svg.append("g").call(d3.axisLeft(y))

    for (let i = 0; i < sumstat.length; i++) {
      var p = svg.append('g').attr('class','box').attr('id',i)
      p.selectAll("vertLines").data([sumstat[i]])
      .enter()
      .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", function(d,i){
        return d.value.color
      })
      .style("width", 40)

      let boxWidth = 50
      p
      .selectAll("boxes")
      .data([sumstat[i]])
      .enter()
      .append("rect")
          .attr("x", function(d){return(x(d.key)-boxWidth/2)})
          .attr("y", function(d){return(y(d.value.q3))})
          .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
          .attr("width", boxWidth )
          .attr("stroke",function(d,i){
            return d.value.color
          })
          .style("fill", function(d,i){
            return d.value.color
          })
      
      
      p
      .selectAll("medianLines")
      .data([sumstat[i]])
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.value.median))})
        .attr("y2", function(d){return(y(d.value.median))})
        .attr("stroke", "#fff")
        .style("width", 80)
      
      p
      .selectAll("medianLines")
      .data([sumstat[i]])
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.value.min))})
        .attr("y2", function(d){return(y(d.value.min))})
        .attr("stroke", function(d,i){
          return d.value.color
        })
        .style("width", 80)
      
      p
      .selectAll("medianLines")
      .data([sumstat[i]])
      .enter()
      .append("line")
        .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
        .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
        .attr("y1", function(d){return(y(d.value.max))})
        .attr("y2", function(d){return(y(d.value.max))})
        .attr("stroke", function(d,i){
          return d.value.color
        })
        .style("width", 80)
      
        p.on("mouseover", function(d){
          var id = this.id
          var html = ''
          for(var key in sumstat[id].value){
            if(key!=='color'){
              html +=key+":"+ sumstat[id].value[key]+"<br/>"
            }
          }
          div.html(html)
             .style("left","50px")
             .style("top", "0px")
             .style("opacity", 1);
  
        })
        p.on("mouseleave", function(d){
          div.style("opacity", 0);
        })

    }

     
  }

  useEffect(()=>{
    if(data){
      let w = elementRef.current.getBoundingClientRect().width
      drawChart(w,data)
    }
  },[data])
  return (
    <>
      <div id="my_dataviz" className='relative' ref={elementRef}></div>
    </>
  )
}
