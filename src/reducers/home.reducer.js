import { homeConstants } from '../actions/Constants';

const homeReducer = (state = { 'home': 'home' }, { type, payload }) => {
  switch (type) {
    case homeConstants.HOME_REQUEST:
      return { ...state }
    case homeConstants.DATA_COUNT:
      return {
        ...state,
        dataCount: payload
      }
    case homeConstants.DATA_SUMMARY:
      return {
        ...state,
        dataSummary: payload
      }
    case homeConstants.GENOMIC_INFORMATION:
      return {
        ...state,
        genomicData: payload
      }
    case homeConstants.USERDATA_VISUALIZATION:
      return {
        ...state,
        fileUploadData: payload
      }
    case homeConstants.USERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        fileUploadStatus: {...state.fileUploadStatus, ...payload}
      }
    case homeConstants.APPLICATION_LANGUAGE:
      return {
        ...state,
        languageReducer: payload
      }
    case homeConstants.DATA_FAQ:
      return {
        ...state,
        dataFaq: payload
      }
    case homeConstants.DATA_NOTICE:
      return {
        ...state,
        dataNotice: payload
      }
    case homeConstants.DATA_QA:
      return {
        ...state,
        dataQA: payload
      }
    case homeConstants.VERIFY_ENCODE:
      return {
        ...state,
        verifyMobile:payload
      }

    default:
      return state
  }
}
export default homeReducer;
