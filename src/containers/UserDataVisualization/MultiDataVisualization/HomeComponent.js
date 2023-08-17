import React,{useEffect, useState} from "react";
import HeaderComponent from "../../Common/HeaderComponent/HeaderComponent";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";
import icon1 from '../../../assets/images/publicDataInfo-img01.svg'
import icon2 from '../../../assets/images/publicDataInfo-img02.svg'
import { useLocation,useHistory } from 'react-router-dom';

import Draggable from 'react-draggable';
const HomeComponent = () => {

  const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' }
  let gridData = [
    { title: 'Create Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/newmultidataproject/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
    { title: 'View Project', image: require(`../../../assets/images/Visualizations/circos.png`).default, link: `/multidataprojectview/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
  ]

  const location = useLocation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(true);

  let closeModal = () => {
    setIsOpen(false);
    history.replace({
      ...location,
      state: {},
    });
  }

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };
 
  const breadCrumbs = {
    '/multidatavisualization/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/multidatavisualization/' },
    ]
  }

  return (
    <div>

      {location.state && location.state.redirected && isOpen && isOpen === true && <Draggable disabled={!isOpen} onDrag={handleDrag}>
        <div
          style={{
            width: '300px',
            height: '400px',
            position: 'fixed',
            bottom: isOpen ? '0px' : '-1000px',
            right: isOpen ? '50px' : '-1000px',
            zIndex: '15',

          }}

        >
          <div className="mainPopup W100" data-aos="zoom-in" data-aos-once='true'>
            <div className="popupHeader">
              <h3 className='TextLeft'>Note</h3>
              <span className="material-icons mainPopupClose" id="mainPopupClose" onClick={closeModal}>
                close
              </span>
            </div>
            <div className='popupBody  introduceWrap' style={{ "padding": "0px", "border": "1px solid #ddd" }}>
              <div className="introduceBox03" style={{ "width": "100%" }}>
                <ul>
                  <li>
                    <p>
                      <FormattedMessage id="projectCountGuide1" defaultMessage="It is possible to create 5 projects on a account." />
                    </p>
                  </li>
                  <li>
                    <p>
                      <FormattedMessage id="projectCountGuide2" defaultMessage="The period to check each project is 2 weeks from the date of creation. After 2 weeks, the project will be deleted." />
                    </p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </Draggable>}

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
                <font ><FormattedMessage id="visualization" defaultMessage="Visualization" /></font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            {/* {
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
            } */}
            <div className="publicDataInfo" style={{ padding: '60px 230px', marginBottom: '0px' }}>
              <ul style={{ marginTop: '-40px', gap: '40px' }}>
                <Link to='/newmultidataproject/'>
                  <li>
                    <img src={icon1} alt="" />
                    <dl>
                      <dt><FormattedMessage
                        id="CreateProjects"
                        defaultMessage="Create Project"
                      /></dt>
                      <dd>
                        <FormattedMessage
                          id="CreateProjectContent"
                          defaultMessage="Provides a visualization analysis service according to the uploaded user data."
                        /></dd>
                    </dl>
                  </li>
                </Link>

                <Link to='/multidataprojectview/'>
                  <li>
                    <img src={icon2} alt="" />
                    <dl>
                      <dt><FormattedMessage
                        id="ViewProjects"
                        defaultMessage="View Projects"
                      /></dt>
                      <dd><FormattedMessage
                        id="ViewProjectText"
                        defaultMessage="View the list of analysis projects and it will navigate to the desired project."
                      /></dd>
                    </dl>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeComponent;
