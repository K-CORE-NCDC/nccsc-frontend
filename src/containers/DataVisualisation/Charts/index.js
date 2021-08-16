import DataCircos from './Circos'
import DataOnco from './Onco'
import DataLolipop from './Lolipop'

function circos(width,inputData) {
  return <DataCircos key='circos' width={width} inputData={inputData} />
}

function onco(width,inputData) {
  return <DataOnco key='onco' width={width} inputData={inputData} />
}
function lolipop(width,inputData) {
  return <DataLolipop key='lolipop' width={width} inputData={inputData} />
}

export const Charts = {
  circos,
  onco,
  lolipop
}
