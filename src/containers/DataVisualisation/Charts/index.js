import DataCircos from "./Circos";
import DataOnco from "./Onco";
import DataLolipop from "./Lolipop";
import DataVolcono from "./Volcono";
import DataHeatmap from "./Heatmap";
import DataSurvival from "./Survival";
import Scatter from "./Scatter";
import DataIgv from "./igv";
import FusionPlot from "./Fusion";
import Box from "./Box";
import Sankey from "./Sankey";
import SankeyIndex from "./SankeyIndex";

function circos(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
  toggle,
  state
) {
  return (
    <DataCircos
      key="circos"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
      toggle={toggle}
      state={state}
    />
  );
}

function onco(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return (
    <DataOnco
      key="onco"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function lollipop(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
) {
  return (
    <DataLolipop
      key="lolipop"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function volcano(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
) {
  return (
    <DataVolcono
      key="volcano"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function heatmap(
  width,
  inputData,
  screenCapture,
  BrstKeys,
  setToFalseAfterScreenCapture
) {
  return (
    <DataHeatmap
      key="heatmap"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      brstKeys={BrstKeys}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function survival(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
) {
  return (
    <DataSurvival
      key="survival"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function scatter(
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture
) {
  return (
    <Scatter
      key="scatter"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function igv(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return (
    <DataIgv
      key="igv"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function fusion(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return (
    <FusionPlot
      key="fusion"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}

function box(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return (
    <Box
      key="box"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
  );
}
function sankey(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return (
    <SankeyIndex
      key="sankey"
      width={width}
      inputData={inputData}
      screenCapture={screenCapture}
      setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    />
    // <Sankey
    //   key="sankey"
    //   width={width}
    //   inputData={inputData}
    //   screenCapture={screenCapture}
    //   setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
    // />
  );
}

export const Charts = {
  circos,
  onco,
  lollipop,
  volcano,
  heatmap,
  survival,
  scatter,
  igv,
  fusion,
  box,
  sankey,
};
