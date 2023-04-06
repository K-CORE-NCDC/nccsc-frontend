import React, { useState, useEffect } from "react";
import {
  sankeyImageData,
  sendReportData,
  clearPdfLink,
} from "../../actions/api_actions";
import uuid from 'react-uuid';
import html2canvas from "html2canvas";
import { useSelector, useDispatch } from "react-redux";
import config from "../../config";
function PdfPrint({ isReportClicked }) {
  const [loader, setLoader] = useState(false);
  const [anchorTag, setAnchorTag] = useState([])
  const dispatch = useDispatch();
  const reportData = useSelector(
    (state) => state.dataVisualizationReducer.rniData
  );
  const GeneMutationData = useSelector(
    (data) => data.dataVisualizationReducer.rniData
  );
  const PDF_Report_Status = useSelector(
    (data) => data.dataVisualizationReducer.PDFReport
  );


  useEffect(() => {
    let className = `.printpdf`,
      count = 0;
    if (isReportClicked === true) {
      className = `sanky_chart_pdf${count}`;
      while (document.querySelector(`.${className}`) !== null) {
        className = `sanky_chart_pdf${count}`;
        count++;
      }
      DownloadPDF(count);
    }
  }, [isReportClicked]);

  let DownloadPDF = async () => {
    if(reportData && 'response_sanky_data' in reportData ){
      setLoader(true);
      let GeneListSanky = [];
      for (let i in reportData["response_sanky_data"]) {
        if (reportData["response_sanky_data"][i]["gene_data"].length <= 0) {
          continue;
        }
        GeneListSanky.push(i);
      }
   
    let GeneandMutationList = {};
    let className = `printpdf`,
      count = 0;
    while (document.querySelector(`.${className}`) !== null) {
      className = `sanky_chart_pdf${count}`;
      count++;
    }
    if (GeneListSanky.length > 0) {
      if (GeneMutationData && "variant_info" in GeneMutationData) {
        for (let i = 0; i < GeneListSanky.length; i++) {
          GeneandMutationList[GeneListSanky[i]] =
            GeneMutationData["variant_info"][GeneListSanky[i]];
        }
      }
    }
    let unq = uuid()
    for (let i = 0; i < count - 1; i++) {
      // let element = document.querySelector(`.sanky_chart_pdf${i}`)
      let element = document.querySelector(`#chart${i}`);
      await html2canvas(element).then(canvas => {
          const imgData = canvas.toDataURL('image/jpeg',1.0);

          dispatch(sankeyImageData({'filename':element.getAttribute('name'), 'imgdata':imgData, 'unq':unq}))
      });
    }
    setTimeout(() => {
      dispatch(
        sendReportData("POST", {
          GeneandMutationList: GeneandMutationList,
          BasicInformation: reportData.basic_information[0],
          rows: reportData.genomic_summary,
          'unq':unq
        })
      );
    }, 4000);
  }
  };

  useEffect(() => {
    if (PDF_Report_Status && "res" in PDF_Report_Status) {
      let link = PDF_Report_Status["res"];
      let navlink = config.auth + link;
      dispatch(clearPdfLink());
      setLoader(false);
      window.location.href = navlink;
      
    }
  }, [PDF_Report_Status]);
  useEffect(()=>{
    if(anchorTag.length > 0 && document.getElementById('downloadPDF')){
      document.getElementById('downloadPDF').click()
      setAnchorTag([])
    }
  },[anchorTag])
  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className={`inline-flex  items-center py-6 px-6  float-left font-semibold leading-6 text-white ${loader ? 'cursor-not-allowed':""}transition duration-150 ease-in-out bg-NccBlue-700 rounded-md shadow  hover:bg-blue-700`}
          onClick={(e) => DownloadPDF(e)}
          disabled={loader ? true : false}
        >
          {loader === true && (
            <div className="">
              <svg
                className="w-36 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              </div>
            ) }

          {loader === false  && <p>Download</p>}
        </button>
      </div>
      {
        (anchorTag.length > 0) ? anchorTag : '' 
      }
    </div>
  );
}

export default PdfPrint;
