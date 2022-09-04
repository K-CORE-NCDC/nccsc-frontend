import React from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ReactTooltip from 'react-tooltip';
function ReportSubHeader() {

  return (
    <>
      <div className='flex  w-full  border-b border-gray-200' style={{ "borderRight": '1px solid #6F7378' }}>

        <div style={{ minWidth: '20.3%', 'borderRight': '1px solid #6F7378' }} className=' px-5 py-8 text-center'>Cancer Major Genes
        </div>
        <div style={{ minWidth: '26.5%', 'borderRight': '1px solid #6F7378' }} className=' px-5 py-8 text-center  '>DNA Mutation
          <span>

            <QuestionMarkCircleIcon data-multiline={true} className="inline ml-2 mb-1"  data-class="my-tooltip" data-tip="Yes : if occured mutation is one of the following variant <br>  <br/>types - Missense mutation, Nonsense mutation, Splice site, <br>  <br/>In frame insertion, In frame deletion, Frame-shift insertion, Frame-shift deletion" style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon >
            <ReactTooltip   />
            
          </span>

        </div>
        <div style={{ minWidth: '26.5%', 'borderRight': '1px solid #6F7378' }} className=' px-5 py-8 text-center  '>RNA
          <span>

            <QuestionMarkCircleIcon data-multiline="true"   className='inline ml-2 mb-1' data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 " style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon>
            <ReactTooltip />
          </span>
        </div>
        <div style={{ minWidth: '26.5%', 'borderRight': '1px solid transparent' }} className=' px-5 py-8 text-center  '>Proteome
          <span>
          <QuestionMarkCircleIcon data-multiline="true"  className='inline ml-2 mb-1' data-tip="Proteome high : z-score ≥ 1.5,<br>  <br/>Proteome low : z-score ≤ 0.5" style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon>
            <ReactTooltip   />
          </span>
        </div>
      </div>
    </>
  )
}
export default ReportSubHeader