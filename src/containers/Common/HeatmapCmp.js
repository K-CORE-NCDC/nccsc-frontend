import React, { useState, useEffect } from 'react';
import CanvasXpressReact from 'canvasxpress-react';

const HeatmapCmp = React.forwardRef(
  ({ settings, inputData, type, watermarkCss, width, clinicalFilter,kmeanType }, ref) => {
    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [configVis, setConfigVis] = useState({});
    let target = 'canvas';


    let config = {
      colorSpectrum: settings['colorSpectrum'],
      graphType: 'Heatmap',
      graphOrientation: "horizontal",
      heatmapCellBoxColor: 'rgb(255,255,255)',
      overlayScaleFontFactor: 2,
      samplesClustered: true,
      showTransition: false,

      // Causing issue when there is only sample
      // variablesClustered: true,

      showVarOverlaysLegend: true,
      events: false,
      info: false,
      draw: true,
      afterRenderInit: true,
      lazyLoad: true,
      afterRender: [['setDimensions', [613, 613, true]]],
      noValidate: true,
      disableConfigurator: false,
      disableToolbar: true
    };
    // console.log(settings)
    if (!isNaN(settings['colorSpectrumBreaks'][0]) && !isNaN(settings['colorSpectrumBreaks'][1])) {
      config['colorSpectrumBreaks'] = settings['colorSpectrumBreaks'];
    }
    if (clinicalFilter.length > 0) {
      config['varOverlayProperties'] = {};
      config['varOverlays'] = [];
      for (let i = 0; i < clinicalFilter.length; i++) {
        config['varOverlayProperties'][clinicalFilter[i].name] = {
          position: 'top',
          type: 'Default',
          color: 'rgb(254,41,108)',
          spectrum: [
            'rgb(255,0,255)',
            'rgb(0,0,255)',
            'rgb(0,0,0)',
            'rgb(255,0,0)',
            'rgb(255,215,0)'
          ],
          scheme: 'GGPlot',
          showLegend: true,
          showName: true,
          showBox: true,
          rotate: false
        };
        config['varOverlays'].push(clinicalFilter[i].name);
      }
      // config['variablesClustered'] = true;
    }

    if (type === 'k-mean' && kmeanType=='gene' ) {
      config['smpOverlayProperties'] = {
        Treatment: {
          position: 'right',
          type: 'Default',
          color: 'rgb(254,41,108)',
          spectrum: [
            'rgb(255,0,255)',
            'rgb(0,0,255)',
            'rgb(0,0,0)',
            'rgb(255,0,0)',
            'rgb(255,215,0)'
          ],
          scheme: 'User',
          showLegend: true,
          showName: true,
          showBox: true,
          rotate: false
        },
        Cluster: {
          position: 'left',
          type: 'Default',
          color: 'rgb(72,126,182)',
          spectrum: [
            'rgb(244,67,54)',
            'rgb(225,101,25)',
            'rgb(202,206,23)',
            'rgb(4,115,49)',
            'rgb(98,183,247)'
          ],
          scheme: 'User',
          showLegend: true,
          showName: true,
          showBox: true,
          rotate: false
        },
        Dose: {
          thickness: 50,
          type: 'Dotplot',
          position: 'right',
          color: 'rgb(167,206,49)',
          spectrum: [
            'rgb(255,0,255)',
            'rgb(0,0,255)',
            'rgb(0,0,0)',
            'rgb(255,0,0)',
            'rgb(255,215,0)'
          ],
          scheme: 'User',
          showLegend: true,
          showName: true,
          showBox: true,
          rotate: false
        }
      };
      config['smpOverlays'] = ['Cluster', 'Treatment', 'Dose'];
      config['samplesClustered'] = false;
      config['variablesClustered'] = false;


      config['sortData'] = [['cat', 'smp', 'Cluster']];
      config['sortDir'] = 'ascending';

    }
    if (type === 'k-mean' && kmeanType==='sample' ) {
      config['varOverlayProperties']['Cluster']={
          position: 'top',
          type: 'Default',
          color: 'rgb(72,126,182)',
          spectrum: [
            'rgb(244,67,54)',
            'rgb(225,101,25)',
            'rgb(202,206,23)',
            'rgb(4,115,49)',
            'rgb(98,183,247)'
          ],
          scheme: 'GGPlot',
          showLegend: false,
          showName: true,
          showBox: false,
          rotate: false
      }

      config['varOverlays'].push('Cluster');
      config['samplesClustered'] = true;
      config['variablesClustered'] = false;

    }

    // console.log(config,'=====160')
    useEffect(() => {
      setConfigVis(config);
    }, [settings?.colorSpectrum]);

    useEffect(() => {
      if (Object.keys(inputData).length > 0) {
        setData(inputData);
        setConfigVis(config);
      }
      console.log(inputData)
    }, [inputData]);

    useEffect(() => {
      console.log(data)
      if (Object.keys(data).length > 0) {
        setDataLoaded(true);
      }
    }, [data]);


    return (
      <div ref={ref} className={`heatmap ${watermarkCss}`}>
        <div className="">
          <div className=""></div>
        </div>

        {dataLoaded && configVis && (
          <CanvasXpressReact
            target={target}
            data={data}
            config={configVis}
            // config={c}
            width={width}
            height={'700px'}
            style={{ color: 'red' }}
          />
        )}
      </div>
    );
  }
);
export default HeatmapCmp;
