import React from 'react';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import { FormattedMessage } from 'react-intl';
function Blast() {
  const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' };
  const breadCrumbs = {
    '/blast/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      {id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/'},
      { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' },
      { id: 'Blast', defaultMessage: 'Blast', to: '/blast/' }
    ]
  };
  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/blast/']} type="single" />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font>
                <FormattedMessage id="Blast" defaultMessage="Blast" />{' '}
              </font>
              <span className="colorSecondary">
                <font></font>
              </span>
            </font>
          </h3>
        </div>

        <div className="ptn">
          <div className="auto">
            <div>
              <iframe
                title="blast search"
                // src="http://3.144.127.180:4567/"
                src="https://www.cancerdata.re.kr:8686/"
                width={'100%'}
                height={'600px'}
              ></iframe>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
export default Blast;
