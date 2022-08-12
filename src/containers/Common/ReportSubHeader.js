import React,{ useState, useEffect} from 'react'
function ReportSubHeader(){
  return (
    <>
      <div className='flex  w-full  border-b border-gray-200' style={{"borderRight":'1px solid #6F7378'}}>
        <div style={{minWidth:'20.3%','borderRight':'1px solid #6F7378'}} className=' px-5 py-8 text-center'>Cancer Major Genes</div>
        <div style={{minWidth:'26.5%','borderRight':'1px solid #6F7378'}} className=' px-5 py-8 text-center  '>DNA Mutation</div>
        <div style={{minWidth:'26.5%','borderRight':'1px solid #6F7378'}} className=' px-5 py-8 text-center  '>RNA</div>
        <div style={{minWidth:'26.5%','borderRight':'1px solid transparent'}} className=' px-5 py-8 text-center  '>Proteome</div>
      </div>
    </>
  )
}
export default ReportSubHeader