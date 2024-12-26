import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import '../../styles/volcano.css';
import Table from './Table/ReactTable';
import VolcanoPlotD3 from './VolcanoD3';

Chart.register(...registerables, zoomPlugin);

const VolcanoCmp = React.forwardRef(
  ({ data, watermarkCss, negative_data, positive_data, tab_count, tableData,log2fc,pValue }) => {
    const intl = useIntl();
    const table_cols = [
      {
        Header: intl.formatMessage({ id: "GeneName", defaultMessage: 'Gene Name' }),
        accessor: (row) => row['Gene Name'],
      },
      {
        Header: 'LOG2FC',
        accessor: (row) => row['Log2FC'],
      },
      {
        Header: 'PVALUE',
        accessor: (row) => row['-Log(Pvalue)'],
      },
      {
        Header: 'FDR',
        accessor: (row) => row['FDR'],
      }
    ];

    const downloadTableAsCsv = (tableType) => {
      let rows = [['GENE NAME', 'LOG2FC', 'PVALUE','FDR']];

      if (tableType === 'negative') {
        rows = [['GENE NAME', 'LOG2FC (negative)', 'PVALUE','FDR']];
        tableData.forEach((element) => {
          if (element['log2(fold_change)'] <= -(log2fc) && element['p_value'] <= pValue) {
            rows.push([element['gene'], element['log2(fold_change)'], element['p_value'],element['fdr']]);
          }
        });
      } else if (tableType === 'positive') {
        rows = [['GENE NAME', 'LOG2FC (positive)', 'PVALUE','FDR']];
        tableData.forEach((element) => {
          if (element['log2(fold_change)'] >= log2fc && element['p_value'] <= pValue) {
            rows.push([element['gene'], element['log2(fold_change)'], element['p_value'],element['fdr']]);
          }
        });
      } else {
        tableData.forEach((element) => {
          rows.push([element['gene'], element['log2(fold_change)'], element['p_value'],element['fdr']]);
        });
      }

      // Create a CSV content string
      let csvContent = rows.map((row) => row.join(',')).join('\n');

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `RNA-expression-${tableType}.csv`);
      link.style.display = 'none';

      // Append the link to the body, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the URL to free up memory
      URL.revokeObjectURL(url);
    };

    return (
      <div className="BorderstyleViz">
        <div id="scatter_parent">
          <VolcanoPlotD3 watermarkCss={watermarkCss} dataProps={data} log2fc={log2fc} pValue={pValue} />
        </div>
        <div className="VolcanoCardText">
          <p className="TextBlue">
            <FormattedMessage id="Blue" defaultMessage="Blue :" />
            {`Log2FC ≤ -${log2fc} & pvalue ≤ ${pValue}`}
          </p>
          <p className="TextRed">
            <FormattedMessage id="Red" defaultMessage="Red :" />
            {`Log2FC ≥ ${log2fc} & pvalue ≤ ${pValue}`}
          </p>
          <p className="TextGrey">
            <FormattedMessage id="Grey" defaultMessage="Grey :" /> Not significant gene
          </p>
          <p className="TextBlack">
            <FormattedMessage id="Black" defaultMessage="Black :" /> Selected genes
          </p>
        </div>
        <div className="M4 PopoverStyles" style={{ justifyContent: 'center' }}>
          <div>
            <h2 className="text-left text-blue-800 mb-12 mt-12">
              <strong>{'Expression Down Level'}</strong>
            </h2>
            <div>
              <Table
                columns={table_cols}
                data={negative_data}
                summary={'negative_volcano_table'}
              />
              <div className="VolcanoContainer">
                <h2 className="VolcanoText">
                  Total entries: <strong>{tab_count['negative']}</strong>
                </h2>
                <button onClick={() => downloadTableAsCsv('negative')} className="VolcanoButton">
                  <svg
                    className="VolcanoIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span className="VolcanoDownloadText">Download</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-left text-blue-800 mb-12 mt-12">
              <strong>{'Expression Up Level'}</strong>
            </h2>
            <Table
              columns={table_cols}
              data={positive_data}
              summary={'positive_volcano_table'}
            />
            <div className="VolcanoContainer">
              <h2 className="VolcanoText">
                Total entries: <strong>{tab_count['positive']}</strong>
              </h2>
              <button onClick={() => downloadTableAsCsv('positive')} className="VolcanoButton">
                <svg className="VolcanoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                </svg>
                <span className="VolcanoDownloadText">Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className="VolcanoContainer" style={{ margin: '20px 0px' }}>
          <h2 className="VolcanoText">
            <strong>Download Entire Data</strong>
          </h2>
          <button onClick={() => downloadTableAsCsv('')} className="VolcanoButton">
            <svg className="VolcanoIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span className="VolcanoDownloadText">Download</span>
          </button>
        </div>
      </div>
    );
  }
);

export default VolcanoCmp;
