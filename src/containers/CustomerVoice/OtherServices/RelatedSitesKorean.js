import React from 'react'

function RelatedSites() {
  return (
<div className="container mx-auto p-4">
        <div className="grid grid-col-4">
          <div className="col-span-4">
              <h4 className="h-tit4_tit clear">
                  <font>
                    <font>관련 사이트</font>
                  </font>
              </h4>
          </div>
          <div className="col-span-4 h-8">
            <div className="grid grid-col-4">
              <div className="col-span-2">
              </div>
              <div className="col-span-2">
                <div class="flex float-right">
                </div>
              </div>
            </div>
          </div>
        </div>

    <table className=' table border border-black text-center mx-auto'>
  <tr className='border border-black text-center'>
    <th className='border border-black text-center' style={{width:'5rem'}}>번호.</th>
    <th className='border border-black text-center' style={{width:'70rem'}}>관련 사이트</th> 
    <th className='border border-black text-center'style={{width:'40rem'}}>링크</th>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center'>1</td>
    <td className='border border-black text-center'>cBioPortal (암유전체학 포털)</td>
    <td className='border border-black text-center'>https://www.cbioportal.org/</td>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center'>2</td>
    <td className='border border-black text-center'>COSMIC (체세포 돌연변이 카탈로그)</td>
    <td className='border border-black text-center'>https://cancer.sanger.ac.uk/cosmic</td>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center'>3</td>
    <td className='border border-black text-center'>GDC Data Portal (미국 국립암연구소)</td>
    <td className='border border-black text-center'>https://portal.gdc.cancer.gov/</td>
  </tr>
</table>
      </div>
  )
}

export default RelatedSites