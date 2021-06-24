import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import Barchart from '../Common/Barchart';

// import BarChartComp from '../Common/HorizontalBarchart';
import BarChartComp from "../Common/HorizontalBarChart"
import Piechart from '../Common/Piechart'
import StackedBarChart from '../Common/StackedBarChart'
// import CircosCmp from '../Common/Circos'
import VennCmp from '../Common/Venn'
import VolcanoCmp from '../Common/Volcano'
// import { dispatch } from "d3-dispatch";
import { getGenomicInformation } from '../../actions/api_actions'


export default function GenomicInfo() {
  const dataSummary = useSelector(state => state)
  const summaryJson = useSelector((data) => data.homeReducer.genomicData);
  const [leftSide, setLeftSide] = useState({"charts":[],"leftSide":[]});
  const [activeChartsList, setActiveChartsList] = useState([]);
  const [activeCharts, setActiveCharts] = useState([]);
  const [selected, setSelected] = useState('');
  const [divWidth, setdivWidth] = useState('');
  const [divWidth1, setdivWidth1] = useState('');

  const parentRef = useRef(null);
  const parentRef1 = useRef(null);
  const dispatch = useDispatch()



  let a_ = [
        {
            "name": "De_novo_Start_InFrame",
            "cnt": 1
        },
        {
            "name": "Splice_Site",
            "cnt": 10
        },
        {
            "name": "Missense_Mutation",
            "cnt": 196
        },
        {
            "name": "Silent",
            "cnt": 60
        },
        {
            "name": "IGR",
            "cnt": 131
        },
        {
            "name": "Intron",
            "cnt": 306
        },
        {
            "name": "Nonsense_Mutation",
            "cnt": 10
        },
        {
            "name": "5'Flank",
            "cnt": 27
        },
        {
            "name": "Frame_Shift_Ins",
            "cnt": 4
        },
        {
            "name": "Nonstop_Mutation",
            "cnt": 2
        },
        {
            "name": "RNA",
            "cnt": 51
        },
        {
            "name": "In_Frame_Del",
            "cnt": 2
        },
        {
            "name": "Frame_Shift_Del",
            "cnt": 1
        },
        {
            "name": "5'UTR",
            "cnt": 34
        },
        {
            "name": "3'UTR",
            "cnt": 140
        },
        {
            "name": "lincRNA",
            "cnt": 25
        }
    ]

  useEffect(() => {
    dispatch(getGenomicInformation())
  }, [dispatch])

  return (
    <div className="header">
      <div className="grid grid-cols-3 gap-2">
        <div key={'chart_1'} className='max-w-sm bg-white rounded overflow-hidden shadow-lg'>
          <div class="px-6 py-4">
            <div class="font-bold text-md mb-2">Omics Sample Summary</div>
          </div>
          <div class="px-6 pt-4 pb-4">
            {false?<BarChartComp data={summaryJson['variant_classification']}/>:""}
          </div>
        </div>
        <div key={'chart_2'} className='max-w-sm bg-white rounded overflow-hidden shadow-lg'>
            <div class="px-6 py-4">
              <div class="font-bold text-md mb-2">Variant Classification</div>
            </div>
            <div class="px-6 pt-4 pb-4">
              {summaryJson?<BarChartComp data={summaryJson['variant_classification']}/>:""}
            </div>
        </div>
        <div key={'chart_3'} className='max-w-sm bg-white rounded overflow-hidden shadow-lg'>
            <div class="px-6 py-4">
              <div class="font-bold text-md mb-2">Variant Type</div>
            </div>
            <div class="px-6 pt-4 pb-4">
              {summaryJson?<BarChartComp data={summaryJson['variant_type']}/>:""}
            </div>
        </div>
      </div>
    </div>
  )
}
