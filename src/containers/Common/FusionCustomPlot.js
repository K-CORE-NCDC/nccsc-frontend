import React, { useState,useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFusionInformation,getGeneFusionInformation} from '../../actions/api_actions'
export default function FusionCustomPlot({ fusionId,parentCallback,width}) {
  const listRef = useRef();
  const dispatch = useDispatch()
  const fusionJson = useSelector((data) => data.dataVisualizationReducer.fusionData);
  const [loader, setLoader] = useState(false)
  const [html, setHtml] = useState([])
  const [leftTranscriptsHtml,setLeftTranscriptsHtml] = useState([])
  const [rightTranscriptsHtml,setRightTranscriptsHtml] = useState([])
  useEffect(()=>{
    if(fusionId){
      setLoader(true)
      let dataJson = {}
      dataJson['id'] = fusionId
      dispatch(getFusionInformation('POST', dataJson))
    }
  },[fusionId])

  useEffect(() => {
    if(fusionJson){
      // document.getElementById('fusionPlot').innerHTML=''
      let h = []
      let i = 0
      let z = 0
      for (const key in fusionJson['transcripts']) {
        let transcripts = fusionJson['transcripts'][key]
        let tmp = []
        for (let index = 0; index < transcripts.length; index++) {
          const element = transcripts[index];
          tmp.push(<option value={element}>{element}</option>)
        }
        console.log(tmp)
        if (z===0){
          setLeftTranscriptsHtml([tmp])
          z = z+1
        }else{
          setRightTranscriptsHtml([tmp])
        }
      }
      for (const key in fusionJson['exons']) {
        let r = fusionJson['exons'][key]
        let pos = fusionJson['pos'][key].split(':')
        let exon_pos = parseInt(pos[1])
        
        let htmlExons = []
        let htmlExons1 = []
        let htmlExons2 = []
        let f_w = 0
        let left_w = false
        let right_w = false
        let name = 'float-right justify-end'
        let gene_type = 'exon1 leftGene'
        let id = 'leftGene'
        if(i===1){
          name = 'float-left justify-start'
          gene_type = 'exon2 rightGene'
          right_w = true
          id = 'rightGene'
        }else{
          name = 'float-right justify-end'
          gene_type = 'exon1 leftGene'
          left_w = true
          id = 'leftGene'
        }
        let direction = 'right'
        
        for (let index = 0; index < r.length; index++) {
          
          const element = r[index];
          if(element.startCodon>element.endCodon){
            direction = 'right'
          }else{
            direction = 'left'
          }
          let w = element.endCodon-element.startCodon
          w = (w/r.length)
          if(w>500){
            w = 500
          }
          if(exon_pos==element.endCodon||exon_pos==element.startCodon){
            
            htmlExons.push(
              <div id={id}  key={index} style={{width:w+'px',marginRight:'5px',marginLeft:'5px',height:'80px',borderRight:'1px solid '+element.color}}>
                <div style={{backgroundColor:element.color,height:'20px',marginTop:'60px'}}>
                </div>
              </div>
            )
            if(left_w){
              f_w = f_w+w+20
            }
          }else{
            
            htmlExons.push(
              <div  key={index} style={{width:w+'px',backgroundColor:element.color,marginRight:'5px',marginLeft:'5px',height:'20px',borderRight:'1px solid '+element.color}}>
              </div>
            )
            htmlExons1.push(
              <div key={index} style={{width:w+'px',backgroundColor:element.color,marginRight:'5px',marginLeft:'5px',height:'20px',borderRight:'1px solid '+element.color}}>
              </div>
            )
            htmlExons2.push(
              <div key={index} style={{width:w+'px',backgroundColor:element.color,height:'20px',border:'1px solid #333'}}>
              </div>
            )

          }
        }
        
        
        h.push(
          <div key={key} className='grid w-full overflow-hidden' >  
            <h3>{key}</h3>
            <div id={'row_'+i} className={'grid_row flex justify-center items-end  mt-10 relative '+direction} style={{height:'100px',borderBottom:'1px solid '+fusionJson['exons'][key][0].color,borderColor:fusionJson['exons'][key][0].color}}>
              {htmlExons}   
              <div id={id+"1"} className={gene_type} style={{borderColor:fusionJson['exons'][key][0].color,width:f_w,position:'absolute'}}>
              </div>         
            </div>
            <div className={'grid_row flex  items-end  mt-10 relative '+name+" "+direction} style={{height:'60px',borderBottom:'1px solid '+fusionJson['exons'][key][0].color}}>
              {htmlExons1}            
            </div>
            <div className={'grid_row flex  items-end  mt-10 relative '+name+" "+direction} style={{height:'60px',borderBottom:'1px solid '+fusionJson['exons'][key][0].color}}>
              {htmlExons2}            
            </div>
            
          </div>
        )
        
        i=i+1
      }
      h.push(
        <div key='horizontalLine' className='absolute' style={{height:"210px",borderRight:'1px solid red',width:'1px',left:'50%',top:'51.5%'}}>
        </div>
      )
      setHtml(h)
      setLoader(false)
      
      
    }
  }, [fusionJson])

  return(
    <>
    <h3>GENE</h3>
    <div className="grid grid-cols-4 p-5 relative mb-20" >
      <div>
        Left Transcript Id
      </div>
      <div>
        <select>
          {leftTranscriptsHtml}
        </select>
      </div>
      <div>
        Right Transcript Id
      </div>
      <div>
        <select>
          {rightTranscriptsHtml}
        </select>
      </div>
    </div>
    <div className="grid grid-cols-2 p-5 relative mb-20" ref={listRef}>
      {html}
    </div>
    </>
  )

}