import { homeConstants, dataVisualization, userdataVisualization } from "./Constants";
import config from '../config'
import axios from "axios";
import '../assets/interceptor/interceptor'


function sendRequest(url, method, data) {
  let x = axios({ method: method, url, data: data });
  return x
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
        console.log("error", e);
      });
  };
}


export function getGenomicInformation(method, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "genomic-information/";
    // console.log(method)
    // console.log(data)
    sendRequest(url, method, data)
      .then((result) => {
        const d = result;
        // console.log()
        dispatch({
          type: homeConstants.GENOMIC_INFORMATION,
          payload: d["data"],
        });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
}

export function getOncoInformation(type, data) {
  return (dispatch) => {
    let url = config.auth + "oncoprint/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if(d.status === 200){
          dispatch({
            type: dataVisualization.ONCO_REQUEST,
            payload: {...d["data"], status: 200},
          });
        }else{
          dispatch({
            type: dataVisualization.ONCO_REQUEST,
            payload: {status: 204},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.ONCO_REQUEST,
          payload: {status: 204},
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
        if(d.status === 200){
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: dataVisualization.LOLLIPOP_REQUEST,
            payload: {data:[], domains:[], status:204},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.LOLLIPOP_REQUEST,
          payload: {data:[], domains:[], status:204},
        });
      });
  };
}

export function getVolcanoPlotInfo(type, data) {
  return (dispatch) => {
    let url = config.auth + "volcano/";

    console.log(type)
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        if(d.status === 200){
          dispatch({
            type: dataVisualization.VOLCANO_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: dataVisualization.VOLCANO_REQUEST,
            payload: {status:204},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.VOLCANO_REQUEST,
          payload: {status:204},
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

    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        // if (d.status === 200) {
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
          payload: {status:204}
        });
        console.log("error", e);
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
        console.log("error", e);
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
      payload: {status:0  },
    });
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        console.log(d);
        if (d.status === 200) {
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: {...d["data"], status:200},
          });
          // dispatch({ type: dataVisualization.REQUEST_DONE });
        }else{
          dispatch({
            type: dataVisualization.CIRCOS_REQUEST,
            payload: {status: 204},
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({ type: dataVisualization.CIRCOS_REQUEST, payload: {status: 400} });
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

        if(d.status === 200){
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: dataVisualization.SURVIVAL_REQUEST,
            payload: {status:d.status},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        dispatch({
          type: dataVisualization.SURVIVAL_REQUEST,
          payload: {status:204},
        });
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

        if(d.status === 200){
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: d["data"],
          });
        }else{
          dispatch({
            type: dataVisualization.IGV_REQUEST,
            payload: [],
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.IGV_REQUEST,
          payload: [],
        });
      });
  };
}

export function getBreastKeys() {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "brst-key/";
    sendRequest(url, "GET", '')
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
        console.log("error", e);
      });
  };
}

export function getHeadersFiles() {
  return (dispatch) => {
    let url = config.auth + "user-data-visualization/";
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        // console.log()
        dispatch({
          type: homeConstants.USERDATA_VISUALIZATION,
          payload: d["data"],
        });
      })
      .catch((e) => {
        console.log("error", e);
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
        console.log("error", e);
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
        console.log("error", e);
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
        console.log("error", e);
      });

  };
}


export function getVolcanoData() {
  return (dispatch) => {
    let url = config.auth + "volcano/"
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        if(d.status === 200){
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
            payload: {status:204},
          });
        }
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
          payload: {status:204},
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
        console.log("error", e);
      });

  };
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
        console.log("error", e);
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
        if(d.status === 200){
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: dataVisualization.SCATTER_REQUEST,
            payload: {status:d.status},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.SCATTER_REQUEST,
          payload: {status:204},
        });
      });
  };
}


export function getFusionInformation(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
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
        console.log("error", e);
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
        if(d.status === 200){
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: {...d["data"], status:200},
          });
        }else{
          dispatch({
            type: dataVisualization.BOX_REQUEST,
            payload: {status:204},
          });
        }
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
        dispatch({
          type: dataVisualization.BOX_REQUEST,
          payload: {status:204},
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
        // console.log()
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
        console.log("error", e);
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
        // console.log()
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
        console.log("error", e);
      });
  };
}


export function userRegister(type, data) {
  return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth + "registration/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;
        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.REGISTER_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
}
