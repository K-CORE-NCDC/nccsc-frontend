import React, { useState, useEffect, useCallback } from 'react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { GenomicInformation } from '../../../actions/api_actions';
import chart_types from '../genomicCharyTypes';
import Filter from './filter';
import LoaderCmp from '../../Common/Loader';

export default function AdvancedInfo() {
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);
  const [summaryJson, setSummaryJson] = useState({});
  const [summaryJsonStatus, setSummaryJsonStatus] = useState(204);

  useEffect(() => {
    let data = GenomicInformation('POST', '');
    data.then((result) => {
      if (result.status === 200) {
        setSummaryJson(result.data);
        setSummaryJsonStatus(200);
      } else {
        setSummaryJson({});
        setSummaryJsonStatus(204);
      }
    });
  }, []);

  let visual_type = {
    'Variant Classification': 'Bar',
    'Variant Type': 'Bar',
    'SNV Class': 'Bar',
    'Top 10 Mutated Genes': 'stack_bar',
    'Variant Per Sample': 'stack_bar',
    'Variant Classification Summary': 'box_plot',
    'Variant per Sample': 'vertical_stack_bar',
    Methylation: 'vertical_stack_bar',
    Proteome: 'vertical_stack_bar',
    Phospho: 'vertical_stack_bar'
  };

  useEffect(() => {
    if (summaryJsonStatus === 200 && summaryJson) {
      let html = [];
      Object.keys(summaryJson).forEach((item, k) => {
        let type = visual_type[item];
        if (item === 'Venn') {
          return;
        }
        let comp = '';
        comp = chart_types(type, summaryJson[item], visual_type[item]);
        if (item !== 'Omics Sample Summary') {
          html.push(
            <div
              key={'omics_' + k}
              className="max-w bg-white rounded overflow-hidden shadow-lg px-4 py-3 mb-5 mx-3 card-border"
            >
              <div className="px-6 py-4">
                <div className="font-bold lg:text-2xl md:text-xl sm:text-xl mb-2">{item}</div>
              </div>
              <div className="px-6 pt-4 pb-4">{comp}</div>
            </div>
          );
        }
      });
      setState(html);
      setTimeout(function () {
        setLoader(false);
      }, 1000);
    }
  }, [summaryJson, summaryJsonStatus]);

  const callback = useCallback((filters) => {
    setState([]);
    if (filters) {
      setLoader(true);
      let data_ = { filter: filters };
      let data = GenomicInformation('POST', data_);
      data.then((result) => {
        if (result.status === 200) {
          setSummaryJson(result.data);
          setSummaryJsonStatus(200);
        } else {
          setSummaryJson({});
          setSummaryJsonStatus(204);
        }
      });
    } else {
      setLoader(true);
      let data = GenomicInformation('POST', '');
      data.then((result) => {
        if (result.status === 200) {
          setSummaryJson(result.data);
          setSummaryJsonStatus(200);
        } else {
          setSummaryJson({});
          setSummaryJsonStatus(204);
        }
      });
    }
  }, []);

  const set_screen = useCallback(() => {
    setSmallScreen(false);
  }, []);

  return (
    <div className="header">
      <div className="mx-auto rounded overflow-hidden ">
        <div id="main_div">
          <div className={`grid grid-cols-4 gap-6`}>
            <div
              className={`bg-white border lg:block xl:block sm:hidden border-gray-200 ${smallScreen ? 'xs:col-span-4 z-10 opacity-95' : 'xs:hidden'
                }`}
            >
              <Filter parentCallback={callback} small_screen={set_screen} />
            </div>
            <div
              className={`lg:col-start-2 md:col-start-2 lg:col-span-3 md:col-span-3 sm:col-span-4 xs:col-span-4 pt-4 overflow-auto ${smallScreen ? 'absolute' : ''
                }`}
            >
              {loader ? (
                <LoaderCmp />
              ) : (
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:lg:grid-cols-2 gap-1">
                  <div className="pl-6 mb-5 lg:hidden md:hidden">
                    <button
                      className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={() => setSmallScreen(true)}
                      type="button"
                    >
                      <AdjustmentsIcon className="h-6 w-6 inline" />
                    </button>
                  </div>
                  {state}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
