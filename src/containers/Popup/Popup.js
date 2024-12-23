import React, { useState, useEffect,useRef } from 'react';
import { NoticeDetail } from '../../actions/api_actions';
import config from '../../config';
import Draggable from 'react-draggable';
import { FormattedMessage } from 'react-intl';

function Popup({ toggleModal }) {
  const [content, setContent] = useState('');
  const [noticedetails, setNoticeDetails] = useState({});
  const [noticeStatus, setNoticeStatus] = useState(200);
  const [isOpen, setIsOpen] = useState(false);

  /* getting the notice detail as response */
  const divRef=useRef(null)

  useEffect(() => {

    let currentUrl = window.location;
    if (
      currentUrl['pathname'] === '/k-core/' ||
      currentUrl['pathname'] === '/k-core/home/' ||
      currentUrl['pathname'] === '/' ||
      currentUrl['pathname'] === '/k-core/'
    ) {
      let data = NoticeDetail('GET');
      data.then((result) => {
        if (result.status === 200) {
          // if (divRef.current) {
          //   divRef.current.focus(); // Set focus on the div
          // }
          setNoticeDetails(result.data);
          setNoticeStatus(200);

        } else {
          setNoticeDetails({});
          setNoticeStatus(204);
        }
      });
    }
  }, []);

  useEffect(() => {
    let currentUrl = window.location;
    if (
      currentUrl['pathname'] === '/k-core/' ||
      currentUrl['pathname'] === '/k-core/home/' ||
      currentUrl['pathname'] === '/' ||
      currentUrl['pathname'] === '/k-core/'
    ) {
      setIsOpen(true);
      toggleModal(true);
    } else {
      setIsOpen(false);
      toggleModal(false);
    }
  });

  let changeDay = () => {
    let noticeDate = new Date()
    noticeDate.setDate(noticeDate.getDate() + 1);
    noticeDate.setHours(0, 0, 0, 0);
    // const options = { timeZone: "Asia/Seoul" , year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const options = { timeZone: "Asia/Seoul", year: 'numeric', month: 'numeric', day: 'numeric' };
    noticeDate = noticeDate.toLocaleString("en-US", options);
    localStorage.setItem('ncc_notice_popup', JSON.stringify({ date: noticeDate, showpopup: true }));
    setIsOpen(false);
    toggleModal(false);
  };

  let closeModal = () => {
    setIsOpen(false);
    toggleModal(false);
  };
  useEffect(() => {
    if (noticedetails && noticedetails.data && Object.keys(noticedetails['data']).length > 0) {
      let content = noticedetails['data']['content'];
      if (content) {
        content = content.replaceAll('="/media', '="' + config['media'] + '');
        setContent(content);
        setIsOpen(true);
      }
    }
  }, [noticedetails]);

  const handleDrag = () => {
    if (!isOpen) {
      return false;
    }
  };

  return (
    <>
      {isOpen && isOpen === true && (
        noticeStatus === 200 &&
        noticedetails &&
        noticedetails?.data &&
        Object.keys(noticedetails['data']).length > 0
        &&
        <Draggable disabled={!isOpen} onDrag={handleDrag} ref={divRef}>

          <div tabIndex={0} autoFocus={true}
            style={{
              width: '600px',
              height: '400px',
              position: 'absolute',
              top: isOpen ? '50px' : '-1000px',
              left: isOpen ? '50px' : '-1000px',
              transition: 'top 0.3s ease-in-out, left 0.3s ease-in-out',
              zIndex: '100'
            }}
          >
            <div className="mainPopup">
              <div className="popupHeader" style={{ backgroundColor: "rgb(0, 75, 155)" }}>
                <h3 className="TextAlignCenter">
                  <FormattedMessage id="NoticePopup" defaultMessage="Notice Popup" />
                </h3>
                <button
                  className="material-icons mainPopupClose"
                  id="mainPopupClose"
                  onClick={closeModal}
                  onTouchStart={closeModal}
                >
                  close
                </button>
              </div>

              {noticeStatus === 200 &&
                noticedetails &&
                noticedetails?.data &&
                Object.keys(noticedetails['data']).length > 0 && (
                  <div className="popupBody" style={{ backgroundColor: "rgb(240, 242, 246)" }} dangerouslySetInnerHTML={{ __html: content }}></div>
                )}
              <div className="popupFooter">
                <button className="mainPopupClose" type="button" onClick={changeDay} id="RemindAfter24hrsButton">
                  <FormattedMessage id="RemindAfter24hrs" defaultMessage="Remind after 24 hrs" />
                </button>
                <button className="mainPopupClose" onTouchStart={closeModal} onClick={closeModal} id="CloseButton">
                  {' '}
                  <FormattedMessage id="Close" defaultMessage="Close" />{' '}
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
}

export default Popup;
