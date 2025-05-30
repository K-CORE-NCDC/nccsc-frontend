import React from 'react';
import { FormattedMessage } from 'react-intl';
import OtherToolsManual from '../../assets/files/DownloadbleFiles/OtherTools/OtherTools_Manual.pdf';
export const OtherTools = () => {
  return (
    <div className="tabContents " style={{ height: '85vh' }}>
      <div className="dataSearchWrap">
        <div className="popularBox">
          <div className="subHeader">
            <p className="tit h5">Contents</p>
            <div className="tit contentBtns">
              <button className="btn" id="DownloadManual">
                <a href={OtherToolsManual} download>
                  <FormattedMessage id="DownloadManual" defaultMessage="Download Manual" />
                </a>
              </button>
            </div>
            <div className="tit contentBtns_smallScreen">
              <button className="btn" id="DownloadManual">
                <a href={OtherToolsManual} download>
                  <span className="material-icons">
                    download
                  </span>
                </a>
              </button>
            </div>
          </div>

          <div className="contentBox">
            <ul className="contentBox_left" style={{ width: '100%' }}>
              <li className="" tabIndex="0">
                <p>
                  {' '}
                  <b>VCF to MAF: </b> &nbsp;
                  <FormattedMessage
                    id="Example_tools_vcftomaf"
                    defaultMessage="automatically convert VCF to MAF files (VCF file needed)"
                  />
                </p>
              </li>
              <li tabIndex="-1">
                <p>
                  {' '}
                  <b>Interpro :</b> &nbsp;
                  <FormattedMessage
                    id="Example_tools_interPro"
                    defaultMessage="represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  <b>BLAST :</b> &nbsp;
                  <FormattedMessage
                    id="Example_tools_blast"
                    defaultMessage=" compare primary biological sequence information by using protein amino acid sequence or DNA/RNA sequence information (DNA, RNA, Protein sequence or FASTA file needed)"
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  <b>MAF merger :</b> &nbsp;
                  <FormattedMessage
                    id="MAFMergerDesc1"
                    defaultMessage="Analysis tool to merge into 1 file"
                  />
                  <FormattedMessage
                    id="MAFMergerDesc2"
                    defaultMessage="by entering multiple MAF files "
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  <b>RefVer converter (Liftover) :</b> &nbsp;
                  <FormattedMessage
                    id="RefverDescFull"
                    defaultMessage="Convert reference genome version of VCF file (hg19 ↔ hg38) "
                  />
                </p>
              </li>
              <li className="" tabIndex="-1">
                <p>
                  <b>Dataframe Converter:</b> &nbsp;
                  <FormattedMessage
                    id="DataframeDescFull"
                    defaultMessage="A tool that converts matrix type expression files into melted format"
                  />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
