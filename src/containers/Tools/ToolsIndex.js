import React from 'react';
import Swal from 'sweetalert2';
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import icon1 from '../../assets/images/toolsImages/blast_pic.png';
import icon2 from '../../assets/images/toolsImages/vcf2maf_pic.png';
import icon3 from '../../assets/images/toolsImages/interpro_pic.png';
import icon4 from '../../assets/images/toolsImages/mafmerger_pic.png';
import icon5 from '../../assets/images/toolsImages/refverconverter_pic.png';
import arrow_icon from '../../assets/images/btnDetail-arrow-white.svg';
import BlastAttachment from '../../assets/files/ToolsAttachments/Blast_file.pdf';
import VcfMafAttachment from '../../assets/files/ToolsAttachments/Vcfmaf_file.pdf';
import InterproAttachment from '../../assets/files/ToolsAttachments/Interpro_file.pdf';
import MafmergerAttachment from '../../assets/files/ToolsAttachments/Mafmerger_file.pdf';
import RefverconverterAttachment from '../../assets/files/ToolsAttachments/Refverconverter_file.pdf';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const HomeComponent = () => {
  const intl = useIntl();
  const title = { id: 'MyDataVisualization', defaultMessage: 'Visualize My Data' };
  const route = useLocation();
  function downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const breadCrumbs = {
    '/tools/': [
      { id: 'Home', defaultMessage: 'Home', to: '/' },
      { id: 'MyDataVisualization', defaultMessage: 'Visualise My Data', to: '/home/visualizeMyData/' },
      { id: 'Tools', defaultMessage: 'Other Tools', to: '/tools/' }
    ]
  };

  let comingSoon = () => {
    Swal.fire({
      title: intl.formatMessage({ id: "Comingsoon", defaultMessage: 'Coming soon' }),
      icon: 'info',
      confirmButtonColor: '#003177',
      confirmButtonText: intl.formatMessage({ id: "Ok", defaultMessage: 'Ok' }),
      allowOutsideClick: false,
    })
  }

  return (
    <div>
      <HeaderComponent
        title={title}
        routeName="/tools/"
        breadCrumbs={breadCrumbs['/tools/']}
        type="single"
      />
      <article id="subContents" className="subContents">

        <div className="contentsTitle">
          <div className="auto">
            <h3 className="colorSecondary">
              <span className="colorPrimary">
                <FormattedMessage id="OtherTools1" defaultMessage="Other" />
                &nbsp;
              </span>
              <FormattedMessage id="OtherTools2" defaultMessage="Tools" />
            </h3>
          </div>
        </div>

        <div className="ptn">
          <div className="auto">
            {/* <div className="publicDataInfo" style={{ padding: '0px' }}> */}
            <div className="mainContentsBox">
              <div className="galleryList">

                <ul className={`justify-content-start`}>

                  <li className='listitems' >
                    <Link to={route?.pathname}>
                      <div className="thumb" style={{ background: '#f0efef' }}>
                        <img src={icon1} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              {/* <Link to="/blast/"> */}
                              <Link to={route?.pathname} onClick={comingSoon}>
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            <div className="textdiv" onClick={() => downloadFile(BlastAttachment, `Blast_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative" style={{ background: '#f0efef' }}>
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">Blast</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="BlastDesc"
                              defaultMessage="BLAST stands for Basic Local Alignment Search Tool. BLAST is a powerful tool for analyzing biological sequence data"
                            /></dd>
                        </dl>
                      </div>
                    </Link>
                  </li>

                  <li className='listitems'>
                    <Link to={route?.pathname}>
                      <div className="thumb">
                        <img src={icon2} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              <Link to="/vcfmaf/">
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            <div className="textdiv" onClick={() => downloadFile(VcfMafAttachment, `VCFMAF_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative">
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">VCF to MAF</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="VCFMAFDesc"
                              defaultMessage="Vcf2maf is a tool for converting files in Variant Call Format (VCF) to MAF format "
                            /></dd>
                        </dl>
                      </div>
                    </Link>
                  </li>

                  <li className='listitems'>
                    <Link to={route?.pathname}>
                      <div className="thumb">
                        <img src={icon3} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              <Link to="/interpro/">
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            <div className="textdiv" onClick={() => downloadFile(InterproAttachment, `Interpro_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative">
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">Interpro</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="InterproDesc"
                              defaultMessage="InterPro is a database of protein families, protein domains in which identifiable features found in known proteins can be applied to new protein sequences "
                            /></dd>
                        </dl>
                      </div>
                    </Link>
                  </li>


                  <li className='listitems'>
                    <Link to={route?.pathname}>
                      <div className="thumb">
                        <img src={icon4} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              <Link to="/mafmerger/">
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            <div className="textdiv" onClick={() => downloadFile(MafmergerAttachment, `MAFMERGER_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative">
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">MAF Merger</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="MAFMergerDesc1"
                              defaultMessage="by entering multiple MAF files "
                            />
                            <br />
                            <FormattedMessage
                              id="MAFMergerDesc2"
                              defaultMessage="Analysis tool to merge into 1 file"
                            />
                          </dd>
                        </dl>
                      </div>
                    </Link>
                  </li>

                  <li className='listitems'>
                    <Link to={route?.pathname}>
                      <div className="thumb">
                        <img src={icon5} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              <Link to="/refverconverter/">
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            <div className="textdiv" onClick={() => downloadFile(RefverconverterAttachment, `REFVERConverter_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative">
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">RefVer Converter (Liftover)</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="RefverDesc1"
                              defaultMessage="convert reference genome version "
                            />
                            <br />
                            <FormattedMessage
                              id="RefverDesc2"
                              defaultMessage=" of VCF file (hg19 ↔ hg38) "
                            />
                          </dd>
                        </dl>
                      </div>
                    </Link>
                  </li>

                  <li className='listitems'>
                    <Link to={route?.pathname}>
                      <div className="thumb">
                        <img src={icon5} alt="img" />
                        <div className="hvBox">
                          <div className="hvBox_links">
                            <div className="textdiv" >
                              <Link to="/dataframereconstruction/">
                                <span>
                                  <FormattedMessage id="RunAnalysis" defaultMessage="Run Analysis" />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>
                            {/* <div className="textdiv" onClick={() => downloadFile(RefverconverterAttachment, `REFVERConverter_Attachment.pdf`)}>
                              <Link to={route?.pathname}>
                                <span>
                                  <FormattedMessage
                                    id="DownloadManual"
                                    defaultMessage="Download Manual"
                                  />
                                </span>
                                <img src={arrow_icon} alt="arrow-icon" />
                              </Link>
                            </div>{' '} */}
                          </div>
                        </div>
                      </div>
                      <div className="txtBox txtBoxpadding tac Relative">
                        <dl className="MarginTop8">
                          <dt className="h4 Capitalize">DataFrame Reconstruction</dt>
                          <dd className="p1">
                            <FormattedMessage
                              id="DfDesc1"
                              defaultMessage="Convert matrix format files"
                            />
                            <br />
                            <FormattedMessage
                              id="DfDesc2"
                              defaultMessage="to melted format files"
                            />
                          </dd>
                        </dl>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </article >
    </div >
  );
};

export default HomeComponent;