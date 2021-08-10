import { dataVisualization } from '../actions/Constants';

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
    case dataVisualization.REQUEST_DONE:
      return{
        ...state
      }
    default:
      return state
  }
}
export default dataVisualizationReducer;
