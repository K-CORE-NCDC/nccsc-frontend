import axios from 'axios';
import {
  homeConstants,
  dataVisualization,
  userdataVisualization,
  CLEAR_ALL_STATES
} from './Constants';
import config from '../config';
import '../interceptor/interceptor';

import { getCookie } from '../containers/getCookie';

function sendRequest(url, method, data) {
  const headers = {};
  headers['X-CSRFToken'] = getCookie('csrftoken');
  const x = axios({
    method,
    url,
    data,
    withCredentials: true,
    headers: headers
  });
  return x;
}

export const isSessionAndSessionData = async (type, data) => {
  const url = `${config.auth}session-check/`;
  return sendRequest(url, type, data);
};

export function clearIDPasswordResetPASSWORD() {
  return (dispatch) => {
    dispatch({
      type: homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD,
      payload: {}
    });
  };
}

export function clearNotice() {
  return (dispatch) => {
    dispatch({
      type: homeConstants.CLEAR_NOTICE_DETAILS,
      payload: {}
    });
  };
}

export function signin(method, data) {
  const url = `${config.auth}new-registration/`;
  return sendRequest(url, method, data);
}

export function login(method, data) {
  const url = `${config.auth}api/token/`;
  return sendRequest(url, method, data);
}

// export function logout(method, data) {
//   return (dispatch) => {
//     const url = `${config.auth}logout/`;
//     sendRequest(url, method, data)
//     .then((result) => {
//       const d = result;
//       dispatch({
//         type: homeConstants.CLEAR_LOGIN_DATA,
//         payload: d.data,
//       });
//       dispatch({ type: homeConstants.REQUEST_DONE });
//     })

//     .catch(() => {});
// };
// }

export function findID(method, data) {
  const url = `${config.auth}findid/`;
  return sendRequest(url, method, data);
}

export function findPassword(method, data) {
  const url = `${config.auth}findpassword/`;
  return sendRequest(url, method, data);
}

export function sendlogManagement(method, data) {
  return (dispatch) => {
    const url = `${config.auth}sendlogmanagement/`;
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.SENDLOGMANAGEMENT,
          payload: d.data
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })

      .catch(() => {});
  };
}

export function UserDataProjectsCount(type, data) {
  const url = `${config.auth}user-projects-data-count/`;
  return sendRequest(url, type, data);
}

export function MultiProjectsDelete(method, projectId) {
  let url = '';
  let data = {};
  url = config.auth + `delete-user-project-data/${projectId}`;
  return sendRequest(url, method, data);
}

// export function projectIdStatus(type,data) {
//   return (dispatch) => {
//     dispatch({
//       type: homeConstants.PROJECT_ID,
//       payload: { 'status':data},
//     });
//     dispatch({ type: homeConstants.REQUEST_DONE });
//   };
// }

export function samplesCount(type, data) {
  return (dispatch) => {
    const url = `${config.auth}samplescount/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SAMPLES_COUNT,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.SAMPLES_COUNT,
            payload: { status: d.status }
          });
        }
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.SAMPLES_COUNT,
          payload: { status: 204 }
        });
      });
  };
}


export function interPro(method, data) {
  return (dispatch) => {
    let url = `${config.auth}interpro/`;
    const formData = new FormData();
    if (method === 'POST') {
      formData.append('file', data.file);
      formData.append('filename', data.filename);
      sendRequest(url, method, formData)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.INTERPRO,
            payload: d.data
          });
          dispatch({ type: homeConstants.REQUEST_DONE });
        })

        .catch(() => {});
    } else {
      // formData.append('container_name',data['container_name'])
      url += `?container_name=${data.container_name}`;
      sendRequest(url, method, formData)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.INTERPRO,
            payload: d.data
          });
          dispatch({ type: homeConstants.REQUEST_DONE });
        })

        .catch(() => {});
    }
  };
}
export function vcfmaf(method, data) {
  return (dispatch) => {
    let url = `${config.auth}vcfmaf/`;
    const formData = new FormData();
    if (method === 'POST') {
      formData.append('file', data.file);
      formData.append('filename', data.filename);
      sendRequest(url, method, formData)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.VCFMAF,
            payload: d.data
          });
          dispatch({ type: homeConstants.REQUEST_DONE });
        })

        .catch(() => {});
    } else {
      // formData.append('container_name',data['container_name'])
      url += `?container_name=${data.container_name}`;
      sendRequest(url, method, formData)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.VCFMAF,
            payload: d.data
          });
          dispatch({ type: homeConstants.REQUEST_DONE });
        })

        .catch(() => {});
    }
  };
}


export function changePassword(method, data) {
  const url = `${config.auth}change-password/`;
  return sendRequest(url, method, data);
}

export function verifyEncodeData(method, data) {
  return (dispatch) => {
    const url = `${config.auth}checkplus_success/?${data}`;

    sendRequest(encodeURI(url), method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.VERIFY_ENCODE,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function NoticeDetail(type) {
  const url = `${config.auth}notice-popup/`;
  return sendRequest(url, type, '');
}

export function SetCookie() {
  const url = `${config.auth}csrf-token/`;
  return sendRequest(url, 'GET', '');
}

export function getRNIDetails(type, data) {
  return (dispatch) => {
    const url = `${config.auth}report/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.RNI_DATA,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.RNI_DATA,
            payload: { status: d.status }
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.RNI_DATA,
          payload: { status: 204 }
        });
      });
  };
}

