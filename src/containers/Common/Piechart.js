
import React, { useState,useEffect,useRef } from 'react'
import {Chart, registerables} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
// labels:{
//   generateLabels: function(chart) {
//     var data = chart.data;
//     var datasets = data['datasets'][0]
    
//     let l = data['labels']
//     let tmp = []
//     for (let index = 0; index < l.length; index++) {
//       tmp.push({
//         text: l[index]+": ("+datasets.data[index]+")",
//         fillStyle: datasets.backgroundColor[index],
//         strokeStyle: datasets.backgroundColor[index],
//         lineWidth: 1,
//         // hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
//         index: index
//       })
      
//     }
//     return tmp
//   }
// }

export default function Piechart({id,data,width,color,gradeint_color, chart_type}) {

  const hexToRgb = hex =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         ,(m, r, g, b) => '#' + r + r + g + g + b + b)
         .substring(1).match(/.{2}/g)
         .map(x => parseInt(x, 16))

  const drawGraph = (g_data,ct_type) => {
    let ctx = document.getElementById(id).getContext('2d');

    // console.log(g_data)
    let segment;
    let selectedIndex;
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: g_data,
        options: {
          labels: {
            render: 'label'
          },
          plugins:{
            legend: {
              display: true,
              position:'bottom',
              
            },
            datalabels: {
              display: true,
              formatter: (val, ctx) => {
                return ctx.chart.data.labels[ctx.dataIndex];
              },
              color: '#fff',
              // backgroundColor: '#404040'
            },
            
            // datalabels: {

              // formatter: (value, ctx) => {
              //     // var data = chart.data;
              //     let sum = 0;
              //     let dataArr = ctx.chart.data;
              //     console.log(dataArr)
              //     // dataArr.map(data => {
              //     //     sum += data;
              //     // });
              //     // let percentage = (value*100 / sum).toFixed(2)+"%";
              //     return '';
              // },
              // color: '#fff',
            // }
          },
          responsive: false,
          layout:{
            padding:20
          }
        },
        plugins: [ChartDataLabels]
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
      
      // if(id === 'chart_pie_AgeOfDaignosis'){
      //   let ageofdiag = {}
      //   for (var i = 0; i < data.length; i++) {
      //     let n = parseInt(data[i].name)
      //     let tmp = 0
      //     if(n >20 && n<=25){
      //       tmp = '21~25'
      //     } else if(n>25 && n<=30 )  {
      //       tmp = '26~30'
      //     } else if(n>30 && n<=35) {
      //       tmp = '31~35'
      //     } else if(n>35 && n<=40) {
      //       tmp = '36~40'
      //     }
      //     if(tmp in ageofdiag) {
      //       ageofdiag[tmp] += data[i].cnt
      //     } else {
      //       ageofdiag[tmp] = data[i].cnt
      //     }
      //   }
      //   let d = []
      //   for (var key in ageofdiag) {
      //     d.push({
      //       'name': key,
      //       'cnt': ageofdiag[key]
      //     })
      //   }
      //   data = d

      // }
      if(id==='chart_pie_FirstMenstrualAge'){
        let fma = {}
        for (var i = 0; i < data.length; i++) {
          let n = parseInt(data[i].name)
          
          let tmp =''
          if (n>10 &&n<=13) {
            tmp = '10~13'
          }else if (n>14 &&n<=17) {
            tmp='14~17'
          }
          if(tmp in fma) {
            fma[tmp] += data[i].cnt
          } else {
            fma[tmp] = data[i].cnt
          }
        }
        let d = []
        for (var key in fma) {
          d.push({
            'name': key,
            'cnt': fma[key]
          })
        }
        data = d

      }else if(id==='chart_pie_DurationofBreastfeeding'){
        let dbf = {}
        for (var i = 0; i < data.length; i++) {
          let name = parseInt(data[i].name)
          if(name<=12){
            if('< 1year' in dbf){
              dbf['< 1year'] = dbf['< 1year']+data[i].cnt
            }else{
              dbf['< 1year'] = data[i].cnt
            }
          }else if(name > 12){
            dbf['1year ≤'] = data[i].cnt
          }else{
            dbf['N/A'] = data[i].cnt
          }
        }
        let d = []
        for (var key in dbf) {
          d.push({
            'name': key,
            'cnt': dbf[key]
          })
        }
        data = d
      }
      else if(id==='chart_pie_Timeuntilrelapseisconfirmed'){
        let turc = {}
        for (var i = 0; i < data.length; i++) {
          let name = parseInt(data[i].name)
          if(name<=9){
            if('0~9' in turc){
              turc['0~9'] = turc['0~9']+data[i].cnt
            }else{
              turc['0~9'] = data[i].cnt
            }
          }else{
            turc[name] = data[i].cnt
          }
        }
        let d = []
        for (var key in turc) {
          d.push({
            'name': key,
            'cnt': turc[key]
          })
        }
        data = d
      }
      else if(id==='chart_pie_HER2Score'){
        let her2 = {}
        for (var i = 0; i < data.length; i++) {
          let name = data[i].name
          if(name==="0"||name==="0~1"||name==="1+"){
            if ('negative(0-1+)' in her2){
              her2['negative(0-1+)'] = her2['negative(0-1+)']+data[i].cnt
            }else{
              her2['negative(0-1+)'] = data[i].cnt
            }
          }else if(name==="2"||name==="2+"){
            if ('equivocal(2+)' in her2){
              her2['equivocal(2+)'] = her2['equivocal(2+)']+data[i].cnt
            }else{
              her2['equivocal(2+)'] = data[i].cnt
            }
          }else if(name==="3"||name==="3+"){
            if ('positive(3+)' in her2){
              her2['positive(3+)'] = her2['positive(3+)']+data[i].cnt
            }else{
              her2['positive(3+)'] = data[i].cnt
            }
          }else{
            if ('N/A' in her2){
              her2['N/A'] = her2['N/A']+data[i].cnt
            }else{
              her2['N/A'] = data[i].cnt
            }
          }
        }
        let d = []
        for (var key in her2) {
          d.push({
            'name': key,
            'cnt': her2[key]
          })
        }
        data = d
      }
      else if(id==="chart_pie_Ki-67Index"){
        let ki = {}
        for (var i = 0; i < data.length; i++) {
          let name = parseInt(data[i].name)
          if(name>0 && name<15){
            if ('low(≤15%)' in ki){
              ki['low(≤15%)'] = ki['low(≤15%)']+data[i].cnt
            }else{
              ki['low(≤15%)'] = data[i].cnt
            }
          }else if(name>15 && name<30){
            if ('intermediate (<15-30%≤)' in ki){
              ki['intermediate (<15-30%≤)'] = ki['intermediate (<15-30%≤)']+data[i].cnt
            }else{
              ki['intermediate (<15-30%≤)'] = data[i].cnt
            }
          }else if(name>30 && name<100){
            if ('high (30%<)' in ki){
              ki['high (30%<)'] = ki['high (30%<)']+data[i].cnt
            }else{
              ki['high (30%<)'] = data[i].cnt
            }
          }else{
            if ('N/A' in ki){
              ki['N/A'] = ki['N/A']+data[i].cnt
            }else{
              ki['N/A'] = data[i].cnt
            }
          }
        }
        let d = []
        for (var key in ki) {
          d.push({
            'name': key,
            'cnt': ki[key]
          })
        }
        data = d
      }
      else if(id==='chart_pie_BodyMassIndex') {
        let bmi = {}
        for (var i = 0; i < data.length; i++) {
          let n = parseInt(data[i].name)
          
          let tmp =''
          if(n<18.5){
            tmp='<18.5'
          }else if (n>18.5 &&n<=25) {
            tmp = '18.5-24.9'
          }else if (n>25 &&n<=30) {
            tmp='25.0-29.9'
          }else if (n>30) {
            tmp='30.0≤'
          }
          if(tmp in bmi) {
            bmi[tmp] += data[i].cnt
          } else {
            bmi[tmp] = data[i].cnt
          }
        }
        let d = []
        for (var key in bmi) {
          d.push({
            'name': key,
            'cnt': bmi[key]
          })
        }
        data = d

      }
      var tmp = generateColor(color,"#fefefe",data.length);
      for (var i = 0; i < data.length; i++) {
        t.push(data[i].cnt)
        if(data[i].name==null){
          g_dat['labels'].push("N/A")
        }
        else if(data[i].name=="null"){
          g_dat['labels'].push("N/A")
        }
        else if(data[i].name==""){
          g_dat['labels'].push("N/A")
        }
        else if(data[i].name=="N/A"){
          g_dat['labels'].push("N/A")
        }
        else{
          g_dat['labels'].push(data[i].name)
        }
        colors.push(h+linear+")")
        linear = linear-0.080
      }
      g_dat['datasets'].push({
        "data":t,
        "backgroundColor":tmp,
      })

      drawGraph(g_dat, chart_type)
    }
  },[data,chart_type,id])
  let w = width-20

  return (
    <div id={'parent_pie'+id} className="flex">
      <div className="m-auto">
        <canvas id={id}  width={w} height="400"></canvas>
      </div>
    </div>
  )
}


// scales: {
//   x: {
//    grid: {
//      display: true,
//      drawBorder: true,
//      // drawOnChartArea: true,
//      drawTicks: true,
//    }
//   },
// }
