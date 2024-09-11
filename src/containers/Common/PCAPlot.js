import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

Chart.register(...registerables);
var myChart;
const PcaPlot = React.forwardRef(({ pca_data, watermarkCss }, ref) => {
  const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
  const pca_plot = useRef(null);
  let option = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return (
              BrstKeys[tooltipItem['raw']['sample']] +
              ': (' +
              tooltipItem.raw.x +
              ', ' +
              tooltipItem.raw.y +
              ')'
            );
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'PCA Component 1'
        }
      },
      y: {
        title: {
          display: true,
          text: 'PCA Component 2'
        }
      }
    },
    responsive: true
  };

  const drawChart = (data_) => {
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(pca_plot.current, {
      type: 'scatter',
      data: data_,
      options: option
    });
  };

  useEffect(() => {
    if (pca_data) {
      drawChart(pca_data);
    }
  }, [pca_data]);

  return (
    <div
      ref={ref}
      id="pca_parent"
      className={`p-5 lg:w-full sm:w-5/6 ${watermarkCss}`}
      style={{ marginTop: '5%' }}
    >
      <canvas id="pca" ref={pca_plot} height="14vh" width="40vw"></canvas>
    </div>
  );
});
export default PcaPlot;
