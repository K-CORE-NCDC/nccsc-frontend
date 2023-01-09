import { dataVisualization, userdataVisualization, CLEAR_ALL_STATES } from '../actions/Constants';

const dataVisualizationReducer = (state = {'data':'data'}, {type,payload}) => {
  switch (type) {

    case dataVisualization.CIRCOS_REQUEST:
      return {
        ...state,
        circosSummary: payload
      }
    case dataVisualization.CLEAR_CIRCOS_INFORMATION:
        const {circosSummary, ...restt}=state 
        state= restt
        return  state
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
    case dataVisualization.USER_DEFINED_VOLCANO_REQUEST:
      return {
        ...state,
        userDefinedVolcanoSummary: payload
      }
    case dataVisualization.HEATMAP_REQUEST:
      return {
        ...state,
        heatmapSummary: payload
      }
    case dataVisualization.HEATMAP_REQUEST_STATUS_CODE:
      return {
        ...state,
        heatmapSummaryStatusCode: payload
      }
    case dataVisualization.SURVIVAL_REQUEST:
      return {
        ...state,
        survivalSummary: payload
      }

    case dataVisualization.CLEAR_SURVIVAL_IMAGE:
        return  {
          ...state,
          survivalSummary:''
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
    case dataVisualization.CHECK_GENE_FUSION_REQUEST:
      return {
        ...state,
        fusionGenes : payload
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
    
    case dataVisualization.PASS_ENCODE_ID:
      return {
        ...state,
        passKey:payload
      }
    case dataVisualization.CHECK_USER:
      return {
        ...state,
        checkUserName: payload
      }
    case dataVisualization.REGISTER_REQUEST:
      return {
        ...state,
        registerData: payload
      }
    case dataVisualization.KMEAN_REQUEST:
      return {
        ...state,
        kmeanSummary: payload
      }
    case dataVisualization.CLINICALMAXMIN_REQUEST:
      return {
        ...state,
        clinicalMaxMinInfo: payload
      }
    case dataVisualization.RNI_DATA:
      return {
        ...state,
        rniData: payload
      }
    case dataVisualization.FUSIONVENN_REQUEST:
      return {
        ...state,
        VennData: payload
      }
    case dataVisualization.FUSIONVENN_CLEAR:
      const {VennData, ...remaining}=state 
      state= remaining
      return  state
    case dataVisualization.FUSION_EXON_REQUEST:
      return {
        ...state,
        ExonData: payload
      }
    case dataVisualization.FUSIONVENN_RNID:
      return {
        ...state,
        VennRnid:payload
      }
    case dataVisualization.SANKEYJSON_REQUEST:
      return {
        ...state,
        SankeyJson:payload
      }
    case dataVisualization.FUSIONTABLE_REQUEST:
      return {
        ...state,
        FusionTable:payload
      }
    case CLEAR_ALL_STATES:
      return {
        
      }
    case userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT:
      return {
        ...state, 
        userDataProjectTable: payload
      }
    case userdataVisualization.USER_DEFINED_FILTER:
      return {
        ...state, 
        userDefinedFilter: payload
      }
      case dataVisualization.SAMPLES_COUNT:
      return {
        ...state, 
        samplesCount: payload
      }
    case dataVisualization.UPDATE_DOWNLOAD_VISUALIZATION_PURPOSE:
      return {
        ...state, 
        UpdateDownloadVisualizationPurpose: payload
      }
      
    case dataVisualization.PDF_REPORT:
      return {
        ...state, 
        PDF_Report: payload
      }

      case dataVisualization.CLEAR_PDF_LINK:
        const {PDF_Report, ...rest}=state 
        state= rest
        return  state
        
    default:
      return state
  }
}
export default dataVisualizationReducer;
