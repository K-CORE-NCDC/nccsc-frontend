import React, { useState,useEffect,useRef } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return "#"+hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function generateColor(colorStart,colorEnd,colorCount){

  // The beginning of your gradient
  var start = convertToRGB (colorStart);    

  // The end of your gradient
  var end   = convertToRGB (colorEnd);    

  // The number of colors to compute
  var len = colorCount;

  //Alpha blending amount
  var alpha = 0.0;

  var saida = [];
  
  for (var i = 0; i < len; i++) {
    var c = [];
    alpha += (1.0/len);
    
    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    saida.push(convertToHex (c));
    
  }
  
  return saida;
  
}
export default function Barchart({id,data,width,color, chart_type,title}) {
  const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         ,(m, r, g, b) => '#' + r + r + g + g + b + b)
         .substring(1).match(/.{2}/g)
         .map(x => parseInt(x, 16))
  const drawGraph = (g_data,ct_type) => {

    var ctx = document.getElementById(id).getContext('2d');
    var options = {
      plugins:{
        legend: {
          display: false
        },
        title: {
            display: true,
            position: 'left',
            text: ' # of samples ',
        }
      },
      layout:{
        padding:20
      },
      scales: {
        x: {
         grid: {
           display: true,
           drawBorder: true,
           drawOnChartArea: true,
           drawTicks: true,
         },
         title:{
          display: true,
          text: (title)?title:''
         }
        }
      }
    }
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: g_data,
        options: options
    });
            

  }

  useEffect(() => {
    
    if (data){
      let g_dat = {"labels":[],"datasets":[]}
      let t = []
      let colors = []
      let hex_color = hexToRgb(color)
      let h = 'rgba('+hex_color[0]+','+hex_color[1]+','+hex_color[2]+','
      let linear = 1
      let na = ''
      for (var i = 0; i < data.length; i++) {
        if(data[i].name==null){
          na = 'N/A'
        }
        else if(data[i].name=="null"){
          na = 'N/A'
        }
        else if(data[i].name==""){
          na = 'N/A'
        }
        else if(data[i].name=="N/A"){
          na = data[i].name
        }
        else{
          g_dat['labels'].push(data[i].name)
        }
        if(na=="N/A"){
          na += "||"+data[i].cnt
        }else{
          t.push(data[i].cnt)
        }
        colors.push(h+linear+")")
        
        if(id!=='chart_bar_HER2Score' && id!=='chart_bar_Timeuntilrelapseisconfirmed' && id!=='chart_bar_FirstMenstrualAge' && id!=='chart_bar_AgeOfDaignosis' && id!=="chart_bar_BodyMassIndex"){
          linear = linear-0.2
        }
      }
      
      if(na!=''){
        na = na.split('||')
        g_dat['labels'].push(na[0])
        t.push(na[1])
      }
      var tmp = generateColor(color,"#FFFFCC",data.length);
      g_dat['datasets'].push({
        "data":t,
        backgroundColor:colors,
        borderRadius: 11
      })
      drawGraph(g_dat, chart_type)
    }
  },[data,chart_type])
  let w = width-20

  return (
    <div id={'parent'+id}>
      <canvas id={id}  width={w} height="300"></canvas>
    </div>
  )
}
