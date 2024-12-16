import { homeConstants } from '../actions/Constants';

const homeReducer = (state = { home: 'home' }, { type, payload }) => {
  switch (type) {
    case homeConstants.HOME_REQUEST:
      return { ...state };
    case homeConstants.DATA_COUNT:
      return {
        ...state,
        dataCount: payload
      };
    case homeConstants.DATA_SUMMARY:
      return {
        ...state,
        dataSummary: payload
      };
    case homeConstants.GENOMIC_INFORMATION:
      return {
        ...state,
        genomicData: payload
      };
    case homeConstants.USERDATA_VISUALIZATION:
      return {
        ...state,
        fileUploadData: payload
      };

    case homeConstants.NEWUSERDATA_VISUALIZATION:
      return {
        ...state,
        newFileUploadData: payload
      };

    case homeConstants.SINGLE_USERDATA_VISUALIZATION:
      return {
        ...state,
        singleFileUploadData: payload
      };

    case homeConstants.MULTI_USERDATA_VISUALIZATION:
      return {
        ...state,
        multiFileUploadData: payload
      };
    case homeConstants.CHECK_PROJECT_STATUS:
      return {
        ...state,
        checkProject: payload
      };

    case homeConstants.UPLOAD_CLININCAL_COLUMNS:
      return {
        ...state,
        uploadClinicalColumns: payload
      };

    case homeConstants.CLEAR_MULTI_USER_DATA_VISUALIZATION: {
      const { ...remainingmulti } = state;
      /* eslint-disable no-param-reassign */
      state = remainingmulti;
      return state;
    }

    case homeConstants.CLEAR_SINGLE_USER_DATA_VISUALIZATION: {
      const { ...remainingsingle } = state;
      /* eslint-disable no-param-reassign */
      state = remainingsingle;
      return state;
    }

    case homeConstants.CLEARNEWUSERDATA_VISUALIZATION: {
      const { ...remaining } = state;
      /* eslint-disable no-param-reassign */
      state = remaining;
      return state;
      // ...state,
      // newFileUploadData: payload
    }
    case homeConstants.CLEAR_UPLOAD_CLININCAL_COLUMNS: {
      const { ...remaininClinicalColumns } = state;
      /* eslint-disable no-param-reassign */
      state = remaininClinicalColumns;
      return state;
    }

    case homeConstants.NEWUSERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        newFileUploadStatus: { ...state.fileUploadStatus, ...payload }
      };
    case homeConstants.USERDATA_VISUALIZATION_ERROR:
      return {
        ...state,
        fileUploadStatus: { ...state.fileUploadStatus, ...payload }
      };
    case homeConstants.APPLICATION_LANGUAGE:
      return {
        ...state,
        languageReducer: payload
      };
    case homeConstants.DATA_FAQ:
      return {
        ...state,
        dataFaq: payload
      };
    case homeConstants.DATA_NOTICE:
      return {
        ...state,
        dataNotice: payload
      };
    case homeConstants.DATA_PROJECTS:
      return {
        ...state,
        dataProjects: payload
      };
    case homeConstants.DATA_QA:
      return {
        ...state,
        dataQA: payload
      };
    case homeConstants.NOTICE_DETAILS:
      return {
        ...state,
        noticedata: payload
      };
    case homeConstants.OTP_REQUEST:
      return {
        ...state,
        emailsentstatus: payload
      };
    case homeConstants.OTP_VALIDATION:
      return {
        ...state,
        otp_validation_status: payload
      };
    case homeConstants.REGISTRATION:
      return {
        ...state,
        registration_status: payload
      };
    case homeConstants.REQUEST_DONE:
      return {
        ...state
      };
    case homeConstants.CHECK_EMAIL:
      return {
        ...state,
        is_email_exist: payload
      };
    case homeConstants.VERIFY_ENCODE:
      return {
        ...state,
        verifyMobile: payload
      };
    case homeConstants.INTERPRO:
      return {
        ...state,
        interpro: payload
      };

    case homeConstants.BLAST:
      return {
        ...state,
        blast: payload
      };

    case homeConstants.VCFMAF:
      return {
        ...state,
        vcfmaf: payload
      };

    case homeConstants.DATAFRAME_RECON:
      return {
        ...state,
        dataframe_recon: payload
      };

    case homeConstants.MAFMERGER:
      return {
        ...state,
        mafmerger: payload
      };

    case homeConstants.REFVERCONVERTER:
      return {
        ...state,
        refverconverter: payload
      };
    case homeConstants.CLEARMAFMERGER:
      const next = {...state}
      delete next['mafmerger']
      let t = {...next}
      // console.log(t)
      return t
    case homeConstants.CLEARTOOLSDATA: {
      const { mafmerger, refverconverter, vcfmaf, interpro, blast, dataframe_recon, ...removedtoolsdata} = state;
      /* eslint-disable no-param-reassign */
      state = removedtoolsdata;
      return state;
    }
    case homeConstants.LOGMANAGEMENT:
      return {
        ...state,
        logmanagement: [...payload]
      };
    case homeConstants.CHECK_MOBILE:
      return {
        ...state,
        mobileVerified: payload
      };
    case homeConstants.SENDLOGMANAGEMENT:
      return {
        ...state,
        sendlogmanagement: payload
      };
    case homeConstants.CLEAR_NOTICE_DETAILS: {
      const { ...remains } = state;
      /* eslint-disable no-param-reassign */
      state = remains;
      return state;
    }
    case homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD: {
      const { ...rest } = state;
      /* eslint-disable no-param-reassign */
      state = rest;
      return state;
    }

    default:
      return state;
  }
};
export default homeReducer;
