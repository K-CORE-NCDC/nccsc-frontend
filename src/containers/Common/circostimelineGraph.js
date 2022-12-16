import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import DataTable from 'react-data-table-component';
import TimeLineChart from './timelineCss'


const months = {
  "01":'January',
  "02":'Febraury',
  "03":'March',
  "04":'April',
  "05":'May',
  "06":'June',
  "07":'July',
  "08":'Agust',
  "09":'September',
  "10":'October',
  "11":'November',
  "12":'December',
}

const GraphsModal = ({closeShowTimelineTables, circosTimelieTableData }) => {
  const [bmiChart, setBmiChart] = useState([])
  const [ki67Chart, setKi67Chart] = useState([])
  const [ca15Chart, setCa15Chart] = useState([])
  const [ceaChart, setCeaChart] = useState([])
  const [her2Chart, setHer2Chart] = useState([])
  const [tab,setTab] = useState('bmi')
  const [bmiChartTable, setBmiChartTable] = useState({"columns":[],'data':[]})
  const [ki67ChartTable,setKi67ChartTable] = useState({"columns":[],'data':[]})
  const [ca15ChartTable,setCa15ChartTable] = useState({"columns":[],'data':[]})
  const [ceaChartTable,setCeaChartTable] = useState({"columns":[],'data':[]})
  const [her2ChartTable,setHer2ChartTable] = useState({"columns":[],'data':[]})

  const convertStrToDate = (dateString) => {
      let dateSplits = dateString.split('-')
      return new Date(dateSplits[0], dateSplits[1], dateSplits[2])
  }
  useEffect(() => {
    const ChartData = [[
        { type: 'string', id: 'BMIVL' },
        { type: 'string', id: 'dummy bar label' },
        { type: 'string', role: 'tooltip' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
    ]]
    const tableData = [[
        { type: 'string', label:'Exam Value' },
        { type: 'string', label:'Exam Date' },
    ]]

    const ki67ChartData = [[
        { type: 'string', id: 'ki67' },
        { type: 'string', id: 'dummy bar label' },
        { type: 'string', role: 'tooltip' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
    ]]

    if(circosTimelieTableData !== null && circosTimelieTableData !== undefined){

      if(Object.keys(circosTimelieTableData).length > 0){
        var bmi = circosTimelieTableData['bmi']
        var ki67 = circosTimelieTableData['ki67']
        var ca15 = circosTimelieTableData['ca15']
        var cea = circosTimelieTableData['cea']
        var her2 = circosTimelieTableData['her2']
        if(bmi.length>0){
          let t = ChartData
          let table_cols = [
            
            {
              name: 'Date',
              selector: row => row.rgst_ymd
            },
            {
              name: 'BMI Value',
              selector: row => row.bmi_vl
            },
          ]
          for (var i = 0; i < bmi.length; i++) {
            let date = bmi[i]['rgst_ymd'].split('-')
            let d = convertStrToDate(bmi[i]['rgst_ymd']);
            let bmi_vl = bmi[i]['bmi_vl']
            let tooltip = "<div>BMI Value: "+bmi_vl+"<hr/>"+bmi[i]['rgst_ymd']+"</div>"
            if(bmi.length==1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var second_date  = new Date(year , month, day+ 1);
              t.push([months[date[1]],'',tooltip,d,second_date])
            }else{
              t.push([months[date[1]],'',tooltip,d,d])
            }
          }
          setBmiChart(t)

          setBmiChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['bmi']
          }))
        }
        if(ki67.length>0){
          let t = ki67ChartData

          for (var i = 0; i < ki67.length; i++) {

            // let d = convertStrToDate(ki67[i]['imnl_read_ymd']);
            let d = convertStrToDate(ki67[i]['imnl_acpt_ymd']);
            let score = ki67[i]['ki67_score'].replace(/[^\d]/g,'');
            let tooltip = "<div>KI67: "+ki67[i]['ki67_score']+"<hr/>"+ki67[i]['imnl_acpt_ymd']+"</div>"
            if(ki67.length===1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var date  = new Date(year , month, day+ 1);
              t.push([score,'',tooltip,d,date])
              console.log('---->',t);
            }else{
              t.push([score,'',tooltip,d,d])
            }

          }
          let table_cols = [
            {
              name: 'Date',
              selector: row => row.imnl_acpt_ymd
            },
            {
              name: 'KI-67 % Value',
              selector: row => row.ki67_score
            },
          ]
          setKi67Chart(t)
          setKi67ChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['ki67']
          }))
        }
        if(ca15.length>0){
          let t = tableData

          for (var i = 0; i < ca15.length; i++) {

            let d = convertStrToDate(ca15[i]['exam_ymd']);
            let score = ca15[i]['exam_val'].replace(/[^\d]/g,'');
            let tooltip = "<div>exam_ymd: "+ca15[i]['exam_ymd']+"<hr/>"+ca15[i]['exam_val']+"</div>"
            if(ca15.length==1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var date  = new Date(year , month, day+ 1);
              t.push([score,'',tooltip,d,date])
            } else {
              t.push([score,'',tooltip,d,d])
            }

          }
          let table_cols = [
            {
              name: 'Date ',
              selector: row => row.exam_ymd
            },
            {
              name: 'CA15-2 Value',
              selector: row => row.exam_val
            },
          ]
          setCa15Chart(t)
          setCa15ChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['ca15']
          }))
        }

        if(cea.length>0){
          let t = tableData

          for (var i = 0; i < cea.length; i++) {

            let d = convertStrToDate(cea[i]['exam_ymd']);
            let score = cea[i]['exam_val'].replace(/[^\d]/g,'');
            let tooltip = "<div>exam_ymd: "+cea[i]['exam_ymd']+"<hr/>"+cea[i]['exam_val']+"</div>"
            if(cea.length==1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var date  = new Date(year , month, day+ 1);
              t.push([score,'',tooltip,d,date])
            } else {
              t.push([score,'',tooltip,d,d])
            }

          }
          let table_cols = [
            {
              name: 'Date ',
              selector: row => row.exam_ymd
            },
            {
              name: 'CEA Value',
              selector: row => row.exam_val
            },
          ]
          setCeaChart(t)
          setCeaChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['cea']
          }))
        }

        if(her2.length>0){
          let t = tableData

          for (var i = 0; i < her2.length; i++) {

            let d = convertStrToDate(her2[i]['exam_ymd']);
            // let score = cea[i]['exam_val'].replace(/[^\d]/g,'');
            let score = her2[i]['exam_val'].replace(/[^\d]/g,'');
            let tooltip = "<div>exam_ymd: "+her2[i]['exam_ymd']+"<hr/>"+her2[i]['exam_val']+"</div>"
            if(her2.length===1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var date  = new Date(year , month, day+ 1);
              t.push([score,'',tooltip,d,date])
            } else {
              t.push([score,'',tooltip,d,d])
            }

          }
          let table_cols = [
            {
              name: 'Date',
              selector: row => row.exam_ymd
            },
            {
              name: 'HER2 Value',
              selector: row => row.exam_val
            },
          ]
          setHer2Chart(t)
          setHer2ChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['her2']
          }))
        }


      }

    }else{
        // setShowGraphs(false)
    }
  }, [circosTimelieTableData])

  let navClass = "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"

  let activeNavClass = 'py-4 px-6 block hover:text-slate-50 focus:outline-none font-medium text-white  bg-main-blue '
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50">
      <div className="relative top-20 m-10 p-5 border shadow-lg rounded-md bg-white text-left ">
        <div className='overflow-y-scroll  oncoimages_height'>

          <div className="p-6">
            <nav className="flex flex-col sm:flex-row">
              <button onClick={e=>setTab('bmi')} className={((tab==='bmi')?activeNavClass:navClass)}>
                BMI
              </button>
              <button onClick={e=>setTab('ki67')} className = {((tab==='ki67')?activeNavClass:navClass)}>
                KI-67 (%)
              </button>
              <button onClick={e=>setTab('ca15')} className = {((tab==='ca15')?activeNavClass:navClass)}>
                CA15-2
              </button>
              <button onClick={e=>setTab('cea')} className = {((tab==='cea')?activeNavClass:navClass)}>
                CEA
              </button>
              <button onClick={e=>setTab('her2')} className = {((tab==='her2')?activeNavClass:navClass)}>
                HER2
              </button>
            </nav>
            <div className="grid tab-content  w-full col-span-4" id="tabs-tabContent">
              <div className={"py-6 tab-pane fade flex-inline "+" "+((tab==='bmi')?"show active":' hidden ')} id="tabs-bmi" >
                <h3>BMI Timeline</h3>
                <hr/>
                {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.bmi} yearKey="rgst_ymd" valueKey="bmi_vl" />}
                <div className='col-span-2'>
                  {bmiChart && <DataTable pagination
                    columns={bmiChartTable['columns']}
                    data={bmiChartTable['data']}
                  />}
                </div>

              </div>
              <div className={"py-6 tab-pane fade flex-inline "+" "+((tab==='ki67')?"show active":' hidden ')} id="tabs-ki67" >
                <h3>KI-67 % Timeline</h3>
                <hr/>
                {/* {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.ki67} yearKey="imnl_read_ymd" valueKey="ki67_score" />} */}
                {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.ki67} yearKey="imnl_acpt_ymd" valueKey="ki67_score" />}
                {ki67Chart && <DataTable pagination
                  columns={ki67ChartTable['columns']}
                  data={ki67ChartTable['data']}
                />}
              </div>
              <div className={"py-6 tab-pane fade flex-inline "+" "+((tab==='ca15')?"show active":' hidden ')} id="tabs-ca15">
                <h3>CA15-2 Timeline</h3>
                <hr/>
                {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.ca15} yearKey="exam_ymd" valueKey="exam_val" />}
                {ca15Chart && <DataTable pagination
                  columns={ca15ChartTable['columns']}
                  data={ca15ChartTable['data']}
                />}
              </div>
              <div className={"py-6 tab-pane fade flex-inline "+" "+((tab==='cea')?"show active":' hidden ')} id="tabs-cea">
                <h3>CEA Timeline</h3>
                <hr/>
                {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.cea} yearKey="exam_ymd" valueKey="exam_val" />}
                {ceaChart && <DataTable pagination
                  columns={ceaChartTable['columns']}
                  data={ceaChartTable['data']}
                />}
              </div>
              <div className={"py-6 tab-pane fade flex-inline "+" "+((tab==='her2')?"show active":' hidden ')} id="tabs-her2">
                <h3>HER2 Timeline</h3>
                <hr/>
                {circosTimelieTableData && <TimeLineChart data={circosTimelieTableData.her2} yearKey="exam_ymd" valueKey="exam_val" />}
                {ceaChart && <DataTable pagination
                  columns={her2ChartTable['columns']}
                  data={her2ChartTable['data']}
                />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            onClick={closeShowTimelineTables}
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            >
            Close
          </button>
        </div>
      </div>

    </div>
  );
}

export default GraphsModal;