export function RNIDetails(method, data) {
  const url = `${config.auth}report/`;
  return sendRequest(url, method, data);
}

export function getUserFiles() {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}files/`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.FILE_REQUEST,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function DashboardDsummaryData() {
  const url = `${config.auth}data-summary/`;
  return sendRequest(url, 'GET', '');
}

export function GenomicInformation(type, data) {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
  const url = `${config.auth}gene-info/`;
  return sendRequest(url, type, data);
}
export function GeneInfo(method, data) {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
  const url = `${config.auth}gene-info/`;
  return sendRequest(url, 'POST', data);
}
export function OncoInformation(type, data) {
  const url = `${config.auth}oncoprint/`;
  return sendRequest(url, type, data);
}

export function MultiProjectsView(method, data, page, perPage) {
  let url = '';
  if (method === 'GET') {
    url = config.auth + `user-projects-data/?page=${page}&per_page=${perPage}&delay=1`;
  } else {
    url = config.auth + `user-projects-data/?page=${page}&per_page=${perPage}&delay=1&input`;
  }
  return sendRequest(url, method, data);
}

export function getLolipopInformation(type, data) {
  return (dispatch) => {
    const url = `${config.auth}lollipop/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: { data: [], domains: [], status: 204 }
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.LOLLIPOP_REQUEST,
          payload: { data: [], domains: [], status: 204 }
        });
      });
  };
}

export function LolipopInformation(type, data) {
  const url = `${config.auth}lollipop/`;
  return sendRequest(url, type, data);
}

export function FusionVennDaigram(type, data) {
  const url = `${config.auth}getFusionVenn/`;
  return sendRequest(url, type, data);
}

export function clearFusionVennDaigram() {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.FUSIONVENN_CLEAR,
      payload: {}
    });
  };
}

export function getClinicalMaxMinInfo(type, data) {
  return (dispatch) => {
    let url = `${config.auth}getClinicalMaxMinInfo/`;
    if ('project_id' in data) {
      url += `?project_id=${data.project_id}`;
    }

    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.CLINICALMAXMIN_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        }
      })
      .catch(() => {});
  };
}

export function SankeyJson(type, data) {
  const url = `${config.auth}getSankeyJson/`;
  return sendRequest(url, type, data);
}

export function VolcanoPlotInfo(type, data) {
  const url = `${config.auth}volcano/`;
  return sendRequest(url, type, data);
}

export function getHeatmapInformation(type, data) {
  return (dispatch) => {
    const url = `${config.auth}heatmap/`;
    dispatch({
      type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
      payload: { status: 204, loader: true }
    });
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
            payload: { status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
            payload: { status: 204 }
          });
        }
        dispatch({
          type: dataVisualization.HEATMAP_REQUEST,
          // payload: {...JSON.parse(d["data"]), status:200},
          payload: d.data
        });
        // } else {
        //   dispatch({
        //     type: dataVisualization.HEATMAP_REQUEST,
        //     payload: {status:204}
        //   });
        // }
        // dispatch({
        //   type: dataVisualization.HEATMAP_REQUEST,
        //   payload: JSON.parse(d["data"]),
        // });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.HEATMAP_REQUEST,
          payload: { status: 204 }
        });
      });
  };
}

