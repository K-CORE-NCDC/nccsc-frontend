import React from "react";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import ArrowRight from '../../../assets/images/icon-arrow-right.svg';
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";
import ExampleImage from '../../../assets/images/mainSection05-img02.jpg';
const HomeComponent = () => {

  const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }
  let gridData = [
    { title: 'Create Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/newmultidataproject/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
    { title: 'View Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/multidataprojectview/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
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
              <font><FormattedMessage id="MultiData" defaultMessage="Multi Data" /></font>
              <span className="colorSecondary">
                <font ><FormattedMessage id="Visualization" defaultMessage="Visualization" /></font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            {
              gridData  &&
              <div className='mainContentsBox' style={{ marginTop: '50px' }}>
                <div className="galleryList">
                  <ul className="justify-content-center">
                    {gridData.map((item, index) => {
                      return <li key={index} className="listitems">
                        <Link to={item.link}>
                          <div className="thumb">
                            <img src={ExampleImage} alt="img" />
                            <div className="hvBox">
                              <span className="">
                                {item.title}
                                <img src={ArrowRight} alt="img" style={{paddingTop:'5px'}}/>
                              </span>
                            </div>
                          </div>

                          <div className="txtBox txtBoxpadding tac Relative">
                            <dl className="MarginTop10">
                              <dt className="h4 Capitalize">{item.title}</dt>
                              <dd className="p1">
                                {item.description}
                              </dd>
                            </dl>
                            <span className="icon"></span>
                          </div>
                        </Link>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeComponent;
