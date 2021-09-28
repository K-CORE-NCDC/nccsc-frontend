import React, { useState,useEffect } from 'react'
import igv from 'igv'
import config from '../../config'
import placeholder from '../../assets/img/cnv_legend-removebg-preview.png'

export default function Igv({width,data}) {


  const loadIgv = (data)=>{

    var doc = document.getElementById('igv-div')
    if(doc.hasChildNodes()){
      document.getElementById('igv-div').innerHTML=''
    }

    var igvDiv = document.getElementById("igv-div");

    const options =
    {
      genome: "hg19",
      showNavigation:true,
      showSampleNames:true,
      tracks: [
        {
          name: "Copy number",
          type: "seg",
          displayMode: "EXPANDED",
          features:data
        }
      ]
    };

    igv.createBrowser(igvDiv, options).then(function (browser) {
      console.log('created igv browser')
    })

  }
  useEffect(()=>{
    // console.log(file_name);
    // if(file_name){
    //   console.log(file_name);
    if(data){
      loadIgv(data)
    }
    // }
    // loadIgv('s')
  },[data])

  return (
    <div>
      <div className='ml-6 grid grid-cols-4'>
        <div className='col-span-2'>
          <img src={placeholder} width='400'/>
        </div>
      </div>
      <div className='ad pt-6' id="igv-div" style={{"height":"500px","width":width+"px"}}>
      </div>
    </div>
  )
}