export function HeatmapInformation(type, data) {
  const url = `${config.auth}heatmap/`;
  return sendRequest(url, type, data);
}

export function newFileUpload(fileData, projectName) {
  return (dispatch) => {
    const data = new FormData();
    Object.keys(fileData).forEach((element) => {
      if (fileData[element].type !== undefined) {
        data.append(fileData[element].type, fileData[element].file);
      }
    });
    data.set('project_name', projectName);
    data.set('csrftoken', getCookie('csrftoken'));
    const url = `${config.auth}new-user-data-visualization/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.NEWUSERDATA_VISUALIZATION,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { [fileData.type]: 'failed' }
        });
      });
  };
}

export function SingleFileUpload(fileData, projectName) {
  return (dispatch) => {
    const data = new FormData();
    Object.keys(fileData).forEach((element) => {
      if (fileData[element].type !== undefined) {
        data.append(fileData[element].type, fileData[element].file);
      }
    });
    data.set('project_name', projectName);
    data.set('csrftoken', getCookie('csrftoken'));
    const url = `${config.auth}single-new-user-data-visualization/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.SINGLE_USERDATA_VISUALIZATION,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { status: 'failed' }
        });
      });
  };
}

export function multiFileUpload(fileData, projectName) {
  return (dispatch) => {
    const data = new FormData();
    Object.keys(fileData).forEach((element) => {
      if (fileData[element].type !== undefined) {
        data.append(fileData[element].type, fileData[element].file);
      }
    });
    data.set('project_name', projectName);
    data.set('csrftoken', getCookie('csrftoken'));
    const url = `${config.auth}multi-new-user-data-visualization/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.MULTI_USERDATA_VISUALIZATION,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { status: 'failed' }
        });
      });
  };
}

export function clearNewFileUploadState() {
  return (dispatch) =>
    dispatch({
      type: homeConstants.CLEARNEWUSERDATA_VISUALIZATION,
      payload: {}
    });
}

export function clearSingleFIleUploadState() {
  return (dispatch) =>
    dispatch({
      type: homeConstants.CLEAR_SINGLE_USER_DATA_VISUALIZATION,
      payload: {}
    });
}

export function clearMultiFIleUploadState() {
  return (dispatch) =>
    dispatch({
      type: homeConstants.MULTI_USERDATA_VISUALIZATION,
      payload: {}
    });
}
export function clearUploadClinicalColumns() {
  return (dispatch) =>
    dispatch({
      type: homeConstants.CLEAR_UPLOAD_CLININCAL_COLUMNS,
      payload: {}
    });
}

export function uploadClinincalSamples(fileData) {
  return (dispatch) => {
    const url = `${config.auth}upload-clinical-columns/`;
    sendRequest(url, 'POST', fileData)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.UPLOAD_CLININCAL_COLUMNS,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { [fileData.type]: 'failed' }
        });
      });
  };
}

export function getCircosInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}circos/`;
    dispatch({
      type: dataVisualization.CIRCOS_REQUEST,
      payload: { status: 0 }
    });
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: { ...d.data, status: 200 }
          });
          // dispatch({ type: dataVisualization.REQUEST_DONE });
        } else {
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: { status: 204 }
          });
        }
      })
      .catch(() => {
        dispatch({ type: dataVisualization.CIRCOS_REQUEST, payload: { status: 400 } });
      });
  };
}

export function CircosInformation(type, data) {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
  const url = `${config.auth}circos/`;
  return sendRequest(url, type, data);
}

export function clearCircosInfomation() {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.CLEAR_CIRCOS_INFORMATION,
      payload: {}
    });
  };
}

export function getSurvivalInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}survival/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: { status: d.status }
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.SURVIVAL_REQUEST,
          payload: { status: 204 }
        });
      });
  };
}

export function SurvivalInformation(type, data) {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
  const url = `${config.auth}survival/`;
  return sendRequest(url, type, data);
}

