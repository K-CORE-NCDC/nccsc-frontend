import React, { useState,useEffect } from 'react'
import igv from 'igv'

export default function Igv({width}) {


  const loadIgv = ()=>{
    var igvDiv = document.getElementById("igv-div");
    // console.log(`${config.auth}media/users/${userName}/output/3BIGS-${projectId}/output/variant_calling/Gatk/alignment_${sampleId}.sorted.rmdup.realigned.recal.bam`)

    const options =
    {
      genome: "hg19",
      // showNavigation:false,

      showSampleNames:true,

      tracks: [



      ]
    };


    igv.createBrowser(igvDiv, options)
      .then(function (browser) {

        for (var i = 0, l = browser.trackViews.length; i < l; i++) {
          var trackView = browser.trackViews[i];
          // console.log('---'+trackView.track.name+'---');
          // console.log(trackView);
          if (trackView.track.name === "Refseq Genes") {
            browser.removeTrack(trackView.track);
            // continue
          }
          // else if(trackView.track.name !== "undefined"){
          //   browser.removeTrack(trackView.track);
          // }
        }
        browser.loadTrack({
            name: "Segmented Copy Number",
            type: "seg",
            format: "seg",
            indexed: false,
            isLog: true,
            url: "https://s3.amazonaws.com/igv.org.demo/GBM-TP.seg.gz",
            sort: {
               direction: "DESC",     // ASC | DESC
               chr : "chr7",
               start: 55174641,
               end: 55175252
            }
        })
      })


  }
  useEffect(()=>{
    loadIgv()
  })

  return (
    <div className='ad' id="igv-div" style={{"height":"500px","width":width+"px"}}>
    </div>
  )
}
