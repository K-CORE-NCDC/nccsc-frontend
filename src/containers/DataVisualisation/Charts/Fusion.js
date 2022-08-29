import React, { useState, useEffect, Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import GroupFilters, { PreDefienedFilters } from "../../Common/FusionGroupFilter";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import FusionVennCmp from '../../Common/FusionVenn';
import {
  getClinicalMaxMinInfo,
  getFusionVennDaigram,
  
} from "../../../actions/api_actions";
// import Loader from "react-loader-spinner";
import LoaderCmp from "../../Common/Loader";
import FusionCustomPlot from '../../Common/FusionCustomPlot'
import { FormattedMessage } from "react-intl";
import DataTable from 'react-data-table-component';
import { selector } from "d3";
const selectedCss =
  "w-1/2 rounded-r-none  hover:scale-110 focus:outline-none flex  justify-center p-5 rounded font-bold cursor-pointer hover:bg-main-blue bg-main-blue text-white border duration-200 xs:text-sm sm:text-sm md:text-2xl md:text-2xl ease-in-out border-gray-600 transition";
const nonSelectedCss =
  "w-1/2 rounded-l-none  hover:scale-110 focus:outline-none flex justify-center p-5 rounded font-bold cursor-pointer hover:bg-teal-200 bg-teal-100 text-teal-700 border xs:text-sm sm:text-sm md:text-2xl md:text-2xl duration-200 ease-in-out border-teal-600 transition";

export default function FusionPlot({
  width,
  inputData,
  screenCapture,
  setToFalseAfterScreenCapture,
}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)
  const [smallScreen, setSmallScreen] = useState(false)
  const [sampleCount, setSampleCount] = useState({})
  const [userDefienedFilter, setUserDefienedFilter] = useState('static')
  const [groupFilters, setGroupFilters] = useState({})
  const [tableData, setTableData] = useState([])
  const [fusionId, setFusionId] = useState(0)
  const [groupName, setGroupName] = useState('')

  const clinicalMaxMinInfo = useSelector((data) => data.dataVisualizationReducer.clinicalMaxMinInfo);
  const VennData = useSelector((data) => data.dataVisualizationReducer.VennData);
  const circosSanpleRnidListData = useSelector((data) => data.dataVisualizationReducer.Keys);

  const tableColumnsData = [
    {
      name: 'Sample Name',
      selector: row => circosSanpleRnidListData[row.sample_id],
      sortable: true
    },
    {
      name: 'Left Gene Name',
      selector: row => row.left_gene_name,
      sortable: true
    },
    {
      name: 'Left Ensembl Id',
      selector: row => row.left_gene_ensmbl_id,
      sortable: true
    },
    {
      name: 'Left Breakpoint',
      cell:(row,index)=>{
        return row.left_gene_chr+":"+row.left_hg38_pos
      },
      sortable: true
    },
    {
      name: 'Right Gene Name',
      selector: row => row.right_gene_name,
      sortable: true
    },
    {
      name: 'Right Ensembl Id',
      selector: row => row.right_gene_ensmbl_id,
      sortable: true
    },
    {
      name: 'Right Breakpoint',
      cell:(row,index)=>{
        return row.right_gene_chr+":"+row.right_hg38_pos
      },
      sortable: true
    },
    {
      button:true,
      cell: (row,index,column,id) => {
        return <button onClick={(e)=>generateFusion(e,row.id)} id={row.id} className="bg-main-blue hover:bg-main-blue mb-3 w-50  text-md text-white mt-2 px-8 py-4 border border-blue-700 rounded">View</button>
      }
    }
  ]
  
  const generateFusion = (e,id)=>{
    setFusionId(id)
  }

  const updateGroupFilters = (filtersObject) => {
    if (filtersObject) {
      setGroupFilters(filtersObject)
    }
  }

  

  useEffect(() => {
    if (inputData) {
      if (inputData.type !== '' && Object.keys(groupFilters).length > 0) {
        setLoader(true)
        inputData['filterType'] = userDefienedFilter
        dispatch(getFusionVennDaigram('POST', { ...inputData, filterGroup: groupFilters }))
        
      }
    }
  }, [inputData, groupFilters])

  useEffect(()=>{
    if(!clinicalMaxMinInfo){
      dispatch(getClinicalMaxMinInfo('GET',{}))
    }
  },[])
  
  useEffect(()=>{
    if(VennData){
      if(VennData.status===200){
        setLoader(false)
      }
    }
  },[VennData])
  
  const getVennIds = (key) => {

    if(key){
      setFusionId(0)
      let name = key.split('_')
      let t = 'Unique'
      if(name.length>1){
        t = 'Core'
      }
      let tmp_name = name.join(' & ')
      tmp_name = tmp_name.replace(/g/g,'G')
      tmp_name = tmp_name.replace(/a/g,'A')
      tmp_name = tmp_name.replace(/b/g,'B')
      tmp_name = tmp_name.replace(/c/g,'C')
      tmp_name +=' : '+t+' Fusion Gene Table '
      setGroupName(tmp_name)
      let r = VennData.res.data
      setTableData(r[key])
    }

  }

  return (
    <>
      {loader ? (
        <LoaderCmp />
      ) : (
        <div className="flex flex-row justify-around">
          <div className={`lg:hidden md:hidden xs:ml-8`}>
            <button
              className="bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => setSmallScreen(!smallScreen)}
              type="button"
            >
              <AdjustmentsIcon className="h-6 w-6 inline" />
            </button>
          </div>
          <div id="filterBox"
            className={`lg:w-1/5 md:w-4/5 lg:block md:block lg:block sm:hidden ${
              smallScreen
                ? "xs:mr-80 xs:z-10 xs:opacity-95 xs:bg-white"
                : "xs:hidden"
            } `}
          >
            <div>
              {sampleCount && Object.keys(sampleCount).length > 0 && (
                <div className="m-1 p-1 border border-black border-dashed">
                  {Object.keys(sampleCount).map((e) => (
                    <div
                      key={e}
                      className="p-1 mt-1 bg-blue-100 rounded-full py-3 px-6 text-center text-blue"
                    >
                      Group {e} : {sampleCount[e]}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <h6 className="p-4 ml-1 text-left text-bold sm:text-xl lg:text-2xl text-blue-700"><FormattedMessage  id = "Choose Filter group" defaultMessage='Choose Filter group'/></h6>
            <div className="m-1 flex flex-row justify-around">
              <button onClick={() => {setUserDefienedFilter('static');setGroupFilters({})}}
                className={userDefienedFilter === 'static' ? selectedCss : nonSelectedCss}
              >
                <FormattedMessage  id = "Static_volcano" defaultMessage='Static'/>
              </button>
              <button onClick={() => {setUserDefienedFilter('dynamic');setGroupFilters({})}}
                className={userDefienedFilter === 'dynamic' ? selectedCss : nonSelectedCss}
              >
                <FormattedMessage  id = "Dynamic_volcano" defaultMessage='Dynamic'/>
              </button>
            </div>
            {(userDefienedFilter === 'static') && <PreDefienedFilters   viz_type='fusion' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
            {(userDefienedFilter === 'dynamic') && <GroupFilters  viz_type='fusion' parentCallback={updateGroupFilters} groupFilters={groupFilters} />}
          </div>
          <div className={`lg:w-4/5 md:w-4/5 sm:w-full lg:block ${smallScreen?" xs:absolute":"xs:w-full"}`} >
            {VennData && <FusionVennCmp parentCallback={getVennIds} VennData={VennData} width={width}/>}
            {fusionId!==0 && <div className='mt-5 my-0 mx-auto h-auto w-11/12 shadow-lg'>
              <FusionCustomPlot fusionId={fusionId}/></div>}
              {tableData.length > 0 &&
              <div>
                <div className="mt-20  w-11/12 mx-auto" style={{textAlign:'start', marginBottom: '-42px', lineHeight:'1.4',fontSize:'12px'}} >
                  <p>Fusion gene detected in at least 1 patient in a paitent group is counted.</p>
                 
                  <p>Core : Fusion genes found in both Group 1 and Group 2</p>
                  
                  <p>Unique : Fusion genes found in certain patient group.</p>
                </div>
                <div className='mt-20 my-0 mx-auto  w-11/12 shadow-lg'>
                  <div className="bg-white border-b border-gray-200 py-5 text-left px-5">{groupName}</div>
                  <DataTable pagination
                    columns={tableColumnsData}
                    data={tableData} />

                </div>

              </div>}
              
          </div>

        </div>
        
      )}
    </>
  );
}
