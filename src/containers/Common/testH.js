import React, { useState,useEffect,Fragment } from 'react'
import CanvasXpressReact from 'canvasxpress-react';


const HeatmapCmp = React.forwardRef(({  inputData, watermarkCss,width }, ref) => {

    const [data,setData] = useState({"y":{}})
    const [dataLoaded,setDataLoaded] = useState(false)
    let target = "canvas";


    let config = {
        "colorSpectrum": ["navy","white","firebrick3"],
        "graphType": "Heatmap",
        "heatmapCellBoxColor": "rgb(255,255,255)",
        "samplesClustered": true,
        "showTransition": false,
        "title": "Clustered data",
        "variablesClustered": true
    }



    useEffect(()=>{
        
        if(Object.keys(inputData).length>0){
            setData((prevState) => ({
                ...prevState,
                "y" : inputData
            }))
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
