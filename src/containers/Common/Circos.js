import React, { useState,useEffect } from 'react'
import * as d3 from 'd3'
import * as Circos from 'circos'

export default function CircosCmp({ width }) {

  useEffect(()=>{

    var myCircos = new Circos({
      container: '#chart',
      width: width - 300,
      height: width - 150,
    });

  })

  return (
    <div id='circos'></div>

  )
}
