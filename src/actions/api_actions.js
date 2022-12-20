import { homeConstants, dataVisualization, userdataVisualization,  CLEAR_ALL_STATES } from "./Constants";
import config from '../config'
import axios from "axios";
import '../assets/interceptor/interceptor'


function sendRequest(url, method, data) {
  let x = axios({ method: method, url, data: data });
  return x
}


export function clearIDPasswordResetPASSWORD() {
  return (dispatch) => {
    dispatch({
      type: homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD,
      payload: {},
    });
  };
}


export function logManagement(method,data) {
  return (dispatch) => {
    dispatch({
      type: homeConstants.CLEAR_ID_PASSWORD_RESET_PASSWORD,
      payload: data,
    });
  };
}


export function sendlogManagement(method,data){
  return (dispatch) => {
    let url = config.auth + "sendlogmanagement/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.SENDLOGMANAGEMENT,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
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
    let url = config.auth + "samplescount/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SAMPLES_COUNT,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.SAMPLES_COUNT,
            payload: { status: d.status },
          });
        }
        // dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.SAMPLES_COUNT,
          payload: { status: 204 },
        });
      });
  };
}


export function sendEmail(method,data){
  return (dispatch) => {
    let url = config.auth + "send-mail/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.OTP_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
}
export function verifyOTP(method,data){
  return (dispatch) => {
    let url = config.auth + "validate/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.OTP_VALIDATION,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })

      .catch((e) => {

      });
  }
}

export function findID(method,data){
  return (dispatch) => {
    let url = config.auth + "findid/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.FIND_ID,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
}

export function interPro(method,data){
  return (dispatch) => {
    let url = config.auth + "interpro/";
    let formData = new FormData()
    if(method==="POST"){
      formData.append('file',data['file'])
      formData.append('filename',data['filename'])
      sendRequest(url, method, formData)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.INTERPRO,
            payload: d["data"],
          });
          dispatch({ type: homeConstants.REQUEST_DONE });
        })
        
        .catch((e) => {

        });
    }else{
      // formData.append('container_name',data['container_name'])
      url += '?container_name='+data['container_name']
      sendRequest(url, method, formData)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.INTERPRO,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
    }
  }
}
export function vcfmaf(method,data){
  return (dispatch) => {
    let url = config.auth + "vcfmaf/";
    let formData = new FormData()
    if(method==="POST"){
      formData.append('file',data['file'])
      formData.append('filename',data['filename'])
      sendRequest(url, method, formData)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.VCFMAF,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
    }else{
      // formData.append('container_name',data['container_name'])
      url += '?container_name='+data['container_name']
      sendRequest(url, method, formData)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.VCFMAF,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
    }
    
  }
}

export function findPassword(method,data){
  return (dispatch) => {
    let url = config.auth + "findpassword/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.FIND_PASSWORD,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
}
export function checkEmail(method,data){
  return (dispatch) => {
    let url = config.auth + "checkemail/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.CHECK_EMAIL,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
}


export function changePassword(method,data){
  return (dispatch) => {
    let url = config.auth + "change-password/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.CHANGE_PASSWORD,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      
      .catch((e) => {

      });
  }
}
export function verifyEncodeData(method, data) {
  return (dispatch) => {
    let url = config.auth + `checkplus_success/?`+data
    
    sendRequest(encodeURI(url), method, data)
    .then((result) => {
      const d = result;
      dispatch({
        type: homeConstants.VERIFY_ENCODE,
        payload: d["data"],
      });
    })
    .catch((e) => {

    });
  }
}
export function getNoticeDetail(type, data) {

  return (dispatch) => {
    let url = config.auth + `notice-api-get/`;
    // let url = config.auth + `notice-api-get/${data.id}?id=${data.id}`;
    sendRequest(url, type, "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.NOTICE_DETAILS,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      .catch((e) => {

      });
  }
}


export function getDashboardCount() {
  return (dispatch) => {
    let url = config.auth + "data-count/";
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_COUNT,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  }
}

export function getRNIDetails(type, data) {
  return (dispatch) => {

    let url = config.auth + "report/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.RNI_DATA,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.RNI_DATA,
            payload: { status: d.status },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.RNI_DATA,
          payload: { status: 204 },
        });
      });
  };
}
export function getUserFiles() {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "files/";
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.FILE_REQUEST,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  };
}

