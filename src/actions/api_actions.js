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

  export function getCircosInformation() {
      return (dispatch) => {
      //   dispatch({ type: homeConstants.DATA_SUMMARY });
        let url = config.auth+"circos/";
        sendRequest(url, "GET", "")
          .then((result) => {
            const d = result;
            console.log(d);
            // console.log()
            dispatch({
              type: dataVisualization.CIRCOS_REQUEST,
              payload: d["data"],
            });
          })
          .catch((e) => {
            console.log("error", e);
          });

      };
    }
