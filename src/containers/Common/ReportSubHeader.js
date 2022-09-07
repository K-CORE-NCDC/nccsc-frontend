import React, { useEffect,useState } from 'react'
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ReactTooltip from 'react-tooltip';

function ReportSubHeader({tData}) {

  const [sm,setSm] = useState(0)
  const [md,setMd] = useState(0)
  const [width,setWidth] = useState(0)
  useEffect(()=>{
    if(tData!==undefined){
      let w=0,s=0,m=0
      if(document.getElementsByClassName('rdt_TableRow')){
        let row = document.getElementsByClassName('rdt_TableRow')[0]
        if(row && row.childNodes){
          let r = row.childNodes
          for (let index = 0; index < r.length; index++) {
            const element = r[index];
            if (index===0){
              // eslint-disable-next-line react-hooks/exhaustive-deps
              s = element.offsetWidth
              w = w+s
            }else{
              // eslint-disable-next-line react-hooks/exhaustive-deps
              m = element.offsetWidth
              w = w+m
            }
          }
        }
      }
      console.log(w)
      setSm(s)
      setMd(m)
      setWidth(w)
    }
    
  },[tData,sm,md])
  

  return (
    <>
      {width && sm && md && 
      <div className='flex  w-full  border-b border-gray-200' style={{ "borderRight": '1px solid #6F7378',minWidth:width+'px' }}>

        <div style={{ minWidth: (sm+md+2)+'px', 'borderRight': '1px solid #6F7378','borderLeft': '1px solid #fff' }} className=' px-5 py-8 text-center'>Cancer Major Genes
        </div>
        <div style={{ minWidth: (md*2)+1+"px", 'borderRight': '1px solid #6F7378','borderLeft': '1px solid #fff' }} className=' px-5 py-8 text-center  '>DNA Mutation
          <span>

            <QuestionMarkCircleIcon data-multiline={true} className="inline ml-2 mb-1"  data-class="my-tooltip" data-tip="Yes : if occured mutation is one of the following variant <br>  <br/>types - Missense mutation, Nonsense mutation, Splice site, <br>  <br/>In frame insertion, In frame deletion, Frame-shift insertion, Frame-shift deletion" style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon >
            <ReactTooltip   />
            
          </span>

        </div>
        <div style={{ minWidth: (md*3)+1+"px", 'borderRight': '1px solid #6F7378','borderLeft': '1px solid #fff' }} className=' px-5 py-8 text-center  '>RNA
          <span>

            <QuestionMarkCircleIcon data-multiline="true"   className='inline ml-2 mb-1' data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 " style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon>
            <ReactTooltip />
          </span>
        </div>
        <div style={{ minWidth: (md*3)+1+"px", 'borderRight': '1px solid transparent','borderLeft': '1px solid #fff' }} className=' px-5 py-8 text-center  '>Proteome
          <span>
          <QuestionMarkCircleIcon data-multiline="true"  className='inline ml-2 mb-1' data-tip="Proteome high : z-score ≥ 1.5,<br>  <br/>Proteome low : z-score ≤ 0.5" style={{ width: '20px' , cursor:'pointer' }}>
            </QuestionMarkCircleIcon>
            <ReactTooltip   />
          </span>
        </div>
      </div>
      }
    </>
  )
}
export default ReportSubHeader