export function getDashboardDsummaryData() {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "data-summary/";
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_SUMMARY,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  };
}


export function getGenomicInformation(method, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "genomic-information/";
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.GENOMIC_INFORMATION,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  };
}

export function getOncoInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "oncoprint/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.ONCO_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.ONCO_REQUEST,
            payload: { status: 204 },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        
        dispatch({
          type: dataVisualization.ONCO_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}


export function getLolipopInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "lollipop/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: { data: [], domains: [], status: 204 },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.LOLLIPOP_REQUEST,
          payload: { data: [], domains: [], status: 204 },
        });
      });
  };
}

export function getFusionTable(type, data) {
  return (dispatch) => {
    let url = config.auth + "getFusionTable/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.FUSIONTABLE_REQUEST,
            payload:  d 
          });
        }
      }).catch((e) => {

      });
  }
}

export function getFusionVennDaigram(type, data) {
  return (dispatch) => {
    let url = config.auth + "getFusionVenn/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.FUSIONVENN_REQUEST,
            payload: { "res":{...d["data"]}, status: 200 },
          });
        }
      }).catch((e) => {

      });
  }
}

export function clearFusionVennDaigram(type, data) {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.FUSIONVENN_CLEAR,
      payload: {},
    });
  }
}
export function getClinicalMaxMinInfo(type, data) {
  return (dispatch) => {
    let url = config.auth + "getClinicalMaxMinInfo/";
    if('project_id' in data){
      url += "?project_id="+data['project_id']
    }
    
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.CLINICALMAXMIN_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        }
      }).catch((e) => {

        
      });
  }
}
export function getSankeyJson(type,data){
  return (dispatch) => {
    let url = config.auth + "getSankeyJson/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SANKEYJSON_REQUEST,
            payload: { "data":[...d["data"]], status: 200 },
          });
          

          
          
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });

      }).catch((e) => {

        
      });
  }
}

export function getVolcanoPlotInfo(type, data) {
  return (dispatch) => {
    let url = config.auth + "volcano/";

    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.VOLCANO_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.VOLCANO_REQUEST,
            payload: { status: 204 },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.VOLCANO_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}
export function userDefinedGetVolcanoPlotInfo(type, data) {
  return (dispatch) => {
    let url = config.auth + "userdefined-volcano-info/";

    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.USER_DEFINED_VOLCANO_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.USER_DEFINED_VOLCANO_REQUEST,
            payload: { status: 204 },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.USER_DEFINED_VOLCANO_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}

export function getHeatmapInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "heatmap/";
    // const data = new FormData()
    //
    // data.set('genes', data.genes);
    // if("filter" in data){
    //   data.set('filters', JSON.stringify(data.filter));
    // }
    // if("table_type" in data){
    //   data.set('tab_type', data.table_type);
    // }
    dispatch({
      type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
      payload: { status: 204, loader: true },
    });
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
            payload: { status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.HEATMAP_REQUEST_STATUS_CODE,
            payload: { status: 204 },
          });
        }
        dispatch({
          type: dataVisualization.HEATMAP_REQUEST,
          // payload: {...JSON.parse(d["data"]), status:200},
          payload: d["data"],
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
      .catch((e) => {
        dispatch({
          type: dataVisualization.HEATMAP_REQUEST,
          payload: { status: 204 }
        });

      });
  };
}

export function file_upload(fileData, projectName) {
  return (dispatch) => {
    const data = new FormData()
    // dispatch({ type: homeConstants.DATA_SUMMARY });
    // fileData.forEach(file=>{
    //   formData.append("arrayOfFilesName", file);
    // });
    Object.keys(fileData).forEach(element => {
      if (fileData[element].type !== undefined) {
        data.append(fileData[element].type, fileData[element].file);
      }
    })
    data.set("project_name", projectName)

    let url = config.auth + "user-data-visualization/";
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION,
          payload: d["data"],
        });
      })
      .catch((e) => {

        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { [fileData.type]: 'failed' }
        })
      });
  }
}

