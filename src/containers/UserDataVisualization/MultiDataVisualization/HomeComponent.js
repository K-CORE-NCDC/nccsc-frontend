import React from "react";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";

const HomeComponent = () => {

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }
  let gridData = [
    { title: 'Create Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/newmultidataproject/` },
    { title: 'View Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/multidataprojectview/` },
  ]

  
  const breadCrumbs = {
    '/multidatavisualization/': [
      { id: 'FindID', defaultMessage: 'Home', to: '/' },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/multidatavisualization/' },
    ]
  }

  return (
    <div>
      <HeaderComponent
        title={title}
        routeName="/multidatavisualization/"
        breadCrumbs={breadCrumbs['/multidatavisualization/']}
        type="single"

      />
      <article id="subContents" className="subContents">
        <div className="contentsTitle">
          <h3>
            <font>
              <font><FormattedMessage id="MultiData" defaultMessage="Multi Data"/></font>
              <span className="colorSecondary">
                <font ><FormattedMessage id="Visualization" defaultMessage="Visualization"/></font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            {
              gridData &&
              <div className='dataList multiDataViz'>
                <ul >
                  {gridData.map((item, index) => (

                    <li key={index} >
                      <div className="labelBox">
                        <div className="labels01">
                          <h3 style={{ textTransform: 'capitalize' }}>
                            {item.title}
                          </h3>
                        </div>
                        <div className="labels02" style={{ columnGap: "10px" }}>
                          <Link to={item.link}>
                            <span className="label01">
                              <font>
                                <font>Run Analysis</font>
                              </font>
                            </span>
                          </Link>
                        </div>

                      </div>
                      <div>
                      <p className="multiDataVizHomeGridP">Provides a visualization analysis service that can be implemented according to the uploaded user data.</p>
                        <img src={item.image} alt="img" className="DataVizGridImage" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeComponent;
