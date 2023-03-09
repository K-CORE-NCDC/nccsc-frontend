import React, { useState,useEffect,Fragment } from 'react'
import CanvasXpressReact from 'canvasxpress-react';
import html2canvas from 'html2canvas';

function saveAs(uri, filename) {
    var link = document.createElement('a');
    link.className = 'watermark'
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        //Firefox requires the link to be in the body
        document.body.appendChild(link);
        //simulate click
        link.click();
        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}
const HeatmapCmp = React.forwardRef(({ settings, inputData, type, watermarkCss,width,clinicalFilter }, ref) => {

    const [data,setData] = useState({})
    const [dataLoaded,setDataLoaded] = useState(false)
    const [configVis,setConfigVis] = useState({})
    
    let target = "canvas";
    
    
    let config = {
        "colorSpectrum": settings['colorSpectrum'],
        "graphType": "Heatmap",
        "heatmapCellBoxColor": "rgb(255,255,255)",
        "overlayScaleFontFactor" : 2,
        "samplesClustered": true,
        
        "showTransition": false,
        "variablesClustered": true,
        "showVarOverlaysLegend": true,
        'events': false,
        'info': false,
        "draw":true,
        'afterRenderInit': true,
        "lazyLoad":true,
        'afterRender': [
            [
                'setDimensions',
                [613,613,true]
            ]
        ],
        'noValidate': true,
        // 'disableDataTable':true,
        'disableConfigurator':false,
        'disableToolbar':true
    }
    // console.log(settings['colorSpectrumBreaks'])
    if(!isNaN(settings['colorSpectrumBreaks'][0]) && !isNaN(settings['colorSpectrumBreaks'][1])){
        config["colorSpectrumBreaks"] = settings['colorSpectrumBreaks']
    }
    if(clinicalFilter.length>0){
        config['varOverlayProperties'] = {}
        config["varOverlays"] = []
        for (let i = 0; i < clinicalFilter.length; i++) {
            config['varOverlayProperties'][clinicalFilter[i].name] = {
                "position": "top",
                "type": "Default",
                "color": "rgb(254,41,108)",
                "spectrum": ["rgb(255,0,255)","rgb(0,0,255)","rgb(0,0,0)","rgb(255,0,0)","rgb(255,215,0)"],
                "scheme": "GGPlot",
                "showLegend": true,
                "showName": true,
                "showBox": true,
                "rotate": false
            }
            config["varOverlays"].push(clinicalFilter[i].name)
        }
        config["variablesClustered"] =  true
    }

    // useEffect(()=>{
    //     if(settings){
    //         console.log(settings)
    //         let c = configVis
    //         c['colorSpectrumBreaks'] = settings['colorSpectrumBreaks']
    //         setConfigVis(c)
    //     }
    // },[settings])
    if(type === "k-mean"){
      config['smpOverlayProperties'] = {
        "Treatment": {
              "position": "right",
              "type": "Default",
              "color": "rgb(254,41,108)",
              "spectrum": ["rgb(255,0,255)","rgb(0,0,255)","rgb(0,0,0)","rgb(255,0,0)","rgb(255,215,0)"],
              "scheme": "User",
              "showLegend": true,
              "showName": true,
              "showBox": true,
              "rotate": false
          },
        "Cluster": {
              "position": "left",
              "type": "Default",
              "color": "rgb(72,126,182)",
              "spectrum": ["rgb(244,67,54)","rgb(225,101,25)","rgb(202,206,23)","rgb(4,115,49)","rgb(98,183,247)"],
              "scheme": "User",
              "showLegend": true,
              "showName": true,
              "showBox": true,
              "rotate": false,
              
              
          },
          "Dose": {
              "thickness": 50,
              "type": "Dotplot",
              "position": "right",
              "color": "rgb(167,206,49)",
              "spectrum": ["rgb(255,0,255)","rgb(0,0,255)","rgb(0,0,0)","rgb(255,0,0)","rgb(255,215,0)"],
              "scheme": "User",
              "showLegend": true,
              "showName": true,
              "showBox": true,
              "rotate": false
          }
      }
      config['smpOverlays'] = ["Cluster","Treatment","Dose"]
      config['samplesClustered'] = false
      config['variablesClustered'] = false
      
      config['sortData'] = [["cat", "smp","Cluster"]]
      config['sortDir'] = 'ascending'
    }

    
    useEffect(()=>{
        if(watermarkCss){
            html2canvas(document.querySelector('#canvas')).then(function(canvas) {
                saveAs(canvas.toDataURL(), 'heatmap.png');
            });
           
        }
    },[watermarkCss])


    useEffect(()=>{
        
        if(Object.keys(inputData).length>0){
            setData(inputData)
            setConfigVis(config)
        }

    },[inputData])

    useEffect(()=>{
        
        if(Object.keys(data).length>0){
            setDataLoaded(true)
        }
    },[data])

    return (
        <div ref={ref} className={`heatmap ${watermarkCss}`}>
            <div className='grid grid-cols-2 bg-white  px-5 py-5'>
                <div className='text-left grid grid-cols-3 gap-4'>
                    
                    
                </div>
            </div>
            { dataLoaded &&
                <CanvasXpressReact target={target} data={data} config={configVis} width={width} height={'700'} />
            }
            
        </div>
    )
})
export default HeatmapCmp
// <canvas id="heatmap" width="613" height="613"></canvas>
