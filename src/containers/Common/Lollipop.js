import React, { useState,useEffect } from 'react'
import * as d3 from 'd3'



export default function LollipopCmp({ width }) {

  const drawChart = (data) => {


        var margin = {
          top: 30,
          right: 60,
          bottom: 10,
          left: 60,
        }
        var barHeight = 25
        var width = 960
        var height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom
    const svg = d3.select("#lolipop").append("svg")
        .attr("viewBox", [0, 0, width, height])


    var format = d3.format(metric === "absolute" ? "+,d" : "+,.0%")
    var tickFormat = metric === "absolute" ? d3.formatPrefix("+.1", 1e6) : format
    var metric ='relative'
    var  x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .rangeRound([margin.left, width - margin.right])
    var  y = d3.scalePoint()
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1)
    var xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80).tickFormat(tickFormat))
        .call(g => g.select(".domain").remove())
    var  yAxis = g => g
      .attr("transform", `translate(${x(0)},0)`)
      .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSize(0).tickPadding(6))
      .call(g => g.selectAll(".tick text").filter(i => data[i].value < 0)
        // .attr("transform", "translate(-10,0)rotate(-45)")
    // .style("text-anchor", "end");
          .attr("text-anchor", "start")
          .attr("x", 6))

    svg.append("g")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
      .selectAll("line")
      .data(data)
      .join("line")

        .attr("x1", x(0))
        .attr("x2", x(0))
        // .attr("x2", d => x(d.value))
        .attr("y1", (d, i) => y(i))
        .attr("y2", (d, i) => y(i));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("fill", d => d3.schemeSet1[d.value > 0 ? 1 : 0])
        .attr("cx", d =>{

          x(d.value)
        })
        .attr("cy", (d, i) => y(i))
        .attr("r", 6);

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("text")
      .data(data)
      .join("text")
        .attr("text-anchor", d => d.value < 0 ? "end" : "start")
        .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 8)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => format(d.value));

    svg.selectAll("circle")
      .transition()
      .duration(2000)
      .attr("cx",  d => x(d.value))

    svg.selectAll("line")
      .transition()
      .duration(2000)
      .attr("x2", d => x(d.value))
    return svg.node();

  }

  useEffect(()=>{
    let data = [
      {name: "Puerto Rico", value: -0.14281404556189306},
      {name: "West Virginia", value: -0.032881380080021845},
      {name: "Illinois", value: -0.01237748849783861},
      {name: "Vermont", value: -0.0027998804617245794},
      {name: "Connecticut", value: -0.0024649582817701924},
      {name: "Mississippi", value: 0.0029831863814104216},
      {name: "New York", value: 0.0038940346170125433},
      {name: "Rhode Island", value: 0.00645469599559933},
      {name: "Pennsylvania", value: 0.007841838131266592},
      {name: "New Jersey", value: 0.010270369501725113},
      {name: "Michigan", value: 0.010443217276226168},
      {name: "Maine", value: 0.011932750208715854},
      {name: "Ohio", value: 0.013227230710447463},
      {name: "New Mexico", value: 0.018283985996360684},
      {name: "Kansas", value: 0.021098321205081597},
      {name: "Wisconsin", value: 0.0238171854124487},
      {name: "Missouri", value: 0.024795927550961966},
      {name: "Louisiana", value: 0.025460518130874767},
      {name: "Alabama", value: 0.025827577087939584},
      {name: "Wyoming", value: 0.026849364649608073},
      {name: "Kentucky", value: 0.029567907024227267},
      {name: "Alaska", value: 0.030009954507758743},
      {name: "New Hampshire", value: 0.03284617195986236},
      {name: "Arkansas", value: 0.03494851364133011},
      {name: "Iowa", value: 0.03568691107897799},
      {name: "Indiana", value: 0.038313477185145384},
      {name: "Hawaii", value: 0.04085198790561795},
      {name: "Maryland", value: 0.04713354967617855},
      {name: "Oklahoma", value: 0.05481225297232917},
      {name: "Nebraska", value: 0.05917131576195245},
      {name: "California", value: 0.06060203750293622},
      {name: "Massachusetts", value: 0.061377026706919406},
      {name: "Minnesota", value: 0.06329406995762572},
      {name: "Virginia", value: 0.06680332417450566},
      {name: "Tennessee", value: 0.07675085741569042},
      {name: "Montana", value: 0.08021204449093657},
      {name: "Delaware", value: 0.08444941387674372},
      {name: "South Dakota", value: 0.08656439607949103},
      {name: "Georgia", value: 0.09597474228277994},
      {name: "North Carolina", value: 0.09990065526832778},
      {name: "Oregon", value: 0.10092809483711356},
      {name: "South Carolina", value: 0.11314785171502179},
      {name: "Washington", value: 0.13240355474129084},
      {name: "North Dakota", value: 0.13302437885728474},
      {name: "Arizona", value: 0.13871990640825893},
      {name: "Idaho", value: 0.1400660380126845},
      {name: "Nevada", value: 0.14056575861740808},
      {name: "Florida", value: 0.14235321900442044},
      {name: "Colorado", value: 0.14506096004212204},
      {name: "Texas", value: 0.15312126064715756},
      {name: "Utah", value: 0.1599462351002303},
      {name: "District of Columbia", value: 0.1728802123236107},
    ]


    drawChart(data)
  },[])

  return (
    <div id='lolipop' className='p-3'>
    </div>
  )

}
