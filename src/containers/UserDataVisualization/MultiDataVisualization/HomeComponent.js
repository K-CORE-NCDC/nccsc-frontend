import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import icon1 from '../../../assets/images/publicDataInfo-img01.svg';
import icon2 from '../../../assets/images/publicDataInfo-img02.svg';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import { useDispatch } from 'react-redux';
import {
  UserDataProjectsCount
} from '../../../actions/api_actions';

import Draggable from 'react-draggable';
const HomeComponent = () => {
  const title = { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization' };
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(true);
  const [showOverloadMessage, setShowOverloadMessage] = useState(false)
  const dispatch = useDispatch();

  let closeModal = () => {
    setIsOpen(false);
    history.replace({
      ...location,
      state: {}
    });
  };

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

  const breadCrumbs = {
    '/multidatavisualization/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
      {
        id: 'MultiDataVisualization',
        defaultMessage: 'Multi Data Visualization',
        to: '/multidatavisualization/'
      }
    ]
  };


  useEffect(() => {
    let return_data = UserDataProjectsCount('GET', {});
    return_data.then((result) => {
      const d = result;
      // console.log(`d=${d.data}`)
      if (d.status === 200 && d.data.data >= 5) {
        history.push({
          pathname: '/multidatavisualization/',
          state: { redirected: true }
        });
        setShowOverloadMessage(true)
      }
      else {
        setShowOverloadMessage(false)
      }
    });
  }, []);

  return (
    <div>
      {location.state && location.state.redirected && isOpen && isOpen === true && (
        <Draggable disabled={!isOpen} onDrag={handleDrag}>
          <div
            style={{
              width: '300px',
              height: '400px',
              position: 'fixed',
              bottom: isOpen ? '0px' : '-1000px',
              right: isOpen ? '50px' : '-1000px',
              zIndex: '15'
            }}
          >
            <div className="mainPopup W100" data-aos="zoom-in" data-aos-once="true">
              <div className="popupHeader">
                <h3 className="TextLeft">Note</h3>
                <button
                  className="material-icons mainPopupClose"
                  id="mainPopupClose"
                  onClick={closeModal}
                  onTouchStart={closeModal}
                >
                  close
                </button>
              </div>
              <div
                className="popupBody  introduceWrap"
                style={{ padding: '0px', border: '1px solid #ddd' }}
              >
                <div className="introduceBox03" style={{ width: '100%', backgroundColor: "rgb(254, 196, 11)" }}>
                  <ul>
                    <li style={{ borderBottom: "1px solid black", color: 'black' }}>
                      <p style={{ color: "black" }}>
                        <FormattedMessage
                          id="projectCountGuide1"
                          defaultMessage="It is possible to create 5 projects on a account."
                        />
                      </p>
                    </li>
                    <li style={{ color: 'black' }}>
                      <p style={{ color: 'black' }}>
                        <FormattedMessage
                          id="projectCountGuide2"
                          defaultMessage="The period to check each project is 2 weeks from the date of creation. After 2 weeks, the project will be deleted."
                        />
                      </p>
                    </li>
                    <li style={{ color: 'black' }}>
                      <p style={{ color: 'black' }}>
                        <FormattedMessage
                          id="projectCountGuide3"
                          defaultMessage="Please delete the project and create a new project."
                        />
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}

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
              <font>
                <FormattedMessage id="MultiData" defaultMessage="Multi Data" />
              </font>
              &nbsp;
              <span className="colorSecondary">
                <font>
                  <FormattedMessage id="visualization" defaultMessage="Visualization" />
                </font>
              </span>
            </font>
          </h3>
        </div>
        <div className="ptn">
          <div className="auto">
            <div className="publicDataInfo" style={{ padding: '60px 230px', marginBottom: '0px' }}>
              <ul style={{ marginTop: '-40px', gap: '40px' }}>

                <Link to={showOverloadMessage ? location?.pathname : "/newmultidataproject/"}>
                  <li style={showOverloadMessage ? { background: '#f0efef' } : {}}>
                    <img src={icon1} alt="icon1" />
                    <dl>
                      <dt>
                        <FormattedMessage id="CreateProjects" defaultMessage="Create Project" />
                      </dt>
                      <dd>
                        <FormattedMessage
                          id="CreateProjectContent"
                          defaultMessage="Provides a visualization analysis service according to the uploaded user data."
                        />
                      </dd>
                    </dl>
                  </li>
                </Link>

                <Link to="/multidataprojectview/">
                  <li>
                    <img src={icon2} alt="icon2" />
                    <dl>
                      <dt>
                        <FormattedMessage id="ViewProjects" defaultMessage="View Projects" />
                      </dt>
                      <dd>
                        <FormattedMessage
                          id="ViewProjectText"
                          defaultMessage="View the list of analysis projects and it will navigate to the desired project."
                        />
                      </dd>
                    </dl>
                  </li>
                </Link>

              </ul>
              {showOverloadMessage && <p style={{ color: "red", paddingTop: '10px', textAlign: 'center' }}><FormattedMessage id='5ProjectsMessage' defaultMessage='You cannot create more than 5 projects. Please delete some projects to create new projects.' /></p>}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default HomeComponent;
