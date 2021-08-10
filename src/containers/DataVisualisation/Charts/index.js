import DataCircos from './Circos'

function circos(width,inputData) {
  return <DataCircos key='circos' width={width} inputData={inputData} />
}

export const Charts = {
  circos
}
