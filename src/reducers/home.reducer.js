import { homeConstants } from '../actions/Constants';

const homeReducer = (state = {'home':'home'}, {type,payload}) => {
  switch (type) {
    case homeConstants.HOME_REQUEST:
      return {...state}
    case homeConstants.DATA_SUMMARY:
      return {
        ...state,
        dataSummary: payload
      }
    default:
      return state
  }
}
export default homeReducer;
