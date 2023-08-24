import React, { useEffect } from 'react'
import igv from 'igv'


const Igv = React.forwardRef(({ width, data, watermarkCss }, ref) => {


  const loadIgv = (data) => {

    var doc = document.getElementById('igv-div')
    if (doc.hasChildNodes()) {
      document.getElementById('igv-div').innerHTML = ''
    }

    var igvDiv = document.getElementById("igv-div");

    const options =
    {
      genome: "hg19",
      showNavigation: true,
      showSampleNames: true,
      tracks: [
        {
          name: "Copy number",
          type: "seg",
          displayMode: "EXPANDED",
          features: data
        }
      ]
    };

    igv.createBrowser(igvDiv, options).then(function (browser) {
    })

  }
  useEffect(() => {
    if (data && data.length !== 0) {
      loadIgv(data)
    }
  }, [data])

  return (
    <div ref={ref} className={watermarkCss + ""}>
      <div className='' id="igv-div" style={{ "height": "500px", "width": width + "px" }}>
      </div>
    </div>
  )
})

export default Igv
