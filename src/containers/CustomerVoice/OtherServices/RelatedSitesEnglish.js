import React from 'react'

function RelatedSites() {
  return (
<div className="container mx-auto p-4">
        <div className="grid grid-col-4">
          <div className="col-span-4">
            <section className="intro_wrap_organoid">
        <h1
          className="m-5 text-4xl font-bold my-5"
          style={{ marginLeft: "-5px" }}
        >
        Related Sites
        </h1>
      </section>
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

    <table className=' table border border-black text-center mx-auto' style={{margin:'10px'}}>
  <tr className='border border-black text-center py-10'>
    <th className='border border-black text-center p-12' style={{width:'5rem'}}>No.</th>
    <th className='border border-black text-center' style={{width:'70rem'}}>Related Sites</th> 
    <th className='border border-black text-center'style={{width:'40rem'}}>Link</th>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center p-8'>1</td>
    <td className='border border-black text-center'>cBioPortal for cancer genomics</td>
    <td className='border border-black text-center'>https://www.cbioportal.org/</td>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center p-8'>2</td>
    <td className='border border-black text-center'>COSMIC the Catalogue Of Somatic Mutations In Cancer</td>
    <td className='border border-black text-center'>https://cancer.sanger.ac.uk/cosmic</td>
  </tr>
  <tr className='border border-black text-center'>
    <td className='border border-black text-center p-8'>3</td>
    <td className='border border-black text-center'>GDC Data Portal of National Cancer Institute (US)</td>
    <td className='border border-black text-center'>https://portal.gdc.cancer.gov/</td>
  </tr>
</table>
      </div>
  )
}

export default RelatedSites