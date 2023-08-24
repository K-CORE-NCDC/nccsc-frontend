import React, { useEffect, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';

function ReportSubHeader({ tData, tableData }) {
  const [sm, setSm] = useState(0);
  const [md, setMd] = useState(0);
  const [width, setWidth] = useState(0);
  const [dataExist, setDataExist] = useState(false);
  useEffect(() => {
    if (dataExist) {
      let w = 0,
        s = 0,
        m = 0;

      if (document.getElementsByClassName('rdt_TableHeadRow')) {
        let row = document.getElementsByClassName('rdt_TableHeadRow')[1];
        if (row && w === 0 && s === 0 && m === 0) {
          let r = row.childNodes;
          if (r.length > 0) {
            for (let index = 0; index < r.length; index++) {
              const element = r[index];
              if (index === 0) {
                s = element.offsetWidth;
                w = w + s;
              } else {
                m = element.offsetWidth;
                w = w + m;
              }
            }
            setSm(s);
            setMd(m);
            setWidth(w);
          }
        }
      }
    }
  }, [dataExist]);

  useEffect(() => {
    if (tData !== undefined && tData) {
      setDataExist(tData);
    }
  }, [tData, sm, md]);

  return (
    <>
      {width > 0 && sm > 0 && md > 0 && (
        <div className="flex" style={{ minWidth: width-2 + 'px', minHeight: '15px' }}>
          <div
            style={{
              minWidth: sm + 'px',
              borderRight: '1px solid #6F7378',
              borderLeft: '1px solid #fff',
              padding:'20px 16px'
            }}
            className=" px-5 py-8 text-center Flex JustifyCenter"
          >
            <h1 style={{ marginTop: '5px' }}> <FormattedMessage id="Genes" defaultMessage="Genes" /></h1>
          </div>

          {dataExist && tableData[0].hasOwnProperty('dna') && (
            <div
              style={{
                minWidth: md * 2 + 'px',
                borderRight: '1px solid #6F7378',
                borderLeft: '1px solid #fff',
                padding:'20px 16px'
              }}
              className=" px-5 py-8 text-center Flex JustifyCenter "
            >
              <h1 style={{ marginTop: '5px' }}>DNA Mutation</h1>
              <span>
                <FormattedMessage id='SankeyTableDNAMutationTooltip' defaultMessage="if occured mutation is one of the following variant">
                  {(placeholder) => (
                    <>
                      <QuestionMarkCircleIcon
                        data-multiline={true}
                        className="inline ml-2 mb-1"
                        data-class="my-tooltip"
                        data-tip={`Yes :  ${placeholder} <br>  <br/>types - Missense mutation, Nonsense mutation, Splice site, <br>  <br/>In frame insertion, In frame deletion, Frame-shift insertion, Frame-shift deletion`}
                        style={{ width: '20px', cursor: 'pointer' }}
                      ></QuestionMarkCircleIcon>
                      <ReactTooltip /></>
                  )}
                </FormattedMessage>

              </span>
            </div>
          )}

          {dataExist && tableData[0].hasOwnProperty('rna') && (
            <div
              style={{
                minWidth: md * 3 + 'px',
                borderRight: '1px solid #6F7378',
                borderLeft: '1px solid #fff',
                padding:'20px 16px'
              }}
              className=" px-5 py-8 text-center Flex JustifyCenter "
            >
              <h1 style={{ marginTop: '5px' }}>RNA</h1>
              <span>
                <QuestionMarkCircleIcon
                  data-multiline="true"
                  className="inline ml-2 mb-1"
                  data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 "
                  style={{ width: '20px', cursor: 'pointer' }}
                ></QuestionMarkCircleIcon>
                <ReactTooltip />
              </span>
            </div>
          )}

          {dataExist && tableData[0].hasOwnProperty('proteome') && (
            <div
              style={{ minWidth: md * 3 + 'px', borderLeft: '1px solid #fff',padding:'20px 16px' }}
              className=" px-5 py-8 text-center Flex JustifyCenter "
            >
              <h1 style={{ marginTop: '5px' }}>Proteome</h1>
              <span>
                <QuestionMarkCircleIcon
                  data-multiline="true"
                  className="inline ml-2 mb-1"
                  data-tip="Proteome high : z-score ≥ 1.5,<br>  <br/>Proteome low : z-score ≤ 0.5"
                  style={{ width: '20px', cursor: 'pointer' }}
                ></QuestionMarkCircleIcon>
                <ReactTooltip />
              </span>
            </div>
          )}
        </div >
      )
      }
    </>
  );
}
export default ReportSubHeader;
