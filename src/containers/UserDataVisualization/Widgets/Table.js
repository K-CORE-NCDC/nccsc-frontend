import React,{useState,useEffect,useRef} from "react";

// import '../../index.css'

// let sample = [
//   {
//     "TargetID": "cg00030074",
//     "brst_001-N": "0.944713835",
//     "brst_002-N": "0.952486047",
//     "brst_003-N": "0.952087602",
//     "brst_004-N": "0.957004884",
//     "brst_005-N": "0.95626809",
//     "Name": "cg00030074",
//     "AddressA_ID": "23720237",
//     "Genome_Build": "37",
//     "CHR": "17",
//     "Strand": "F",
//     "UCSC_RefGene_Name": "MAP2K4;MAP2K4",
//     "UCSC_RefGene_Accession": "NM_001281435;NM_003010",
//     "UCSC_CpG_Islands_Name": null,
//     "GencodeBasicV12_NAME": null,
//     "GencodeBasicV12_Accession": null,
//     "GencodeBasicV12_Group": null,
//     "GencodeCompV12_NAME": null,
//     "GencodeCompV12_Accession": null,
//     "GencodeCompV12_Group": null
//   },
//   {
//     "TargetID": "cg00039463",
//     "brst_001-N": "0.325102778",
//     "brst_002-N": "0.480282763",
//     "brst_003-N": "0.334290088",
//     "brst_004-N": "0.417668508",
//     "brst_005-N": "0.389301053",
//     "Name": "cg00039463",
//     "AddressA_ID": "24625948",
//     "Genome_Build": "37",
//     "CHR": "16",
//     "Strand": "R",
//     "UCSC_RefGene_Name": "CREBBP;CREBBP",
//     "UCSC_RefGene_Accession": "NM_004380;NM_001079846",
//     "UCSC_CpG_Islands_Name": "chr16:3930648-3931651",
//     "GencodeBasicV12_NAME": "CREBBP;CREBBP",
//     "GencodeBasicV12_Accession": "ENST00000323508.4;ENST00000262367.5",
//     "GencodeBasicV12_Group": "TSS1500;TSS1500",
//     "GencodeCompV12_NAME": "CREBBP;CREBBP",
//     "GencodeCompV12_Accession": "ENST00000323508.4;ENST00000262367.5",
//     "GencodeCompV12_Group": "TSS1500;TSS1500"
//   },
//   {
//     "TargetID": "cg00059930",
//     "brst_001-N": "0.655969306",
//     "brst_002-N": "0.686802245",
//     "brst_003-N": "0.768767227",
//     "brst_004-N": "0.687143785",
//     "brst_005-N": "0.699240482",
//     "Name": "cg00059930",
//     "AddressA_ID": "79625368",
//     "Genome_Build": "37",
//     "CHR": "13",
//     "Strand": "R",
//     "UCSC_RefGene_Name": "RB1",
//     "UCSC_RefGene_Accession": "NM_000321",
//     "UCSC_CpG_Islands_Name": "chr13:48892635-48893857",
//     "GencodeBasicV12_NAME": "",
//     "GencodeBasicV12_Accession": "",
//     "GencodeBasicV12_Group": "",
//     "GencodeCompV12_NAME": "RB1",
//     "GencodeCompV12_Accession": "ENST00000525036.1",
//     "GencodeCompV12_Group": "5'UTR"
//   },
//   {
//     "TargetID": "cg00073794",
//     "brst_001-N": "0.875916657",
//     "brst_002-N": "0.845148202",
//     "brst_003-N": "0.833953998",
//     "brst_004-N": "0.813880763",
//     "brst_005-N": "0.806287932",
//     "Name": "cg00073794",
//     "AddressA_ID": "69785954",
//     "Genome_Build": "37",
//     "CHR": "2",
//     "Strand": "R",
//     "UCSC_RefGene_Name": "ALK",
//     "UCSC_RefGene_Accession": "NM_004304",
//     "UCSC_CpG_Islands_Name": null,
//     "GencodeBasicV12_NAME": null,
//     "GencodeBasicV12_Accession": null,
//     "GencodeBasicV12_Group": null,
//     "GencodeCompV12_NAME": null,
//     "GencodeCompV12_Accession": null,
//     "GencodeCompV12_Group": null
//   },
//   {
//     "TargetID": "cg00098799",
//     "brst_001-N": "0.366050385",
//     "brst_002-N": "0.416796951",
//     "brst_003-N": "0.385545659",
//     "brst_004-N": "0.38610536",
//     "brst_005-N": "0.44456069",
//     "Name": "cg00098799",
//     "AddressA_ID": "19718252",
//     "Genome_Build": "37",
//     "CHR": "15",
//     "Strand": "F",
//     "UCSC_RefGene_Name": "IGF1R",
//     "UCSC_RefGene_Accession": "NM_000875",
//     "UCSC_CpG_Islands_Name": "",
//     "GencodeBasicV12_NAME": "",
//     "GencodeBasicV12_Accession": "",
//     "GencodeBasicV12_Group": "",
//     "GencodeCompV12_NAME": "IGF1R;IGF1R;IGF1R;IGF1R",
//     "GencodeCompV12_Accession": "ENST00000560186.1;ENST00000560277.1;ENST00000559925.1;ENST00000557938.1",
//     "GencodeCompV12_Group": "5'UTR;5'UTR;5'UTR;5'UTR"
//   },
//   {
//     "TargetID": "cg00105080",
//     "brst_001-N": "0.79420312",
//     "brst_002-N": "0.817041399",
//     "brst_003-N": "0.781102683",
//     "brst_004-N": "0.874461862",
//     "brst_005-N": "0.776976386",
//     "Name": "cg00105080",
//     "AddressA_ID": "66708166",
//     "Genome_Build": "37",
//     "CHR": "15",
//     "Strand": "R",
//     "UCSC_RefGene_Name": "IGF1R;IGF1R",
//     "UCSC_RefGene_Accession": "NM_000875;NM_001291858",
//     "UCSC_CpG_Islands_Name": "",
//     "GencodeBasicV12_NAME": "",
//     "GencodeBasicV12_Accession": "",
//     "GencodeBasicV12_Group": "",
//     "GencodeCompV12_NAME": "IGF1R;IGF1R",
//     "GencodeCompV12_Accession": "ENST00000557938.1;ENST00000559925.1",
//     "GencodeCompV12_Group": "TSS1500;5'UTR"
//   },
//   {
//     "TargetID": "cg00163372",
//     "brst_001-N": "0.3502488",
//     "brst_002-N": "0.743045578",
//     "brst_003-N": "0.486985014",
//     "brst_004-N": "0.68016216",
//     "brst_005-N": "0.617790857",
//     "Name": "cg00163372",
//     "AddressA_ID": "20774886",
//     "Genome_Build": "37",
//     "CHR": "8",
//     "Strand": "F",
//     "UCSC_RefGene_Name": "MYC",
//     "UCSC_RefGene_Accession": "NM_002467",
//     "UCSC_CpG_Islands_Name": "chr8:128747805-128751279",
//     "GencodeBasicV12_NAME": null,
//     "GencodeBasicV12_Accession": null,
//     "GencodeBasicV12_Group": null,
//     "GencodeCompV12_NAME": null,
//     "GencodeCompV12_Accession": null,
//     "GencodeCompV12_Group": null
//   },
//   {
//     "TargetID": "cg00164720",
//     "brst_001-N": "0.974647997",
//     "brst_002-N": "0.968349154",
//     "brst_003-N": "0.971422473",
//     "brst_004-N": "0.973362917",
//     "brst_005-N": "0.976084221",
//     "Name": "cg00164720",
//     "AddressA_ID": "1750467",
//     "Genome_Build": "37",
//     "CHR": "10",
//     "Strand": "F",
//     "UCSC_RefGene_Name": "PTEN;PTEN;PTEN",
//     "UCSC_RefGene_Accession": "NM_001304718;NM_001304717;NM_000314",
//     "UCSC_CpG_Islands_Name": "",
//     "GencodeBasicV12_NAME": "PTEN",
//     "GencodeBasicV12_Accession": "ENST00000472832.1",
//     "GencodeBasicV12_Group": "TSS1500",
//     "GencodeCompV12_NAME": "PTEN",
//     "GencodeCompV12_Accession": "ENST00000472832.1",
//     "GencodeCompV12_Group": "TSS1500"
//   },
//   {
//     "TargetID": "cg00169856",
//     "brst_001-N": "0.335790338",
//     "brst_002-N": "0.397538653",
//     "brst_003-N": "0.363897187",
//     "brst_004-N": "0.440237463",
//     "brst_005-N": "0.330830982",
//     "Name": "cg00169856",
//     "AddressA_ID": "22722586",
//     "Genome_Build": "37",
//     "CHR": "15",
//     "Strand": "F",
//     "UCSC_RefGene_Name": "IGF1R;IGF1R",
//     "UCSC_RefGene_Accession": "NM_000875;NM_001291858",
//     "UCSC_CpG_Islands_Name": "",
//     "GencodeBasicV12_NAME": "",
//     "GencodeBasicV12_Accession": "",
//     "GencodeBasicV12_Group": "",
//     "GencodeCompV12_NAME": "IGF1R;IGF1R",
//     "GencodeCompV12_Accession": "ENST00000559925.1;ENST00000557938.1",
//     "GencodeCompV12_Group": "5'UTR;5'UTR"
//   },
//   {
//     "TargetID": "cg00242443",
//     "brst_001-N": "0.928853104",
//     "brst_002-N": "0.914354774",
//     "brst_003-N": "0.774137335",
//     "brst_004-N": "0.920443041",
//     "brst_005-N": "0.898502681",
//     "Name": "cg00242443",
//     "AddressA_ID": "69616268",
//     "Genome_Build": "37",
//     "CHR": "15",
//     "Strand": "R",
//     "UCSC_RefGene_Name": "ARID3B;ARID3B",
//     "UCSC_RefGene_Accession": "NM_001307939;NM_006465",
//     "UCSC_CpG_Islands_Name": "",
//     "GencodeBasicV12_NAME": "ARID3B",
//     "GencodeBasicV12_Accession": "ENST00000563567.1",
//     "GencodeBasicV12_Group": "TSS1500",
//     "GencodeCompV12_NAME": "ARID3B",
//     "GencodeCompV12_Accession": "ENST00000563567.1",
//     "GencodeCompV12_Group": "TSS1500"
//   }
// ]

