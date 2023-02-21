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
const HeatmapCmp = React.forwardRef(({  inputData, type, watermarkCss,width,clinicalFilter }, ref) => {

    const [data,setData] = useState({})
    const [dataLoaded,setDataLoaded] = useState(false)
    const [configVis,setConfigVis] = useState({})
    const [spectrumMin,setSpectrumMin] = useState(0)
    const [spectrumMax,setSpectrumMax] = useState(0)
    let target = "canvas";
    let themes = [
        {"name":"Theme 1","value":["navy","firebrick3"]},
        {"name":"Theme 2","value":["#F9F9F9","#FCD200"]},
        {"name":"Theme 3","value":["#D0D0D0","#006CE0"]},
        {"name":"Theme 4","value":["#FFFFFF","#9900E0"]},

    ]

    let config = {
        "colorSpectrum": ["navy","firebrick3"],
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
        'afterRenderInit': false,
        "lazyLoad":true,
        'afterRender': [
            [
                'setDimensions',
                [613,613,true]
            ]
        ],
        'noValidate': true,
        // 'disableDataTable':true,
        'disableConfigurator':true,
        'disableToolbar':true
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
      config["modifySort"] = [["Cluster"]]
      config['sortDir'] = "descending"
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
    
    const changeTheme = (e)=>{
        let theme_name = e.target.value
        let colors = []
        for (let index = 0; index < themes.length; index++) {
            const row = themes[index];
            if(row['name']===theme_name){
                colors = row['value']
            }
        }
        
        setConfigVis({...configVis,['colorSpectrum']:colors})
        setTimeout(function(){
            document.getElementById('canvascanvasXpressLoadingTimer').style.display='none'
        },1000)
    }

        
    const changeSepctrum = (e)=>{
        
        let c = configVis
        c['colorSpectrumBreaks'] = [spectrumMin,spectrumMax]
        setConfigVis(c)
        setTimeout(function(){
            setConfigVis({...configVis,['colorSpectrumBreaks']:[spectrumMin,spectrumMax]})
            document.getElementById('canvascanvasXpressLoadingTimer').style.display='none'
            document.getElementById("canvas-events").click()
            document.getElementById("canvas").click()
            ref.current.click()
        }   ,2000)
    }


    return (
        <div ref={ref} className={`heatmap ${watermarkCss}`}>
            <div className='grid grid-cols-2 bg-white  px-5 py-5'>
                <div className='text-left grid grid-cols-3 gap-4'>
                    <div>
                        <label id="listbox-label" className="block text-gray-700 mb-2">Color</label>
                        <select onChange={(e)=>changeTheme(e)} className='w-full border bg-white rounded lg:px-3 lg:py-2 xs:py-0 lg:h-14 sm:h-14 xs:h-8 lg:text-2xl xs:text-sm outline-none text-gray-700'>
                            {
                                themes.map(row=>
                                    <option key={row['name']} value={row['name']}>{row['name']}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mx-10 mb-2">Spectrum</label>
                    
                        <div className="grid grid-cols-5  rounded mx-10 border border-b-color">
                            <div className="col-span-2">
                                <input type="number" id='specturm_from' value={spectrumMin} onChange={(e)=>setSpectrumMin(e.target.value)}
                                    className="h-full shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    />
                            </div>
                            <div className="col-span-1">
                                <div className="box-border border-r border-l border-b-color bg-gray-100 h-full w-30  px-3 mb-6 text-center">
                                    <b>-</b>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <input type="number" id='specturm_to'  value={spectrumMax} onChange={(e)=>setSpectrumMax(e.target.value)}
                                    className="h-full  shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight" 
                                    />
                            </div>
                        </div>
                            
                        
                    </div>
                    <div>
                        <label className="block text-gray-700 mx-10 mb-2">&nbsp;</label>
                        <button onClick={(e)=>changeSepctrum(e)} className='bg-main-blue hover:bg-main-blue mb-3 text-white ml-2 font-bold py-2 px-4 border border-blue-700 rounded '>Apply</button>
                    </div>
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
