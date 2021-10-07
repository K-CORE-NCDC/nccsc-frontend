import React, { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as d3 from 'd3';
// import genes from '../Common/gene.json'
// import { getBreastKeys, getUserDataProjectsTableData } from '../../actions/api_actions'

export default function BoxPlot({ box_data }) {
  const elementRef = useRef(null);

  const draw_chart = (box_data) => {
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#box")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        
      
  }

  useEffect(()=>{
   
    if(box_data){
      draw_chart(box_data)
    }
  },[])


  return (
      <div ref={elementRef} id="box" style={{'width':'100%','overflowX':'scroll','padding':'20px'}}>
      </div>
  )
}
