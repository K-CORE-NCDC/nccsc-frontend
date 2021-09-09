import DataCircos from './Circos'
import DataOnco from './Onco'
import DataLolipop from './Lolipop'
import DataVolcono from './Volcono'
import DataHeatmap from './Heatmap'
import DataSurvival from './Survival'
import DataIgv from './igv'

function circos(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataCircos
    key='circos'
    width={width}
    inputData={inputData}
    screenCapture={screenCapture}
    setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function onco(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataOnco
  key='onco'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function lollipop(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataLolipop
  key='lolipop'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function volcano(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataVolcono
  key='volcano'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function heatmap(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataHeatmap
  key='heatmap'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function survival(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataSurvival
  key='survival'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

function igv(width, inputData, screenCapture, setToFalseAfterScreenCapture) {
  return <DataIgv
  key='igv'
  width={width}
  inputData={inputData}
  screenCapture={screenCapture}
  setToFalseAfterScreenCapture={setToFalseAfterScreenCapture}
  />
}

export const Charts = {
  circos,
  onco,
  lollipop,
  volcano,
  heatmap,
  survival,
  igv
}
