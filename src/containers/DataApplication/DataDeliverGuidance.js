import React from "react";
import {Link} from "react-router-dom";
import data_apply from '../../assets/images/sub/data_apply.png'
import icon_1 from '../../assets/images/sub/icon_1.png'
import icon_2 from '../../assets/images/sub/icon_2.png'
import icon_3 from '../../assets/images/sub/icon_3.png'


export default function DataDeliverGuidance() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
      <div className="on" >
          <h6 className="h-tit6 mt20">Guidance on data provision processing procedures</h6>
          <p className="sub_text text-left"><b style={{'color':'#da0404'}}>You can check the progress through My Page.</b></p>
          <div className="step">
              <ul>
                  <li>
                      <div>
                          <span>STEP 1</span>
                          <p>Document application</p>
                      </div>
                      <b>※If the document is insufficient, it can be returned.</b>
                  </li>
                  <li>
                      <div>
                          <span>STEP 2</span>
                          <p>Data provision deliberation</p>
                      </div>
                  </li>
                  <li>
                      <div>
                          <span>STEP 3</span>
                          <p>Approval</p>
                      </div>
                  </li>
                  <li>
                      <div>
                          <span>STEP 4</span>
                          <p>Data provision</p>
                      </div>
                  </li>
              </ul>
          </div>
          <h6 className="h-tit6 mt20">Detailed application process guidance</h6>

          <img src={data_apply} alt="Detailed application process guidance"/>
          <p className='text-left'><b  style={{'color':'#da0404'}}>※ For the BioBank data, separate deliberation procedures are carried out.</b></p>
          <h6 className="h-tit6 mt20">Procedure for extending the period of use</h6>

          <div className="use_step">
              <div className="step_box">
                  <img src={icon_1} alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 01. Application for extension of period of use</h3>
                      <p>Select Data</p>
                  </div>
              </div>
              <div className="step_box">
                  <img  src={icon_2}  alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 02. Review Extension Application</h3>
                      <div className="step_meta">Staff Review and Approval</div>
                      <p>Reviewing and approving portal representative applications</p>
                  </div>
              </div>
              <div className="step_box">
                  <img  src={icon_3}  alt=""/>
                  <div className="use_step_txt">
                      <h3 className="use_step_title">STEP 03. Notification of results and extended period of use</h3>
                      <div className="step_meta">Staff Review and Approval</div>
                      <p>Notification of the applicant's e-mail result and extension of the deadline</p>
                  </div>
              </div>
          </div>

          <h6 className="h-tit6 mt20">Fill out the application form</h6>
          <div className="tbl type1 scroll">
              <table className="table w-full" id="table">

                  <thead className='bg-gray-200 border-black border-t-2 border-b-2'>
                      <tr >
                          <th className='p-5'>Procedure classNameification</th>
                          <th className='p-5'>Essential</th>
                          <th className='p-5'>Choice</th>
                      </tr>
                  </thead>
                  <tbody className='bg-white'>
                      <tr className="tr_row">
                          <td>Application stage</td>
                          <td>
                              Research plan<br/>
                              IRB Approval Letter<br/>
                              Application form for data use<br/>
                              Data request specification<br/>
                              Security Pledge<br/>
                              Consent to collect and use personal information
                          </td>
                          <td>
                              Application for change in data use<br/>
                              Application for Objection
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>


          <br/><br/>
          <div className="btn_wrap center">
              <a href="#" className="btn btn-color3 btn-md">Download application form</a>
              <a href="/web/usr/mypage.do" className="btn btn-color4 btn-md">Inquiry of application</a>
              <a href="/web/sub/sub4_1.do?sub=4_3" className="btn btn-color4 btn-md">Data Application</a>
          </div>
      </div>
    )
}
