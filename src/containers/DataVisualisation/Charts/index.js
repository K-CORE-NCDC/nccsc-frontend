import DataCircos from './Circos'
import DataOnco from './Onco'
import DataLolipop from './Lolipop'
import DataVolcono from './Volcono'
import DataHeatmap from './Heatmap'

function circos(width,inputData, filter_) {
  return <DataCircos key='circos' width={width} inputData={inputData} />
}

function onco(width,inputData, filter_) {
  return <DataOnco key='onco' width={width} inputData={inputData} />
}

function lolipop(width,inputData, filter_) {
  return <DataLolipop key='lolipop' width={width} inputData={inputData} />
}

function volcano(width,inputData, filter_) {
  return <DataVolcono key='volcano' width={width} inputData={inputData} filter={filter_}/>
}
function heatmap(width,inputData, filter_) {
  console.log("filter_--->",filter_)  
  return <DataHeatmap key='volcano' width={width} inputData={inputData} filter={filter_}/>
}

export const Charts = {
  circos,
  onco,
  lolipop,
  volcano,
  heatmap
}
