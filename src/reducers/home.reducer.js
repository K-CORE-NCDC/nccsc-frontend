import { homeConstants } from '../actions/Constants';

const homeReducer = (state = { home: 'home' }, { type, payload } ) => {
  switch (type) {
    case homeConstants.HOME_REQUEST:
      return { ...state };
    case homeConstants.DATA_COUNT:
      return {
        ...state,
        dataCount: payload,
      };
    case homeConstants.DATA_SUMMARY:
      return {
        ...state,
        dataSummary: payload,
      };
    case homeConstants.GENOMIC_INFORMATION:
      return {
        ...state,
        genomicData: payload,
      };
    case homeConstants.USERDATA_VISUALIZATION:
      return {
        ...state,
        fileUploadData: payload,
      };
    case homeConstants.NEWUSERDATA_VISUALIZATION:
      return {
        ...state,
        newFileUploadData: payload,
      };
    case homeConstants.UPLOAD_CLININCAL_COLUMNS:
      return {
        ...state,
        uploadClinicalColumns: payload,
      };

    case homeConstants.CLEARNEWUSERDATA_VISUALIZATION:
    {
      const { newFileUploadData, ...remaining } = state;
      /* eslint-disable no-param-reassign */
      state = remaining;
      return state;
      // ...state,
      // newFileUploadData: payload
    }
    case homeConstants.CLEAR_UPLOAD_CLININCAL_COLUMNS:
    {
      const { uploadClinicalColumns, ...remaininClinicalColumns } = state;
      /* eslint-disable no-param-reassign */
      state = remaininClinicalColumns;
      return state;
    }

    case homeConstants.NEWUSERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        newFileUploadStatus: { ...state.fileUploadStatus, ...payload },
      };
    case homeConstants.USERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        fileUploadStatus: { ...state.fileUploadStatus, ...payload },
      };
    case homeConstants.APPLICATION_LANGUAGE:
      return {
        ...state,
        languageReducer: payload,
      };
    case homeConstants.DATA_FAQ:
      return {
        ...state,
        dataFaq: payload,
      };
    case homeConstants.DATA_NOTICE:
      return {
        ...state,
        dataNotice: payload,
      };
    case homeConstants.DATA_QA:
      return {
        ...state,
        dataQA: payload,
      };
    case homeConstants.NOTICE_DETAILS:
      return {
        ...state,
        noticedata: payload,
      };
    case homeConstants.OTP_REQUEST:
      return {
        ...state,
        emailsentstatus: payload,
      };
    case homeConstants.OTP_VALIDATION:
      return {
        ...state,
        otp_validation_status: payload,
      };
    case homeConstants.FIND_ID:
      return {
        ...state,
        findID: payload,
      };
    case homeConstants.FIND_PASSWORD:
      return {
        ...state,
        findPassword: payload,
      };
    case homeConstants.REGISTRATION:
      return {
        ...state,
        registration_status: payload,
      };
    case homeConstants.CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordStatus: payload,
      };
    case homeConstants.REQUEST_DONE:
      return {
        ...state,
      };
    case homeConstants.CHECK_EMAIL:
      return {
        ...state,
        is_email_exist: payload,
      };
    case homeConstants.VERIFY_ENCODE:
      return {
        ...state,
        verifyMobile: payload,
      };
    case homeConstants.INTERPRO:
      return {
        ...state,
        interpro: payload,
      };
    case homeConstants.VCFMAF:
      return {
        ...state,
        vcfmaf: payload,
      };

    case homeConstants.LOGMANAGEMENT:
      return {
        ...state,
        logmanagement: [...payload],
      };
    case homeConstants.CHECK_MOBILE:
      return {
        ...state,
        mobileVerified: payload,
      };
    case homeConstants.SENDLOGMANAGEMENT:
      return {
        ...state,
        sendlogmanagement: payload,
      };
    case homeConstants.LOGIN_DATA:
      return {
        ...state,
        login_data: payload,
      };
      case homeConstants.CLEAR_LOGIN_DATA:
        {
          const {
            login_data, ...withoutlogindata
          } = state;
          /* eslint-disable no-param-reassign */
          state = withoutlogindata;
          return state;
        }
    case homeConstants.CLEAR_NOTICE_DETAILS:
    {
      const { noticedata, ...remains } = state;
      /* eslint-disable no-param-reassign */
      state = remains;
      return state;
    }
    case homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD:
    {
      const {
        findId, findPassword, changePasswordStatus, ...rest
      } = state;
      /* eslint-disable no-param-reassign */
      state = rest;
      return state;
    }

    default:
      return state;
  }
};
export default homeReducer;