export function new_file_upload(fileData, projectName) {
  return (dispatch) => {
    const data = new FormData()
    // dispatch({ type: homeConstants.DATA_SUMMARY });
    // fileData.forEach(file=>{
    //   formData.append("arrayOfFilesName", file);
    // });
    Object.keys(fileData).forEach(element => {
      if (fileData[element].type !== undefined) {
        data.append(fileData[element].type, fileData[element].file);
      }
    })
    data.set("project_name", projectName)

    let url = config.auth + "new-user-data-visualization/";
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.NEWUSERDATA_VISUALIZATION,
          payload: d["data"],
        });
      })
      .catch((e) => {

        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { [fileData.type]: 'failed' }
        })
      });
  }
}
export function clear_new_file_upload_state() {
  return (dispatch) => 
        dispatch({
          type: homeConstants.CLEARNEWUSERDATA_VISUALIZATION,
          payload: {}
        });
  }
export function clear_upload_clinical_columns() {
  return (dispatch) => 
        dispatch({
          type: homeConstants.CLEAR_UPLOAD_CLININCAL_COLUMNS,
          payload: {}
        });
  }

export function uploadClinincalSamples(fileData) {
  return (dispatch) => {
    let url = config.auth + "upload-clinical-columns/";
    sendRequest(url, "POST", fileData)
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.UPLOAD_CLININCAL_COLUMNS,
          payload: d["data"],
        });
      })
      .catch((e) => {

        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION_ERROR,
          payload: { [fileData.type]: 'failed' }
        })
      });
  }
}

export function getCircosInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "circos/";
    dispatch({
      type: dataVisualization.CIRCOS_REQUEST,
      payload: { status: 0 },
    });
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
          // dispatch({ type: dataVisualization.REQUEST_DONE });
        } else {
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: { status: 204 },
          });
        }
      })
      .catch((e) => {

        dispatch({ type: dataVisualization.CIRCOS_REQUEST, payload: { status: 400 } });
      });
  };
}

export function clearCircosInfomation() {
  return (dispatch) => {
    dispatch({
      type: dataVisualization.CLEAR_CIRCOS_INFORMATION,
      payload:{}
    });
  };
}

export function getSurvivalInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "survival/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: { status: d.status },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        dispatch({
          type: dataVisualization.SURVIVAL_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}

export function clearSurvivalIMage(){
  return (dispatch) => {
    dispatch({
      type: dataVisualization.CLEAR_SURVIVAL_IMAGE,
      payload:{}
    });
  };
}

export function getIgv(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "igv/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        if (d.status === 200) {
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: d["data"],
          });
        } else {
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: [],
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.IGV_REQUEST,
          payload: [],
        });
      });
  };
}

export function getBreastKeys(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "brst-key/";
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        let data = d['data']
        let tmp = {}
        for (var i = 0; i < data.length; i++) {
          tmp[data[i]['rn_key']] = data[i]['brst_key']
        }
        dispatch({
          type: dataVisualization.KEYS_REQUEST,
          payload: tmp,
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

      });
  };
}

export function getHeadersFiles() {
  return (dispatch) => {
    let url = config.auth + "user-data-visualization/";
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  };
}

export function getCircosUserData(data) {
  return (dispatch) => {
    const data = new FormData()

    if ('selected_genes' in data) {
      data.set('genes', data.selected_genes);
    }

    if ('filter' in data) {
      data.set('filters', data.filter);
    }

    let url = config.auth + "circos-user-data/"
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.CIRCOS_REQUEST,
          payload: d["data"],

        });
      })
      .catch((e) => {

      });
  };
}

export function getOncoUserData(data) {
  return (dispatch) => {
    const data = new FormData()

    if ('selected_genes' in data) {
      data.set('genes', data.selected_genes);
    }

    if ('filter' in data) {
      data.set('filters', data.filter);
    }

    let url = config.auth + "onco-user-data/"
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.ONCO_REQUEST,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  };
}



export function getVolcanoUserData(data) {
  return (dispatch) => {
    const data = new FormData()
    if ('selected_genes' in data) {
      data.set('genes', data.selected_genes);
    }
    if ('filter' in data) {
      data.set('filters', data.filter);
    }
    let url = config.auth + "volcano-user-data/"
    sendRequest(url, "POST", data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.VOLCANO_REQUEST,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });

  };
}


