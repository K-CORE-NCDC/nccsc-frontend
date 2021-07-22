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

  export function getCircosInformation() {
      return (dispatch) => {
      //   dispatch({ type: homeConstants.DATA_SUMMARY });
        let url = config.auth+"circos/";
        sendRequest(url, "GET", "")
          .then((result) => {
            const d = result;
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

  export function getOncoInformation(){
    return (dispatch) => {
      let url = config.auth+"oncoprint/";
      sendRequest(url, "GET", "")
        .then((result) => {
          const d = result;
          dispatch({
            type: dataVisualization.ONCO_REQUEST,
            payload: d["data"],
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
  }
