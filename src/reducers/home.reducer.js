import { homeConstants } from '../actions/Constants';

const homeReducer = (state = {'home':'home'}, {type,payload}) => {
  switch (type) {
    case homeConstants.HOME_REQUEST:
      return {...state}
    default:
      return state
  }
}
export default homeReducer;