export function getVolcanoData() {
  return (dispatch) => {
    let url = config.auth + "volcano/"
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        if (d.status === 200) {
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: { status: 204 },
          });
        }
      })
      .catch((e) => {

        dispatch({
          type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
          payload: { status: 204 },
        });
      });

  };
}



export function getUserDataProjectsTableData(project = false) {
  return (dispatch) => {
    let url = ''
    if (project !== false) {
      url = `${config.auth}user-data-projects/${project}/`
    } else {
      url = `${config.auth}user-data-projects/`
    }
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });

  };
}

export function sankeyImageData(data){
  return (dispatch) => {
    let url = config.auth + "sankeyimagedata/"
    sendRequest(url, "POST", data)
   
}
}
export function sendReportData(type,data){
  return (dispatch) => {
    let url = config.auth + "generatereport/"
    // sendRequest(url, "POST", data)
    sendRequest(url, type, data)
    .then((result) => {
      const d = result;
      dispatch({
        type: dataVisualization.PDF_REPORT,
        payload: d["data"],
      });
    })
    .catch((e) => {

    });
}
}
export function clearPdfLink(type,data){
  return (dispatch) => {
      dispatch({
        type: dataVisualization.CLEAR_PDF_LINK,
        payload:{}
      });
    
}
}

export function getCircosSamplesRnidList() {
  return (dispatch) => {
    let url = config.auth + "brst-samples-rnid-list/"
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: dataVisualization.CIRCOS_SAMPLES_RNID,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });

  };
}

export function getScatterInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "scatter-plot/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        dispatch({ type: dataVisualization.REQUEST_DONE });
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: { status: d.status },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.SCATTER_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}

export function getGeneFusionInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "check-fusion-genes/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.CHECK_GENE_FUSION_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

      });
  };
}

export function getFusionExons(type,data){
  return (dispatch) => {
    let url = config.auth + "getFusionExons/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.FUSION_EXON_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

      });
  }
}

export function getFusionInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "fusion-plot/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.FUSION_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

      });
  };
}

export function getBoxInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "box-plot/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        dispatch({ type: dataVisualization.REQUEST_DONE });
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: { ...d["data"], status: 200 },
          });
        } else {
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: { status: 204 },
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {

        dispatch({
          type: dataVisualization.BOX_REQUEST,
          payload: { status: 204 },
        });
      });
  };
}

export function getOncoImages(method, data) {
  return (dispatch) => {
    let url = config.auth + "onco-sample-images/";
    dispatch({
      type: dataVisualization.ONCO_IMAGES_INFORMATION,
      payload: null,
    });
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        let payload = []
        if (d.status === 200) {
          payload = d["data"]
        }
        dispatch({
          type: dataVisualization.ONCO_IMAGES_INFORMATION,
          payload: payload,
        });
      })
      .catch((e) => {

      });
  };
}


export function getCircosTimelineTable(method, data) {
  return (dispatch) => {
    let url = config.auth + "onco-age-diagram/";
    dispatch({
      type: dataVisualization.CIRCOS_TIMELINE_GRAPH,
      payload: null,
    });
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        let payload = []
        if (d.status === 200) {
          payload = d["data"]
        }
        dispatch({
          type: dataVisualization.CIRCOS_TIMELINE_GRAPH,
          payload: payload,
        });
      })
      .catch((e) => {

      });
  };
}

export function getPassEncodeId(type, data) {
  return (dispatch) => {
    let url = config.auth + "niceKey/";
    sendRequest(url, type, data)
      .then((result) => {
        let r = result['data']
        if (result['status'] === 200) {
          dispatch({ type: dataVisualization.REQUEST_DONE });
          dispatch({
            type: dataVisualization.PASS_ENCODE_ID,
            payload: r,
          });
        }
      }).catch((e) => {
      })
  }
}

export function checkUserName(type, data) {
  return (dispatch) => {
    let url = config.auth + "registration/?type=" + data['type'] + '&value=' + data['value'];
    sendRequest(url, type, data)
      .then((result) => {
        let r = result['data']
        if (result['status'] === 200) {
          dispatch({ type: dataVisualization.REQUEST_DONE });
          dispatch({
            type: dataVisualization.CHECK_USER,
            payload: r,
          });
        }
      }).catch((e) => {
      })
  }
}

