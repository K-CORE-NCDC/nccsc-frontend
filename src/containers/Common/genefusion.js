import React, { useEffect } from "react";
import * as d3 from 'd3';
export default function Genefusion(){

    function drawChart() {
        var margin = {top: 20, right: 50, bottom: 60, left: 50}
        var svg = d3.select('#genefusion').append('svg')
            .attr("width", 960)
            .attr("height", 200)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + -50 + ")");
        let domains = ['exon1','exon2','exon3']
        var x = d3.scaleBand()
            .range([ 0, 1000])
            .domain(domains)
            .paddingInner(1)
            .paddingOuter(.5)
        svg.append("g")
        .attr("transform", "translate(-50," + 200 + ")")
        .call(d3.axisBottom(x))
    
        svg
        .selectAll("boxes")
        .data(domains)
        .enter()
        .append("rect")
            .attr("x", function(d){
                return x(d)
            }) 
            .attr("width", function(d){ 
                return 30
            })
            .attr("y", function(d) { 
                return 165
            })
            .attr("height", function(d){
                return 30
            })
            .attr("stroke", "black")
            .style("fill", "#69b3a2")
            
    }

    useEffect(()=>{
        drawChart()
    },[])

    return (
        <div id='genefusion'></div>
    )
}