import React from "react";
import bgimg from '../../assets/images/bg.png';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FormattedMessage } from "react-intl";

const MultiDataVisualization = () => {
  const history = useHistory()
  return (
    <div className="tabContents " style={{ height: '85vh' }}>
      <div className="dataSearchWrap">
        <div className="popularBox">
          <div className="subHeader">
            <p className="tit h5">Contents</p>
            <div className="tit contentBtns">
              <button className="btn" onClick={() => {
                history.push('/visualise-multidata/home')
              }}>
                <FormattedMessage id="ExamplePage" defaultMessage='Example Page' />
              </button>
              <button className="btn">
                <FormattedMessage id="DownloadManual" defaultMessage='Download Manual' />

              </button>
            </div>
          </div>

          <div className="contentBox">
            <ul className="contentBox_left" >
              <li className="" tabIndex="0" >
                <p> <b>Circos Plot : </b> &nbsp;
                  <FormattedMessage id="Example_multi_circos" defaultMessage='visualize seven omics data as a circular layer on a circular chromosome map' />
                </p>
              </li>
              <li tabIndex="-1" >
                <p> <b>Heatmap  :</b> &nbsp;
                  <FormattedMessage id="Example_mutli_heatmap" defaultMessage='represent genomic/proteomic data in the form of a map or diagram in which data values are represented as colors(heats)' />
                </p>
              </li>
              <li className="" tabIndex="-1" >
                <p><b>Correlation :</b>  &nbsp;
                  <FormattedMessage id="Example_multi_correlation" defaultMessage=' visualize the correlation between RNA expression values and proteome abundance values for a selected gene' />
                </p>
              </li>
              <li className="" tabIndex="-1" >
                <p> <b>Oncoprint  :</b> &nbsp;
                  <FormattedMessage id="Example_multi_onco" defaultMessage="visualize DNA mutations and various omics information of each patient's gene with columns, colors, symbols, etc." />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p><b>Box Plot (Tumor vs Normal):</b> &nbsp;
                  <FormattedMessage id="Example_signle_box" defaultMessage='visualize the genetic information statistics of the selected gene(s) in the form of boxes' />
                </p>
              </li>
              {/* <li tabIndex="-1" >
                <p> <b>Lollipop Plot :</b> &nbsp;
                  <FormattedMessage id="Example_signle_Lollipop" defaultMessage=' visualize mutation or phosphorylation of certain gene on a sequence' />
                </p>
              </li> */}
            </ul>
            <ul className="contentBox_right">
              <li className="" tabIndex="-1" style={{}}>
                <p> <b>Survival Plot :</b> &nbsp;
                  <FormattedMessage id="Example_multi_survival" defaultMessage='visualize the recurrence/survival probability of patients according to clinical variable or genetic conditions' />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p><b> Volcano Plot:</b> &nbsp;
                  <FormattedMessage id="Example_multi_valcano" defaultMessage='visualize genes (DEGs) showing significant expression differences between the two groups divided according to clinical conditions' />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p> <b>Fusion Plot :</b> &nbsp;
                  <FormattedMessage id="Example_multi_fusion" defaultMessage='visualize the number of fusion gene(s) and individual fusion gene for the selected sample group' />
                </p>
              </li>
              <li className="" tabIndex="-1" style={{}}>
                <p> <b>Sankey Plot  :</b> &nbsp;
                  <FormattedMessage id="Example_multi_sankey" defaultMessage=' visualize drug relation information of the selected mutations' />
                </p>
              </li>
              <li className="" tabIndex="-1" >
                <p><b>CNV Plot :</b>  &nbsp;
                  <FormattedMessage id="Example_signle_CNV" defaultMessage='visualize copy number variation data on integrated genome viewer' />
                </p>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <table className="contentsTable" style={{ marginTop: '15px' }}>
        <thead>
          <tr>
            <th>Data Type</th>
            <th style={{ width: '160px' }}>Circos Plot</th>
            <th>Heatmap</th>
            <th>Correlation</th>
            <th>Oncoprint</th>
            <th>Survival Plot</th>
            <th>Volcano Plot</th>
            <th>Fusion Plot</th>
            <th>CNV</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td style={{ fontSize: '14px' }}>Clinical Information</td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span> </td>
            <td><span className="material-icons">radio_button_unchecked</span> </td>
          </tr>
          <tr>
            <td>Dna Mutation</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>RNA</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Proteome</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>CNV</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
          </tr>
          <tr>
            <td>Methylation</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Phosphorylation</td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Fusion</td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><span className="material-icons">radio_button_unchecked</span></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

  )

}
export default MultiDataVisualization;