export function userRegister(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "registration/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: homeConstants.REQUEST_DONE });
        dispatch({
          type: homeConstants.REGISTRATION,
          payload: d["data"],
        });
        dispatch({ type: homeConstants.REQUEST_DONE });
      })
      .catch((e) => {

      });
  };
}


// export function getKMeanformation(type, data) {
//   return (dispatch) => {
//     let url = config.auth + "k-mean/";
//     // const data = new FormData()
//
//     // data.set('genes', data.genes);
//     // if("filter" in data){
//     //   data.set('filters', JSON.stringify(data.filter));
//     // }
//     // if("table_type" in data){
//     //   data.set('tab_type', data.table_type);
//     // }
//
//     sendRequest(url, type, data)
//       .then((result) => {
//         const d = result
//         // if (d.status === 200) {
//           dispatch({
//             type: dataVisualization.KMEAN_REQUEST,
//             // payload: {...JSON.parse(d["data"]), status:200},
//             payload: d["data"],
//           });
//         // } else {
//         //   dispatch({
//         //     type: dataVisualization.HEATMAP_REQUEST,
//         //     payload: {status:204}
//         //   });
//         // }
//         // dispatch({
//         //   type: dataVisualization.HEATMAP_REQUEST,
//         //   payload: JSON.parse(d["data"]),
//         // });
//         dispatch({ type: dataVisualization.REQUEST_DONE });
//       })
//       .catch((e) => {
//         dispatch({
//           type: dataVisualization.KMEAN_REQUEST,
//           payload: {status:204}
//         });
//
//       });
//   };
// }


export function clearDataVisualizationState() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ALL_STATES,
      payload: {},
    });
  };
}


export function fetchProjectTableData(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "user-project-table/";
    dispatch({
      type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
      payload: {},
    });
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
          payload: d["data"],
        });
      })
      .catch((e) => {
        dispatch({
          type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
          payload: {},
        });
      });
  };
}

export function getUserDefinedFilter(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "new-user-data-visualization_filter/";
    dispatch({
      type: userdataVisualization.USER_DEFINED_FILTER,
      payload: {},
    });
    sendRequest(url, 'POST', data)
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.USER_DEFINED_FILTER,
          payload: d["data"],
        });
      })
      .catch((e) => {
        dispatch({
          type: userdataVisualization.USER_DEFINED_FILTER,
          payload: {},
        });
      });
  };
}

export function updateDownloadVisualizationPurpose(data) {
  return (dispatch) => {
    let url = config.auth + "download-capture-info/";
    sendRequest(url, 'POST', data)
      .then((result) => {
        // let res = result
        dispatch({
          type: userdataVisualization.UPDATE_DOWNLOAD_VISUALIZATION_PURPOSE,
          payload: result,
        });
        return result
      })
      .catch(e => {
      })

  }
}


export function languageChange(data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    dispatch({
      type: homeConstants.APPLICATION_LANGUAGE,
      payload: data,
    });
  }
}

export function getFaqData(id) {
  return (dispatch) => {
    let url = config.auth + "faq-api/?id=" + id;
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_FAQ,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  }
}

export function getNoticeData(id) {
  return (dispatch) => {
    let url = config.auth + "notice-api/?id=" + id;
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: homeConstants.DATA_NOTICE,
          payload: d["data"],
        });
      })
      .catch((e) => {

      });
  }
}

export function getQaData(id, data) {
  return (dispatch) => {
    let request
    if (id) {
      let url = config.auth + "qa-api/?id=" + id;
      request = sendRequest(url, "GET", "")
    } else {
      let url = config.auth + "qa-api/";
      request = sendRequest(url, "POST", data)
    }
    request.then((result) => {
      const d = result;
      dispatch({
        type: homeConstants.DATA_QA,
        payload: d["data"],
      });
    })
      .catch((e) => {

      });
  }
}

export function clearProjectTableDataTableData() {
  return (dispatch) => {
    dispatch({
      type: userdataVisualization.USER_DATA_PROJECT_TABLE_PROJECT,
      payload: {},
    });
  }
}
