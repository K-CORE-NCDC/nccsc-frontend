import React, { useState, useEffect, useRef } from 'react'
import Igv from '../../Common/igv';
import LoaderCmp from '../../Common/Loader';
import { IGV } from '../../../actions/api_actions'
import NoContentMessage from '../../Common/NoContentComponent'
import { exportComponentAsPNG } from 'react-component-export-image';
import { useHistory } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import '../../../styles/css/cnv.css'

export default function DataIgv({ inputData, screenCapture, setToFalseAfterScreenCapture }) {
  const reference = useRef()
  const [igvJson, setigvJson] = useState([])
  const [activeCmp, setActiveCmp] = useState(false)
  const [loader, setLoader] = useState(false)
  const [watermarkCss, setWatermarkCSS] = useState("")
  const [selectGenemsg, setSelectGenemsg] = useState(true)
  const history = useHistory();
  
  useEffect(() => {
    if (inputData.type !== '' && inputData['genes'].length > 0) {
      let dataJson = inputData
      setLoader(true)
      let return_data = IGV('POST', dataJson)
      return_data.then((result) => {
        const d = result
        if (d.status === 200) {
          let r_ = d["data"]
          setigvJson(r_)
        } else {
          setigvJson([])
        }
      })
        .catch((e) => {
          setigvJson([])
          history.push('/notfound')
        })
    }
  }, [inputData])

  useEffect(() => {
    if (igvJson && loader) {
      setTimeout(function () {
        setLoader(false)
      }, (1000));
    }
    if (igvJson && igvJson.length > 0) {
      setActiveCmp(false)
      setSelectGenemsg(false)
    }
    else if (inputData['genes'].length <= 0) {
      setSelectGenemsg(true)
    }
    else {
      setSelectGenemsg(false)
      setActiveCmp(true)
    }
  }, [igvJson])

  useEffect(() => {
    if (screenCapture) {
      setWatermarkCSS("watermark")
    } else {
      setWatermarkCSS("")
    }

    if (watermarkCss !== "" && screenCapture) {
      exportComponentAsPNG(reference)
      setToFalseAfterScreenCapture()
    }

  }, [screenCapture, watermarkCss])


  return (
    <>{

      loader ?
        <LoaderCmp />
        :
        <div>
          {

            <>
              <div className="sub_head">
                <div>
                  <button className="cnvBtn" style={{ backgroundColor: 'red', border: '3px solid gray' }}></button>
                  <h3><strong className="">Gain (&gt;=3) </strong></h3>
                </div>
                <div>
                  <button className="cnvBtn" style={{ backgroundColor: 'white', border: '3px solid gray' }}></button>
                  <h3><strong className="">Normal (=2)</strong></h3>
                </div>
                <div>
                  <button className="cnvBtn" style={{ backgroundColor: 'cornflowerblue', border: '3px solid gray' }}></button>
                  <h3><strong className="">Loss (&lt;=1)</strong></h3>
                </div>
              </div>
              {selectGenemsg && <p className='py-3'><FormattedMessage id="PleaseSelecttheGeneSetData" defaultMessage="Please Select the Gene Set Data" /></p>}
              {activeCmp === true && <NoContentMessage />}
              {igvJson && <Igv watermarkCss={watermarkCss} ref={reference} data={igvJson} />}
            </>
          }

        </div>
    }
    </>
  )
}
