/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-loop-func */
import React, {  useEffect } from "react";
import { useSelector } from "react-redux";
import * as d3 from 'd3';
import { nest } from 'd3-collection';



const BoxPlot = React.forwardRef(({view_type, box_data,chart_type, watermarkCss }, ref) => {
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);

  function drawChart(d_){
      // set the dimensions and margins of the graph
      let childnode = document.getElementById("box2");
      if(childnode.hasChildNodes()){
        while (childnode.firstChild) {
          childnode.removeChild(childnode.firstChild)
        }
      }


      var margin = {top: 15, right: 50, bottom: 60, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
      if(d_['datasets'].length>width){
        width = d_['datasets'].length+3000
      }

      let childnode_ = document.getElementById("box3")
      if(childnode_.hasChildNodes()){
        while (childnode_.firstChild) {
          childnode_.removeChild(childnode_.firstChild)
        }
      }

      var svg1 = d3.select("#box3")
      .append("svg")
        .attr("width", 250)
        .attr("height", height-450 +  margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    svg1.append("circle").attr("cx",20).attr("cy",-5).attr("r", 6).style("fill", "red")
    svg1.append("text").attr("x", 30).attr("y", 1).text("Tumor").style("font-size", "15px").attr("alignment-baseline","top")
    if(chart_type==="proteome"){
      svg1.append("circle").attr("cx",90).attr("cy",-5).attr("r", 6).style("fill", "blue")
      svg1.append("text").attr("x", 100).attr("y", 1).text("Normal").style("font-size", "15px").attr("alignment-baseline","top")
    }



    var max_vl = 5 //d_['max']
    var min_vl = 0 //d_['min']
    var domains = []
    var sumstat = nest()
        .key(function(d) { return d.Species;})
        .rollup(function(d) {
          var t = []
          var n = []
          for (var i = 0; i < d.length; i++) {
            if (domains.includes(d[i]['Species'])===false){
              domains.push(d[i]['Species'])
            }

            if(d[i]['type']==="T"){
              let q1 = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.25)
              let median = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.5)
              let q3 = d3.quantile(d.map(function(g) {
                if (g.type==="T") return g.Sepal_Length;
              }).sort(d3.ascending),.75)
              let interQuantileRange = q3 - q1
              let min = q1 - 1.5 * interQuantileRange
              let max = q3 + 1.5 * interQuantileRange
              t.push({
                q1: q1,
                median: median,
                q3: q3,
                interQuantileRange: interQuantileRange,
                min: min,
                max: max,
                Sepal_Length: d[i]['Sepal_Length'],
                type:"T",
                Sample:d[i]['Sample']
              })

              if (min < min_vl){
                min_vl = min
              }
              if (max > max_vl){
                max_vl = max+2
              }

            }else{
              let q1 = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.25)
              let median = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.5)
              let q3 = d3.quantile(d.map(function(g) {
                if (g.type==="N") return g.Sepal_Length;
              }).sort(d3.ascending),.75)
              let interQuantileRange = q3 - q1
              let min = q1 - 1.5 * interQuantileRange
              let max = q3 + 1.5 * interQuantileRange
              n.push({
                q1: q1,
                median: median,
                q3: q3,
                interQuantileRange: interQuantileRange,
                min: min,
                max: max,
                Sepal_Length: d[i]['Sepal_Length'],
                type:"N",
                Sample:d[i]['Sample']
              })
              if (min < min_vl){
                min_vl = min
              }
              if (max > max_vl){
                max_vl = max+2
              }
            }

          }
          return [t,n]
      })
      .entries(d_['datasets'])

      var svg = d3.select("#box2")
      .append("svg")
        .attr("width", (250*sumstat.length)+250)
        .attr("height", height+  margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      // svg.append("circle").attr("cx",20).attr("cy",-11).attr("r", 6).style("fill", "red")
      // svg.append("circle").attr("cx",90).attr("cy",-11).attr("r", 6).style("fill", "blue")
      // svg.append("text").attr("x", 30).attr("y", -3).text("Tumor").style("font-size", "15px").attr("alignment-baseline","top")
      // svg.append("text").attr("x", 110).attr("y", -3).text("Normal").style("font-size", "15px").attr("alignment-baseline","top")

    var tooltip = d3.select("#box2").append("div").attr('class','boxplot_tooltip')
               .style("opacity", 0);
    // Show the X scale
    var x = d3.scaleBand()
      .range([ 0, (250*sumstat.length)+250 ])
      .domain(domains)
      .paddingInner(1)
      .paddingOuter(.5)


        if(chart_type==="proteome"){
          svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
        }else{
          svg.append("g")
          .attr("transform", "translate(-50," + height + ")")
          .call(d3.axisBottom(x))
        }

        // Show the Y scale
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(function(){
        if(view_type==="gene_vl"){
          return "Proteome expression (gene_vl)"
        }else{
          return "Proteome expression (z-score)"
        }
      });
    // if(view_type==="gene_vl"){
    // }else{
      // svg.text("Proteome expression (z-score)");
    // }
      
      

      svg.append("text")
      .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      // .text("Selected Gene");


    var y = d3.scaleLinear()
      .domain([min_vl-1,max_vl])
      .range([height, 0])
    svg.append("g").call(d3.axisLeft(y))


    for (var i = 0; i < sumstat.length; i++) {

      var p = svg.append('g').attr('class','box')
      .attr('id',i)

      var key = x(sumstat[i]['key'])-50
      var vl = sumstat[i]['value']
      let p_value = d_['p_value'][sumstat[i]['key']]


      if(vl[1].length>0){
        p
          .selectAll("medianLines")
          .data([key])
          .enter()
          .append("line")
          .attr("x1", function(_d){return (key-8) })
          .attr("x2", function(_d){return(key+50) })
          .attr("y1", function(d){
            return 10
          })
          .attr("y2", function(d){
            return 10
          })
          .attr("stroke", "black")
          .attr("class", "pvalue")
        p
          .selectAll("medianLines")
          .data([key])
          .enter()
          .append("text")
          .attr("x", function(d){return (key) })
          .attr("y", function(d){ return 0 })
          .text("P-value:"+p_value);
      }
      // (d_['p_value'][sumstat[i]['key']]).toFixed(6)
      for (var z = 0; z < vl.length; z++) {
        p.selectAll("vertLines")
          .data(vl[z])
          .enter()
          .append("line")
            .attr("x1", function(d){
              return(key)
            })
            .attr("x2", function(d){
              return(key)
            })
            .attr("y1", function(d){
              return(y(d.min))
            })
            .attr("y2", function(d){
              return(y(d.max))

            })
            .attr("stroke", "black")

        var boxWidth = 50
        p.selectAll("boxes")
          .data(vl[z])
          .enter()
          .append("rect")
          .attr("x", function(d){
            return(key-boxWidth/2)
          })
          .attr("y", function(d){return(
            y(d.q3))
          })
          .attr("height", function(d){
            return((y(d.q1)-y(d.q3)) + 3)
          })
          .attr("width", boxWidth )
          .attr("stroke", "black")
          .style("fill", "#fff")
          .on("mouseover", (d,i)=> {

            let html = 'q1'+i.q1.toFixed(2)+"<br/>"
            html += 'q3: '+i.q3.toFixed(2)+"<br/>"
            html += 'median: '+i.median.toFixed(2)+"<br/>"
            html += 'interQuantile: '+i.interQuantileRange.toFixed(2)+"<br/>"
            html += 'min: '+i.min.toFixed(2)+"<br/>"
            html += 'max: '+i.max.toFixed(2)+"<br/>"
            tooltip.transition()
              .duration(200)
              .style('opacity', 0.9);

            tooltip.html(html)
              .style('left', d.pageX - 550 + 'px')
              .style('top', d.pageY - 150 + 'px');
          })
          .on('mouseout', () => {
            tooltip
              .transition()
              .duration(500)
              .style('opacity', 0);
          });



        p
          .selectAll("medianLines")
          .data(vl[z])
          .enter()
          .append("line")
            .attr("x1", function(d){return(key-boxWidth/2) })
            .attr("x2", function(d){return(key+boxWidth/2) })
            .attr("y1", function(d){return(y(d.median))})
            .attr("y2", function(d){return(y(d.median))})
            .attr("stroke", "black")

          p
            .selectAll("medianLines")
            .data(vl[z])
            .enter()
            .append("line")
            .attr("x1", function(d){return (key-boxWidth/2) })
            .attr("x2", function(d){return(key+boxWidth/2) })
            .attr("y1", function(d){
              return y(d.max)
            })
            .attr("y2", function(d){
              return y(d.max)
            })
            .attr("stroke", "black")
            .attr("class", "black")
        p
          .selectAll("medianLines")
          .data(vl[z])
          .enter()
          .append("line")
            .attr("x1", function(d){return (key-boxWidth/2) })
            .attr("x2", function(d){return(key+boxWidth/2) })
            .attr("y1", function(d){
              return y(d.min)
            })
            .attr("y2", function(d){
              return y(d.min)
            })
            .attr("stroke", "black")
            // .style("width", 80)



        var jitterWidth = 50
        p.selectAll("indPoints")
          .data(vl[z])
          .enter()
          .append("circle")
          .attr("cx", function(d){
            return(key - jitterWidth/2 + Math.random()*jitterWidth )
          })
          .attr("cy", function(d){
            // console.log(d);
            return(y(d.Sepal_Length))
          })
          .attr("r", 2)
          .style("fill", function(d){
            if(d['type'] === "N"){
              return "blue"
            }else{
              return "red"
            }
            })
          .attr("stroke", function(d){
            if(d['type'] === "N"){
              return "blue"
            }else{
              return "red"
            }
          })
          .on("mouseover", (d,i)=> {
            tooltip.transition()
              .duration(200)
              .style('opacity', 0.9);
            console.log('Sepal_Length',i.Sepal_Length);
            tooltip.html("Sample:<br/>"+BrstKeys[i.Sample]+`<br/>${view_type==="gene_vl" ? 'gene val' : 'z-score'}<br/>`+i.Sepal_Length)
              .style('left', d.pageX - 550 + 'px')
              .style('top', d.pageY - 150 + 'px');
          })
          .on('mouseout', () => {
            tooltip
              .transition()
              .duration(500)
              .style('opacity', 0);
          });
        key = key+80
      }



    }


    // console.log(d3)

      // Add individual points with jitter
      //
  }

  useEffect(()=>{
    if(Object.keys(box_data).length !== 0){
      drawChart(box_data)
    }
  },[box_data])


  return (
    <>
      <div id="box3">
      </div>
      <div ref={ref} className={watermarkCss + "sm:w-5/6"} id="box2" style={{'width':'100%','overflowX':'scroll','padding':'20px'}}>
      </div>
    </>
  )
})

export default BoxPlot
