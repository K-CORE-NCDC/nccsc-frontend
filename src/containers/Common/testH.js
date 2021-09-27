import React, { useState,useEffect,Fragment } from 'react'
import CanvasXpressReact from 'canvasxpress-react';


const HeatmapCmp = React.forwardRef(({  inputData, watermarkCss,width,clinicalFilter }, ref) => {

    const [data,setData] = useState({})
    const [dataLoaded,setDataLoaded] = useState(false)
    let target = "canvas";


    let config = {
        "colorSpectrum": ["navy","white","firebrick3"],
        "graphType": "Heatmap",
        "heatmapCellBoxColor": "rgb(255,255,255)",
        "overlayScaleFontFactor" : 2,
        "samplesClustered": true,
        "showTransition": false,
        "variablesClustered": true,
        "showVarOverlaysLegend": true,
        'events': false,
        'info': false,
        'afterRenderInit': false,
        'afterRender': [
            [
                'setDimensions',
                [613,613,true]
            ]
        ],
        'noValidate': true
    }
    if(clinicalFilter.length>0){
        config['varOverlayProperties'] = {}
        config["varOverlays"] = []
        for (let i = 0; i < clinicalFilter.length; i++) {
            config['varOverlayProperties'][clinicalFilter[i].id] = {
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
            config["varOverlays"].push(clinicalFilter[i].id)
        }
        config["variablesClustered"] =  true
    }

    console.log(config)

    useEffect(()=>{
        
        if(Object.keys(inputData).length>0){
            setData(inputData)
        }   

    },[inputData])

    useEffect(()=>{
        if(Object.keys(data).length>0){
            setDataLoaded(true)
        }
    },[data])


    return (
        <div ref={ref} className={`heatmap ${watermarkCss}`}>
            { dataLoaded && 
                <CanvasXpressReact target={target} data={data} config={config} width={width-100} height={'700'} />
                
            }
        </div>
    )
})
export default HeatmapCmp
// <canvas id="heatmap" width="613" height="613"></canvas>