export function clearSurvivalIMage() {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.CLEAR_SURVIVAL_IMAGE,
      payload: {}
    });
  };
}

export function getIgv(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}igv/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        if (d.status === 200) {
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: d.data
          });
        } else {
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: []
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.IGV_REQUEST,
          payload: []
        });
      });
  };
}

export function IGV(type, data) {
  const url = `${config.auth}igv/`;
  return sendRequest(url, type, data);
}

export function getBreastKeys(data_) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}brst-key/`;
    sendRequest(url, 'POST', data_)
      .then((result) => {
        const d = result;
        const { data } = d;
        const tmp = {};
        for (let i = 0; i < data.length; i += 1) {
          tmp[data[i].rn_key] = data[i].brst_key;
        }
        dispatch({
          type: dataVisualization.KEYS_REQUEST,
          payload: tmp
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {});
  };
}

export function getCircosUserData(data_) {
  return (dispatch) => {
    const data = new FormData();

    if ('selected_genes' in data_) {
      data.set('genes', data_.selected_genes);
    }

    if ('filter' in data_) {
      data.set('filters', data_.filter);
    }

    const url = `${config.auth}circos-user-data/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.CIRCOS_REQUEST,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getOncoUserData(data_) {
  return (dispatch) => {
    const data = new FormData();

    if ('selected_genes' in data_) {
      data.set('genes', data_.selected_genes);
    }

    if ('filter' in data_) {
      data.set('filters', data_.filter);
    }

    const url = `${config.auth}onco-user-data/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.ONCO_REQUEST,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getVolcanoUserData(data_) {
  return (dispatch) => {
    const data = new FormData();
    if ('selected_genes' in data_) {
      data.set('genes', data_.selected_genes);
    }
    if ('filter' in data_) {
      data.set('filters', data_.filter);
    }
    const url = `${config.auth}volcano-user-data/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.VOLCANO_REQUEST,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getVolcanoData() {
  return (dispatch) => {
    const url = `${config.auth}volcano/`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: { status: 204 }
          });
        }
      })
      .catch(() => {
        dispatch({
          type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
          payload: { status: 204 }
        });
      });
  };
}

export function getUserDataProjectsTableData(project = false) {
  return (dispatch) => {
    let url = '';
    if (project !== false) {
      url = `${config.auth}user-data-projects/${project}/`;
    } else {
      url = `${config.auth}user-data-projects/`;
    }
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE,
          payload: { key: 'NotFound' }
        });
      });
  };
}

export function UserDataProjectsTableData(project = false) {
  let url = '';
  if (project !== false) {
    url = `${config.auth}user-data-projects/${project}/`;
  } else {
    url = `${config.auth}user-data-projects/`;
  }
  return sendRequest(url, 'GET', '');
}

export function sankeyImageData(data) {
  return () => {
    const url = `${config.auth}sankeyimagedata/`;
    sendRequest(url, 'POST', data);
  };
}
export function sendReportData(type, data) {
  return (dispatch) => {
    const url = `${config.auth}generatereport/`;
    // sendRequest(url, "POST", data)
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: dataVisualization.PDF_REPORT,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}
export function clearPdfLink() {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.CLEAR_PDF_LINK,
      payload: {}
    });
  };
}

export function getCircosSamplesRnidList() {
  return (dispatch) => {
    const url = `${config.auth}brst-samples-rnid-list/`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: dataVisualization.CIRCOS_SAMPLES_RNID,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getScatterInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}scatter-plot/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        dispatch({ type: dataVisualization.REQUEST_DONE });
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: { status: d.status }
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.SCATTER_REQUEST,
          payload: { status: 204 }
        });
      });
  };
}

export function ScatterInformation(type, data) {
  const url = `${config.auth}scatter-plot/`;
  return sendRequest(url, type, data);
}

export function getFusionExons(type, data) {
  return (dispatch) => {
    const url = `${config.auth}getFusionExons/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.FUSION_EXON_REQUEST,
          payload: d.data
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {});
  };
}

export function getFusionInformation(type, data) {
  return (dispatch) => {
    const url = `${config.auth}fusion-plot/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.FUSION_REQUEST,
          payload: d.data
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {});
  };
}

