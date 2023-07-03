import React, { useCallback, useEffect } from 'react';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);



export default function Barchart({id,data,width,color, chart_type,title}) {
  const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         ,(m, r, g, b) => '#' + r + r + g + g + b + b)
         .substring(1).match(/.{2}/g)
         .map(x => parseInt(x, 16))
  const drawGraph = useCallback((g_data,ct_type) => {
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
    
    new Chart(ctx, {
        type: 'bar',
        data: g_data,
        options: options
    });
            

  },[id, title])

  useEffect(() => {
    
    if (data){
      if(id==='chart_bar_BodyMassIndex'){
        let d = {}
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let n = parseInt(element.name)
          if(n in d){
            d[n] = d[n]+element.cnt
          }else{
            d[n] = element.cnt
          }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        data = []
        for (const key in d) {
          data.push({"name":key,"cnt":d[key]})
        }
      }
      let g_dat = {"labels":[],"datasets":[]}
      let t = []
      let colors = []
      let hex_color = hexToRgb(color)
      let h = 'rgba('+hex_color[0]+','+hex_color[1]+','+hex_color[2]+','
      let linear = 1
      let na = ''
      for (var i = 0; i < data.length; i++) {
        if(data[i].name===null){
          na = 'N/A'
        }
        else if(data[i].name==="null"){
          na = 'N/A'
        }
        else if(data[i].name===""){
          na = 'N/A'
        }
        else if(data[i].name==="N/A"){
          na = data[i].name
        }
        else{
          g_dat['labels'].push(data[i].name)
        }

        if(na==="N/A"){
          na += "||"+data[i].cnt
          
        }else{
          t.push(data[i].cnt)
        }
        colors.push(h+linear+")")
        
        if(id!=='chart_bar_TCategory' && id!=='chart_bar_NCategory' && id!=='chart_bar_DurationofBreastfeeding' && id!=='chart_bar_Ki-67Index' && id!=='chart_bar_HER2Score' && id!=='chart_bar_Timeuntilrelapseisconfirmed' && id!=='chart_bar_FirstMenstrualAge' && id!=='chart_bar_AgeOfDaignosis' && id!=="chart_bar_BodyMassIndex"){
          linear = linear-0.2
        }
      }
      
      if(na!==''){
        na = na.split('||')
        g_dat['labels'].push(na[0])
        t.push(parseInt(na[1]))
      }
      
      g_dat['datasets'].push({
        data:t,
        backgroundColor:colors,
        borderRadius: 11
      })
      
      drawGraph(g_dat, chart_type)
    }
  },[data,chart_type,color,drawGraph,id])
  let w = width-20

  return (
    <div id={'parent'+id}>
      <canvas id={id}  width={w} height="300"></canvas>
    </div>
  )
}
