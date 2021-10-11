import { dataVisualization, userdataVisualization } from '../actions/Constants';

const dataVisualizationReducer = (state = {'data':'data'}, {type,payload}) => {
  switch (type) {

    case dataVisualization.CIRCOS_REQUEST:
      return {
        ...state,
        circosSummary: payload
      }
    case dataVisualization.ONCO_REQUEST:
      return {
        ...state,
        oncoSummary: payload
      }
    case dataVisualization.KEYS_REQUEST:
      return {
        ...state,
        Keys: payload
      }
    case dataVisualization.LOLLIPOP_REQUEST:
      return {
        ...state,
        lollipopSummary:payload
      }
    case dataVisualization.REQUEST_DONE:
      return{
        ...state
      }
    case dataVisualization.VOLCANO_REQUEST:
      return {
        ...state,
        volcanoSummary: payload
      }
    case dataVisualization.HEATMAP_REQUEST:
      return {
        ...state,
        heatmapSummary: payload
      }
    case dataVisualization.SURVIVAL_REQUEST:
      return {
        ...state,
        survivalSummary: payload
      }
      case dataVisualization.IGV_REQUEST:
        return {
          ...state,
          igvSummary: payload
        }
    case userdataVisualization.USER_DATA_PROJECT_TABLE:
      return {
        ...state,
        userProjectsDataTable: payload
      }
    case dataVisualization.CIRCOS_SAMPLES_RNID:
      return {
        ...state,
        circosSanpleRnidListData : payload
      }
    case dataVisualization.SCATTER_REQUEST:
      return {
        ...state,
        scatterData : payload
      }

    case dataVisualization.FUSION_REQUEST:
      return {
        ...state,
        fusionData : payload
      }
    case dataVisualization.BOX_REQUEST:
      return {
        ...state,
       boxData : payload
      }
    case dataVisualization.ONCO_IMAGES_INFORMATION:
      return {
        ...state,
        oncoSampleImagesData: payload
      }
    case dataVisualization.CIRCOS_TIMELINE_GRAPH:
      return {
        ...state,
        circosTimelieTableData: payload
      }
    case dataVisualization.REGISTER_REQUEST:
      return {
        ...state,
        registerData: payload
      }
    default:
      return state
  }
}
export default dataVisualizationReducer;
