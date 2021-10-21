import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png'
import {FormattedMessage} from 'react-intl';


export default function DataDeliverGuidance() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div className="on" >
          <h6 className="h-tit6 mt20"><FormattedMessage  id = "Guidance on data provision processing procedures" defaultMessage='Guidance on data provision processing procedures'/></h6>
          <p className="sub_text text-left"><b style={{'color':'#da0404'}}><FormattedMessage  id = "You can check the progress through My Page." defaultMessage='You can check the progress through My Page.'/></b></p>
          <div className="step">
              <ul>
                  <li>
                      <div>
                          <span>STEP 1</span>
                          <p><FormattedMessage  id = "Document application" defaultMessage='Document application'/></p>
                      </div>
                      <b>※ <FormattedMessage  id = "If the document is insufficient, it can be returned." defaultMessage='If the document is insufficient, it can be returned.'/></b>
                  </li>
                  <li>
                      <div>
                          <span>STEP 2</span>
                          <p><FormattedMessage  id = "Data provision deliberation" defaultMessage='Data provision deliberation'/></p>
                      </div>
                  </li>
                  <li>
                      <div>
                          <span>STEP 3</span>
                          <p><FormattedMessage  id = "Approval" defaultMessage='Approval'/></p>
                      </div>
                  </li>
                  <li>
                      <div>
                          <span>STEP 4</span>
                          <p><FormattedMessage  id = "Data provision" defaultMessage='Data provision'/></p>
                      </div>
                  </li>
              </ul>
          </div>
          <h6 className="h-tit6 mt20"><FormattedMessage  id = "Detailed application process guidance" defaultMessage='Detailed application process guidance'/></h6>

          <img src={data_apply} alt="Detailed application process guidance"/>
          <p className='text-left'><b  style={{'color':'#da0404'}}>※ <FormattedMessage  id = "For the BioBank data, separate deliberation procedures are carried out." defaultMessage='For the BioBank data, separate deliberation procedures are carried out.'/></b></p>
          <h6 className="h-tit6 mt20"><FormattedMessage  id = "Procedure for extending the period of use" defaultMessage='Procedure for extending the period of use'/></h6>

          <div className="use_step">
              <div className="step_box">
                  <img src={icon_1} alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 01. <FormattedMessage  id = "Application for extension of period of use" defaultMessage='Application for extension of period of use'/></h3>
                      <p><FormattedMessage  id = "Select Data" defaultMessage='Select Data'/></p>
                  </div>
              </div>
              <div className="step_box">
                  <img  src={icon_2}  alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 02. <FormattedMessage  id = "Review Extension Application" defaultMessage='Review Extension Application'/></h3>
                      <div className="step_meta"><FormattedMessage  id = "Staff Review and Approval" defaultMessage='Staff Review and Approval'/></div>
                      <p><FormattedMessage  id = "Reviewing and approving portal representative applications" defaultMessage='Reviewing and approving portal representative applications'/></p>
                  </div>
              </div>
              <div className="step_box">
                  <img  src={icon_3}  alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 03.<FormattedMessage  id = "Notification of results and extended period of use" defaultMessage='Notification of results and extended period of use'/></h3>
                      <div className="step_meta"><FormattedMessage  id = "Staff Review and Approval" defaultMessage='Staff Review and Approval'/></div>
                      <p><FormattedMessage  id = "Notification of the applicant's e-mail result and extension of the deadline" defaultMessage="Notification of the applicant's e-mail result and extension of the deadline"/></p>
                  </div>
              </div>
          </div>

          <h6 className="h-tit6 mt20"><FormattedMessage  id = "Fill out the application form" defaultMessage="Fill out the application form"/></h6>
          <div className="tbl type1 scroll">
              <table className="table w-full" id="table">

                  <thead className='bg-gray-200 border-black border-t-2 border-b-2'>
                      <tr >
                          <th className='p-5'><FormattedMessage  id = "Procedure classNameification" defaultMessage="Procedure classNameification"/></th>
                          <th className='p-5'><FormattedMessage  id = "Essential" defaultMessage="Essential"/></th>
                          <th className='p-5'><FormattedMessage  id = "Choice" defaultMessage="Choice"/></th>
                      </tr>
                  </thead>
                  <tbody className='bg-white'>
                      <tr className="tr_row">
                          <td><FormattedMessage  id = "Application stage" defaultMessage="Application stage"/></td>
                          <td>
                              <FormattedMessage  id = "Research plan" defaultMessage="Research plan"/><br/>
                              <FormattedMessage  id = "IRB Approval Letter" defaultMessage="IRB Approval Letter"/><br/>
                              <FormattedMessage  id = "Application form for data use" defaultMessage="Application form for data use"/><br/>
                              <FormattedMessage  id = "Data request specification" defaultMessage="Data request specification"/><br/>
                              <FormattedMessage  id = "Security Pledge" defaultMessage="Security Pledge"/><br/>
                              <FormattedMessage  id = "Consent to collect and use personal information" defaultMessage="Consent to collect and use personal information"/>
                          </td>
                          <td>
                              <FormattedMessage  id = "Application for change in data use" defaultMessage="Application for change in data use"/><br/>
                              <FormattedMessage  id = "Application for Objection" defaultMessage="Application for Objection"/>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>


          <br/><br/>
          <div className="btn_wrap center">
              <a href="#" className="btn btn-color3 btn-md"><FormattedMessage  id = "Download application form" defaultMessage="Download application form"/></a>
              <a href="/web/usr/mypage.do" className="btn btn-color4 btn-md"><FormattedMessage  id = "Inquiry of application" defaultMessage="Inquiry of application"/></a>
              <a href="/web/sub/sub4_1.do?sub=4_3" className="btn btn-color4 btn-md"><FormattedMessage  id = "Data Application" defaultMessage="Data Application"/></a>
          </div>
      </div>
    )
}
