import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GeneInfo } from '../../../actions/api_actions';
import LoaderCmp from '../../Common/Loader';
import NoContentMessage from '../../Common/NoContentComponent';
import chart_types from '../../DataSummary/genomicCharyTypes';
import html2canvas from 'html2canvas';

export default function DataGenomic({
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
}) {
  const [loader, setLoader] = useState(false);
  const [activeCmp, setActiveCmp] = useState(true);
  let { project_id } = useParams();
  const [summaryJson, setSummaryJson] = useState({});
  const [summaryJsonStatus, setSummaryJsonStatus] = useState(200);
  const [state, setState] = useState({ charts: [] });
  const downloadContainerRef = useRef(null);
  const liRefs = useRef({});

  useEffect(() => {
    if (project_id && activeCmp) {
      let data = GeneInfo('POST', inputData);
      data.then((result) => {
        if (result.status === 200) {
          setSummaryJson(result.data);
          setSummaryJsonStatus(200);
        } else {
          setSummaryJson({});
          setSummaryJsonStatus(204);
        }
      });
      setActiveCmp(false);
    } else {
      if (activeCmp) {
        let data = GeneInfo('POST', inputData);
        data.then((result) => {
          if (result.status === 200) {
            setSummaryJson(result.data);
            setSummaryJsonStatus(200);
          } else {
            setSummaryJson({});
            setSummaryJsonStatus(204);
          }
        });
        setActiveCmp(false);
      }
    }
  }, [project_id, activeCmp, inputData]);

  useEffect(() => {
    if (screenCapture) {
      handleCapture();
    }
  }, [screenCapture]);

  const handleCapture = async () => {
    if (screenCapture) {
      let nameList = ["Variant Classification", "Variant Type", "Top 10 Mutated Genes", "Variant Classification Summary"]
      Object.values(liRefs.current).forEach(async (ref, index) => {
        const canvas = await html2canvas(ref.current);
        const image = canvas.toDataURL('image/png');

        // Create a download anchor
        const link = document.createElement('a');
        link.href = image;
        link.download = `${nameList[index]}.png`; // Set a unique name for each download
        link.style.display = 'none';

        // Trigger a click on the anchor to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
      });

      setToFalseAfterScreenCapture();
    }
  };

  let visual_type = {
    'Variant Classification': 'Bar',
    'Variant Type': 'Bar',
    'SNV Class': 'Bar',
    'Top 10 Mutated Genes': 'stack_bar',
    'Variant Classification Summary': 'box_plot'
  };

  useEffect(() => {
    if (summaryJsonStatus === 200 && summaryJson) {
      let html = [];
      Object.keys(summaryJson).forEach((item, k) => {
        let type = visual_type[item];
        let comp = '';
        if (item === 'dna_per_sample') {
          comp = chart_types(type, summaryJson[item], 'x-axis');
        } else {
          comp = chart_types(type, summaryJson[item], '');
        }
        liRefs.current['omics' + k] = React.createRef();

        html.push(
          <li
            key={'omics_' + k}
            // chartkey={'omics_' + k}
            className="max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border"
            ref={liRefs.current['omics' + k]}
          >
            <div className="px-6 py-4">
              <div className="font-bold lg:text-2xl sm:text-xl md:text-xl mb-2">{item}</div>
            </div>

            <div className="lg:px-6 md:px-3 sm:px-0 sm:pt-1 lg:pt-4 md:pt-1 pb-4">{comp}</div>
          </li>
        );
      });
      setState((prevState) => ({
        ...prevState,
        charts: html
      }));

      setTimeout(function () {
        setLoader(false);
      }, 1000);
    }
  }, [summaryJson, summaryJsonStatus]);

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        summaryJsonStatus === 200 ? (
          <div className="genomic ptn">
            <div className="auto">
              {state['charts'] && (
                <div ref={downloadContainerRef} className="dataList singleDataViz">
                  <ul>{state['charts']}</ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <NoContentMessage />
        )
      )}
    </>
  );
}
