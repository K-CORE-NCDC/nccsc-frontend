import React, { useState } from 'react'
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import { FormattedMessage } from "react-intl";
import { Link, useHistory, useParams } from "react-router-dom";
function SankeyPlot() {

  const title = { id: "SankeyPlot", defaultMessage: "Sankey Plot" }
  let { tab, project_id } = useParams();
  const [tabName, setTabName] = useState('patientSummary')
  const breadCrumbs = {
    '/sankeyplot/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'VisualiseMyData', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: project_id ? `/visualise-multidata/home/${project_id}` : `/visualise-multidata/home/` },
      { id: 'SankeyPlot', defaultMessage: 'Sankey Plot', to: '/sankeyplot/' }
    ],
  };

  return (
    <div>
      <HeaderComponent
        title={title}
        breadCrumbs={breadCrumbs['/sankeyplot/']}
        type="single"
      />
      <article id="subContents" className="subContents">
        <div className="ptn">
          <div className="auto">

            <div className="tabs_box">
              <div className="tab mainTab">
                <div className="tab_main">
                  <ul>

                    <li className={tabName === 'patientSummary' ? 'on' : ''}> <button onClick={e => {
                      setTabName('patientSummary')
                    }} name='type' > <FormattedMessage id="PatientSummary" defaultMessage="Patient Summary" /> </button></li>

                    <li className={tabName === 'drugRelation' ? 'on' : ''}> <button onClick={e => {
                      setTabName('drugRelation')
                    }} name='type' > <FormattedMessage id="DrugRelationPlot" defaultMessage="Drug Relation Plot" /> </button></li>
                  </ul>
                </div>
              </div>
            </div>

            {
              tabName === 'patientSummary' ? 
              <div>
                
              </div> : 
              <div>

              </div>
            }
            <div>



            </div>

          </div>
        </div>
      </article>
    </div>
  )
}

export default SankeyPlot