export default function Table(data_) {
  const [state,setState] = useState([])
  // const [table_header,setTableHeader]
  let table_header = []
  let table_data = []

  function parse_clinical_data(d_){
    console.log(typeof d_)
    // let a = JSON.parse(d_, (key, value) =>
    //   typeof value === "number" ? Math.round(value * 100) / 100 : value
    // );
    // console.log(a)
  }

  function create_text_table_data(d_){
    let first = false
    for(var k in d_){
      let obj_ = d_[k]
      if(!first){
        let temp = []
        Object.keys(obj_).forEach((key, index) => {
          table_header.push(
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {key}
            </th>
          )
          temp.push(
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {obj_[key]}
            </td>
          )
        });
        table_data.push(
          <tr>
            {temp}
          </tr>
        )
        first = true
      }else{
        let temp = []
        Object.keys(obj_).forEach((key, index) => {
          temp.push(
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {obj_[key]}
            </td>
          )
        });
        table_data.push(
          <tr>
            {temp}
          </tr>
        )
      }
    }
  }

  if(data_){
    Object.keys(data_['data_']).forEach((key, value)=>{
        if(key === "clinical"){
            parse_clinical_data(data_['data_'][key])
        }
        else{
            create_text_table_data(data_['data_'][key])
        }
    })
  }

  return (
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  {table_header}
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  {table_data}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}



// <div class="flex flex-col">
//   <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//   <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//   <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//     <table class="min-w-full divide-y divide-gray-200">
//       <thead class="bg-gray-50">
//         <tr>
//           <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Name
//           </th>
//           <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Title
//           </th>
//           <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Status
//           </th>
//           <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Role
//           </th>
//           <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Role
//           </th>
//           <th scope="col" class="relative px-6 py-3">
//             <span class="sr-only">Edit</span>
//           </th>
//         </tr>
//       </thead>
//       <tbody class="bg-white divide-y divide-gray-200">
//         <tr>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <div class="flex items-center">
//               <div class="flex-shrink-0 h-10 w-10">
//                 <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt=""/>
//               </div>
//               <div class="ml-4">
//                 <div class="text-sm font-medium text-gray-900">
//                   Jane Cooper
//                 </div>
//                 <div class="text-sm text-gray-500">
//                   jane.cooper@example.com
//                 </div>
//               </div>
//             </div>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
//             <div class="text-sm text-gray-500">Optimization</div>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//               Active
//             </span>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//             Admin
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//             <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
//           </td>
//         </tr>
//         <tr>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <div class="flex items-center">
//               <div class="flex-shrink-0 h-10 w-10">
//                 <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt=""/>
//               </div>
//               <div class="ml-4">
//                 <div class="text-sm font-medium text-gray-900">
//                   Jane Cooper
//                 </div>
//                 <div class="text-sm text-gray-500">
//                   jane.cooper@example.com
//                 </div>
//               </div>
//             </div>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
//             <div class="text-sm text-gray-500">Optimization</div>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap">
//             <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//               Active
//             </span>
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//             Admin
//           </td>
//           <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//             <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </div>
// </div>
//   </div>
// </div>
