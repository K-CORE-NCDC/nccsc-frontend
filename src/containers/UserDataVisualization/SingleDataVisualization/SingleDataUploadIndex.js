import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import FileUpload from './SingleDataFileUpload';
import FileProjectDataTable from './SingleDataTable';

export default function Index() {
  const [componentNumber, setComponentNumber] = useState(0);
  let { tab } = useParams();
  const updateComponentNumber = (num) => {
    setComponentNumber(num);
  };
  const breadCrumbs = {
    '/singledata-upload/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      {
        id: 'MyDataVisualization',
        defaultMessage: 'Visualise My Data',
        to: '/home/visualizeMyData/'
      },
      {
        id: 'SingleDataVisualization',
        defaultMessage: 'Single Data Visualization',
        to: '/visualise-singledata/home/'
      },
      { id: 'Upload', defaultMessage: `Upload ${tab}`, to: `/singledata-upload/${tab}` }
    ]
  };
  return (
    <div>
      <HeaderComponent
        title="회원가입"
        routeName="/singledata-upload/"
        breadCrumbs={breadCrumbs['/singledata-upload/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font>
                <FormattedMessage id="SingleData" defaultMessage="Single Data" />
              </font>
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="Upload" defaultMessage="Upload" />
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          {componentNumber === 0 && (
            <FileUpload
              updateComponentNumber={updateComponentNumber}
              componentNumber={componentNumber}
            />
          )}
          {componentNumber === 1 && (
            <FileProjectDataTable updateComponentNumber={updateComponentNumber} />
          )}
        </div>
      </article>
    </div>
  );
}
