import React, { Suspense, lazy } from 'react';

function circos(width, inputData, screenCapture, setToFalseAfterScreenCapture, toggle, state) {
  let DataCircos = lazy(() => import('./Circos'));
  return (
    <Suspense>
      <DataCircos
        key="circos"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
        toggle={toggle}
        state={state}
      />
    </Suspense>
  );
}

function sankey(width, inputData, screenCapture, setToFalseAfterScreenCapture, toggle, state) {
  let SankeyPlot = lazy(() => import('./SankeyPlot'));
  return (
    <Suspense>
      <SankeyPlot
        key="sankey"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
        toggle={toggle}
        state={state}
      />
    </Suspense>
  );
}

function onco(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let DataOnco = lazy(() => import('./Onco'));
  return (
    <Suspense>
      <DataOnco
        key="onco"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>
  );
}

function lollipop(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let DataLolipop = lazy(() => import('./Lolipop'));
  return (
    <Suspense>
      <DataLolipop
        key="lolipop"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>
  );
}

function volcano(width, inputData, screenCapture, setToFalseAfterScreenCapture, VFData) {
  let DataVolcono = lazy(() => import('./Volcono'));
  return (
    <Suspense>
      <DataVolcono
        key="volcano"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
        VFData={VFData}
      />
    </Suspense>
  );
}

function heatmap(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let DataHeatmap = lazy(() => import('./Heatmap'));
  return (
    <Suspense>
      <DataHeatmap
        key="heatmap"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>
  );
}

function survival(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
  survialData,
) {
  let DataSurvival = lazy(() => import('./Survival'));
  return (
    <Suspense>
      <DataSurvival
        key="survival"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
        survialData={survialData}
      />
    </Suspense>
  );
}

function scatter(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let Scatter = lazy(() => import('./Scatter'));
  return (
    <Suspense>
      <Scatter
        key="scatter"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>
  );
}

function igv(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let DataIgv = lazy(() => import('./igv'));
  return (
    <Suspense>
      <DataIgv
        key="igv"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>
  );
}

function fusion(width, inputData, screenCapture, setToFalseAfterScreenCapture, VFData) {
  let FusionPlot = lazy(() => import('./Fusion'));
  return (
    <Suspense>
      <FusionPlot
        key="fusion"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
        VFData={VFData}
      />
    </Suspense>
  );
}

function box(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let Box = lazy(() => import('./Box'));
  return (
    <Suspense>
      <Box
        key="box"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>

  );
}
function variant_summary(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  let DataGenomic = lazy(() => import('./Genomic'));
  return (
    <Suspense>
      <DataGenomic
        key="genomic"
        width={width}
        inputData={inputData}
        screenCapture={screenCapture}
        setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      />
    </Suspense>

  );
}


const Charts = ({ type, w, state, screenCapture, setToFalseAfterScreenCapture, toggle, VFData, BrstKeys, survialData }) => {
  const fetchData = () => {
    switch (type) {
      case 'circos':
        return circos(w, state, screenCapture, setToFalseAfterScreenCapture, toggle, state);
      case 'OncoPrint':
        return onco(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'lollipop':
        return lollipop(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'volcano':
        return volcano(w, state, screenCapture, setToFalseAfterScreenCapture, VFData);
      case 'heatmap':
        return heatmap(w, state, screenCapture, BrstKeys, setToFalseAfterScreenCapture);
      case 'survival':
        return survival(w, state, screenCapture, setToFalseAfterScreenCapture,survialData);
      case 'correlation':
        return scatter(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'CNV':
        return igv(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'fusion':
        return fusion(w, state, screenCapture, setToFalseAfterScreenCapture, VFData);
      case 'box':
        return box(w, state, screenCapture, setToFalseAfterScreenCapture);
      case 'sankey':
        return sankey(w, state, screenCapture, setToFalseAfterScreenCapture, toggle, state);
      case 'variant-summary':
        return variant_summary(w, state, screenCapture, setToFalseAfterScreenCapture);
      default:
        return false;
    }
  }
  return (
    <>
      {fetchData()}
    </>
  )
}
export default Charts;


