import React, { useState,useEffect } from 'react'
import igv from 'igv'
import config from '../../config'

export default function Igv({width,file_name}) {


  const loadIgv = (name)=>{

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
      ]
    };

    igv.createBrowser(igvDiv, options).then(function (browser) {
      for (var i = 0, l = browser.trackViews.length; i < l; i++) {
        var trackView = browser.trackViews[i];
        if (trackView.track.name === "Refseq Genes") {
          browser.removeTrack(trackView.track);
        }
      }
      browser.loadTrack({
          name: "Segmented Copy Number",
          type: "seg",
          format: "seg",
          url: config['auth']+"media/"+name,
      })
    })
  }
  useEffect(()=>{
    console.log(file_name);
    if(file_name){
      console.log(file_name);
      loadIgv(file_name['file'])
    }
  },[file_name])

  return (
    <div className='ad' id="igv-div" style={{"height":"500px","width":width+"px"}}>
    </div>
  )
}
