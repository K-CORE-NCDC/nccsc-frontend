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

  export function getOncoInformation(){
    return (dispatch) => {
      let url = config.auth+"oncoprint/";
      sendRequest(url, "GET", "")
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


export function getCircosInformation(data) {
        return (dispatch) => {
          let url = ""
          if('selected_genes' in data && 'type' in data){
            url = config.auth+"circos-user-data/?genes="+data.selected_genes
          }
          else if ("type" in data) {
            url = config.auth+"circos-user-data/"
          }else{
            url = config.auth+"circos/"
          }

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
