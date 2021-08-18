import { homeConstants,dataVisualization,userdataVisualization } from "./Constants";
import config from '../config'
import axios from "axios";


function sendRequest(url, method, data) {
    let x = axios({ method: method, url, data: data });
    return x
  }

export function getDashboardDsummaryData() {
    return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });
      let url = config.auth+"data-summary/";
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


export function getGenomicInformation() {
    return (dispatch) => {
    //   dispatch({ type: homeConstants.DATA_SUMMARY });

      let url = config.auth+"genomic-information/";
      sendRequest(url, "GET", "")
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

export function getOncoInformation(type,data){
  return (dispatch) => {
    let url = config.auth+"onco/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        dispatch({
          type: dataVisualization.ONCO_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
}


export function getLolipopInformation(type,data){
  return (dispatch) => {
    let url = config.auth+"lolipop/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result
        dispatch({
          type: dataVisualization.LOLLIPOP_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
}


export function file_upload(data, div_name) {
    return (dispatch) => {
      const form = new FormData()
      // dispatch({ type: homeConstants.DATA_SUMMARY });
      form.set('file', data.file);
      form.set('type', data.type);
      form.set("div_name",div_name)

      let url = config.auth+"user-data-visualization/";
      sendRequest(url, "POST", form)
        .then((result) => {
          const d = result;
          dispatch({
            type: homeConstants.USERDATA_VISUALIZATION,
            payload: d["data"],
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  }

export function getCircosInformation(type,data) {
  // console.log(type,data);
  return (dispatch) => {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth+"circos/";
    sendRequest(url, type, data)
      .then((result) => {
        const d = result;

        dispatch({ type: dataVisualization.REQUEST_DONE });
        dispatch({
          type: dataVisualization.CIRCOS_REQUEST,
          payload: d["data"],
        });
        dispatch({ type: dataVisualization.REQUEST_DONE });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
}

export function getBreastKeys(){
  return (dispatch) => {
  //   dispatch({ type: homeConstants.DATA_SUMMARY });
    let url = config.auth+"brst-key/";
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
        let url = config.auth+"user-data-visualization/";
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
        const form = new FormData()

        if('selected_genes' in data){
          form.set('genes', data.selected_genes);
        }

        if('filter' in data){
          form.set('filters', data.filter);
        }

        let url = config.auth+"circos-user-data/"
        sendRequest(url, "POST", form)
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
      const form = new FormData()

      if('selected_genes' in data){
        form.set('genes', data.selected_genes);
      }

      if('filter' in data){
        form.set('filters', data.filter);
      }

      let url = config.auth+"onco-user-data/"
      sendRequest(url, "POST", form)
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
      const form = new FormData()

      if('selected_genes' in data){
        form.set('genes', data.selected_genes);
      }

      if('filter' in data){
        form.set('filters', data.filter);
      }

      let url = config.auth+"volcano-user-data/"
      sendRequest(url, "POST", form)
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
    let url = config.auth+"volcano/"
    sendRequest(url, "GET", "")
      .then((result) => {
        const d = result;
        dispatch({
          type: userdataVisualization.VOLCANO_DATA_VISUALIZATION_REQUEST,
          payload: d["data"],
        });
      })
      .catch((e) => {
        console.log("error", e);
      });

    };
  }