export function getBoxInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}box-plot/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        dispatch({ type: dataVisualization.REQUEST_DONE });
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: { ...d.data, status: 200 }
          });
        } else {
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: { status: 204 }
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch(() => {
        dispatch({
          type: dataVisualization.BOX_REQUEST,
          payload: { status: 204 }
        });
      });
  };
}

export function BoxInformation(type, data) {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
  const url = `${config.auth}box-plot/`;
  return sendRequest(url, type, data);
}
export function getOncoImages(method, data) {
  return (dispatch) => {
    const url = `${config.auth}onco-sample-images/`;
    dispatch({
      type: dataVisualization.ONCO_IMAGES_INFORMATION,
      payload: null
    });
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        let payload = [];
        if (d.status === 200) {
          payload = d.data;
        }
        dispatch({
          type: dataVisualization.ONCO_IMAGES_INFORMATION,
          payload
        });
      })
      .catch(() => {});
  };
}

export function OncoImages(method, data) {
  const url = `${config.auth}onco-sample-images/`;
  return sendRequest(url, method, data);
}

export function getCircosTimelineTable(method, data) {
  return (dispatch) => {
    const url = `${config.auth}onco-age-diagram/`;
    dispatch({
      type: dataVisualization.CIRCOS_TIMELINE_GRAPH,
      payload: null
    });
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        let payload = [];
        if (d.status === 200) {
          payload = d.data;
        }
        dispatch({
          type: dataVisualization.CIRCOS_TIMELINE_GRAPH,
          payload
        });
      })
      .catch(() => {});
  };
}

export function CircosTimelineTable(method, data) {
  const url = `${config.auth}onco-age-diagram/`;
  return sendRequest(url, method, data);
}

export function userRegister(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}registration/`;
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: homeConstants.REQUEST_DONE });
        dispatch({
          type: homeConstants.REGISTRATION,
          payload: d.data
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      .catch(() => {});
  };
}

export function clearDataVisualizationState() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ALL_STATES,
      payload: {}
    });
  };
}

export function fetchProjectTableData(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}user-project-table/`;
    dispatch({
      type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
      payload: {}
    });
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
          payload: {}
        });
      });
  };
}

export function getUserDefinedFilter(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    const url = `${config.auth}new-user-data-visualization_filter/`;
    dispatch({
      type: userdataVisualization.USER_DEFINED_FILTER,
      payload: {}
    });
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DEFINED_FILTER,
          payload: d.data
        });
      })
      .catch(() => {
        dispatch({
          type: userdataVisualization.USER_DEFINED_FILTER,
          payload: {}
        });
      });
  };
}

export function updateDownloadVisualizationPurpose(data) {
  return (dispatch) => {
    const url = `${config.auth}download-capture-info/`;
    sendRequest(url, 'POST', data)
      .then((result) => {
        // let res = result
        dispatch({
          type: userdataVisualization.UPDATE_DOWNLOAD_VISUALIZATION_PURPOSE,
          payload: result
        });
        return result;
      })
      .catch(() => {});
  };
}

export function languageChange(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    dispatch({
      type: homeConstants.APPLICATION_LANGUAGE,
      payload: data
    });
  };
}

export function getFaqData(id) {
  return (dispatch) => {
    const url = `${config.auth}faq-api/?id=${id}`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_FAQ,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getFaqPageData(url, method, data) {
  return sendRequest(url, method, data);
}

export function getProjectsData(id) {
  return (dispatch) => {
    const url = `${config.auth}user-projects-data/?id=${id}`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_FAQ,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getNoticeData(id) {
  return (dispatch) => {
    const url = `${config.auth}notice-api/?id=${id}`;
    sendRequest(url, 'GET', '')
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_NOTICE,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function getQaData(id, data) {
  return (dispatch) => {
    let request;
    if (id) {
      const url = `${config.auth}qa-api/?id=${id}`;
      request = sendRequest(url, 'GET', '');
    } else {
      const url = `${config.auth}qa-api/`;
      request = sendRequest(url, 'POST', data);
    }
    request
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_QA,
          payload: d.data
        });
      })
      .catch(() => {});
  };
}

export function clearProjectTableDataTableData() {
  return (dispatch) => {
    dispatch({
      type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
      payload: {}
    });
  };
}
