import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import DataTable from 'react-data-table-component';


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
  const [bmiChartTable, setBmiChartTable] = useState({"columns":[],'data':[]})
  const [ki67ChartTable,setKi67ChartTable] = useState({"columns":[],'data':[]})
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
        { type: 'string', label:'BMI Value' },
        { type: 'string', label:'Date' },
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
        if(bmi.length>0){
          let t = ChartData
          let table_cols = [
            {
              name: 'Bmi Value',
              selector: row => row.bmi_vl
            },
            {
              name: 'Date',
              selector: row => row.rgst_ymd
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

            let d = convertStrToDate(ki67[i]['imnl_read_ymd']);
            let score = ki67[i]['ki67_score'].replace(/[^\d]/g,'');
            let tooltip = "<div>KI67: "+ki67[i]['ki67_score']+"<hr/>"+ki67[i]['imnl_read_ymd']+"</div>"
            if(ki67.length==1){
              var year  = new Date(d).getFullYear();
              var month = new Date(d).getMonth();
              var day   = new Date(d).getDate();
              var date  = new Date(year , month, day+ 1);
              t.push([score,'',tooltip,d,date])
            }else{
              t.push([score,'',tooltip,d,d])
            }

          }
          let table_cols = [
            {
              name: 'KI67 Value',
              selector: row => row.ki67_score
            },
            {
              name: 'Date',
              selector: row => row.imnl_read_ymd
            },
          ]
          setKi67Chart(t)
          setKi67ChartTable((prevState) => ({
            ...prevState,
            'columns':table_cols,
            'data':circosTimelieTableData['ki67']
          }))
        }
      }

    }else{
        // setShowGraphs(false)
    }
  }, [circosTimelieTableData])

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50">
      <div className="relative top-20 m-10 p-5 border shadow-lg rounded-md bg-white text-left ">
        <div className='overflow-y-scroll  oncoimages_height'>

          <div className="grid grid-cols-4 gaps-6 p-6">
            <div className='col-span-4'>
              <h3>BMI Timeline</h3>
              <hr/>
              {bmiChart && <Chart
                height={"300px"}

                chartType="Timeline"
                loader={<div>Loading Chart</div>}
                data={bmiChart}
                options={{
                  showRowNumber: true,
                  allowHtml: true,
                }}
                rootProps={{ 'data-testid': '1' }}
              />}
            </div>
            <div className='col-span-4'>
              <h3>KI67 Timeline</h3>
              <hr/>
              {ki67Chart && <Chart
                height={'300px'}
                chartType="Timeline"
                loader={<div>Loading Chart</div>}
                data={ki67Chart}
                options={{
                  showRowNumber: true,
                  allowHtml: true,
                }}
                rootProps={{ 'data-testid': '1' }}
              />}
            </div>

            <div className='col-span-2'>
              {bmiChart && <DataTable pagination
                columns={bmiChartTable['columns']}
                data={bmiChartTable['data']}
              />}
            </div>
            <div className='col-start-3 col-span-2'>
              {ki67Chart && <DataTable pagination
                columns={ki67ChartTable['columns']}
                data={ki67ChartTable['data']}
              />}
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
