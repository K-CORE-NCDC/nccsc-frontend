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
    case homeConstants.NEWUSERDATA_VISUALIZATION:
      console.log("from iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      return {
        ...state,
        newFileUploadData: payload
      }

    case homeConstants.CLEARNEWUSERDATA_VISUALIZATION:
      console.log("from --------------------------------------------");
      return {
        ...state,
        newFileUploadData: payload
      }
    case homeConstants.UPLOAD_CLININCAL_COLUMNS:
      return {
        ...state,
        uploadClinicalColumns: payload
      }
    case homeConstants.NEWUSERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        newFileUploadStatus: { ...state.fileUploadStatus, ...payload }
      }
    case homeConstants.USERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        fileUploadStatus: { ...state.fileUploadStatus, ...payload }
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
    case homeConstants.NOTICE_DETAILS:
      return {
        ...state,
        noticedata: payload
      }
    case homeConstants.OTP_REQUEST:
      return {
        ...state,
        emailsentstatus: payload
      }
    case homeConstants.OTP_VALIDATION:
      return {
        ...state,
        otp_validation_status: payload
      }
    case homeConstants.FIND_ID:
      return {
        ...state,
        find_id: payload
      }
    case homeConstants.FIND_PASSWORD:
      return {
        ...state,
        find_password: payload
      }
    case homeConstants.REGISTRATION:
      return {
        ...state,
        registration_status: payload
      }
      case homeConstants.CHANGE_PASSWORD:
        return {
          ...state,
          change_password_status:payload
        }
      case homeConstants.REQUEST_DONE:
        return{
          ...state
        }
      case homeConstants.CHECK_EMAIL:
        return{
          ...state,
          is_email_exist:payload
        }
    case homeConstants.VERIFY_ENCODE:
      return {
        ...state,
        verifyMobile:payload
      }
    case homeConstants.INTERPRO:
      return {
        ...state,
        interpro:payload
      }
    case homeConstants.VCFMAF:
      return {
        ...state,
        vcfmaf:payload
      }

    case homeConstants.LOGMANAGEMENT:
      return {
        ...state,
        logmanagement:[ ...payload]
      }

    case homeConstants.SENDLOGMANAGEMENT:
      return {
        ...state,
        sendlogmanagement:payload
      }

    case homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD:
      const {find_id,find_password,change_password_status, ...rest}=state 
      state= rest
      return  state
      

    default:
      return state
  }
}
export default homeReducer;
