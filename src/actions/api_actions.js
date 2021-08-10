import { homeConstants,dataVisualization } from "./Constants";
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


export function file_upload(data) {
    return (dispatch) => {
      const form = new FormData()
      // dispatch({ type: homeConstants.DATA_SUMMARY });
      form.set('file', data.file);
      form.set('type', data.type);
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
