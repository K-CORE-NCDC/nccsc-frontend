import React,{ useState, useEffect} from 'react'
function ReportSubHeader(){
  return (
    <>
      <div className='grid grid-cols-4 w-full p-8 border border-gray-200'>
        <div className='text-left border-l border-gray-200'>Gene Name</div>
        <div className='text-left border-l border-gray-200'>Dna Mutation</div>
        <div className='text-left border-l border-gray-200'>Rna</div>
        <div className='text-left border-l border-gray-200'>Proteome</div>
      </div>
    </>
  )
}
export default ReportSubHeader