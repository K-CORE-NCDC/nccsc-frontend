import React from "react";
import {
  BeakerIcon
} from '@heroicons/react/outline'
// import ClinicalFileUpload from "./MainComponents/ClinicalFileUpload"
import Rna from './ChildComponents/rna';
import Methylation from './ChildComponents/methylation';
import Mutation from './ChildComponents/mutation';
import Proteome from './ChildComponents/proteome';

const ChildTabs = (headers_data) => {

  const [openTab, setOpenTab] = React.useState(1);
  let color = "blue"

  return (
    <div className="w-full">
      <div className="grid grid-cols-6">
         <div className="col-span-4 pl-11">
           <ul
             className="flex mb-0 list-none flex-wrap pt-8 pb-4 flex-row w-1/2 mr-8"
             role="tablist"
           >
             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
               <a
                 className={
                   "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                   (openTab === 1
                     ? "text-white bg-" + color + "-900"
                     : "text-" + "white" + "-600 bg-gray-400")
                 }
                 onClick={e => {
                   e.preventDefault();
                   setOpenTab(1);
                 }}
                 data-toggle="tab"
                 href="#link1"
                 role="tablist"
               >
                <i className="fas fa-cog text-base mr-1"></i>  RNA
               </a>
             </li>
             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
               <a
                 className={
                   "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                   (openTab === 2
                     ? "text-white bg-" + color + "-900"
                     : "text-" + "white" + "-600 bg-gray-400")
                 }
                 onClick={e => {
                   e.preventDefault();
                   setOpenTab(2);
                 }}
                 data-toggle="tab"
                 href="#link2"
                 role="tablist"
               >
                 <i className="fas fa-cog text-base mr-1"></i>  Methylation
               </a>
             </li>
             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
               <a
                 className={
                   "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                   (openTab === 3
                     ? "text-white bg-" + color + "-900"
                     : "text-" + "white" + "-600 bg-gray-400")
                 }
                 onClick={e => {
                   e.preventDefault();
                   setOpenTab(3);
                 }}
                 data-toggle="tab"
                 href="#link3"
                 role="tablist"
               >
                 <i className="fas fa-briefcase text-base mr-1"></i>  Global Proteome
               </a>
             </li>
             <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
               <a
                 className={
                   "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                   (openTab === 4
                     ? "text-white bg-" + color + "-900"
                     : "text-" + "white" + "-600 bg-gray-400")
                 }
                 onClick={e => {
                   e.preventDefault();
                   setOpenTab(4);
                 }}
                 data-toggle="tab"
                 href="#link4"
                 role="tablist"
               >
                 <i className="fas fa-briefcase text-base mr-1"></i> Mutation
               </a>
             </li>
           </ul>
         </div>
         <div className="pt-10 pr-11 col-span-2 ">
           <button class="bg-blue-900 float-right  hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            save images
           </button>
         </div>
         <div className="col-span-6 mt-4 pl-11 pr-11">
              <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                      <Rna data_={headers_data['headers_data']['rna']}/>
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <Methylation data_={headers_data['headers_data']['dna_methylation']}/>
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <Proteome data_={headers_data['headers_data']['proteome']}/>
                  </div>
                  <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                    <Mutation data_={headers_data['headers_data']['dna_mutation']}/>
                  </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ChildTabs;



// <div>
//   <div>
//     <div className="w-1/2">
//       <ul
//         className="flex mb-0 list-none flex-wrap pt-8 pb-4 flex-row"
//         role="tablist"
//       >
//         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
//           <a
//             className={
//               "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//               (openTab === 1
//                 ? "text-white bg-" + color + "-600"
//                 : "text-" + color + "-600 bg-white")
//             }
//             onClick={e => {
//               e.preventDefault();
//               setOpenTab(1);
//             }}
//             data-toggle="tab"
//             href="#link1"
//             role="tablist"
//           >
//             <BeakerIcon className="h-4 mb-1 w-4 inline"/> Clinical Information
//           </a>
//         </li>
//         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
//           <a
//             className={
//               "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//               (openTab === 2
//                 ? "text-white bg-" + color + "-600"
//                 : "text-" + color + "-600 bg-white")
//             }
//             onClick={e => {
//               e.preventDefault();
//               setOpenTab(2);
//             }}
//             data-toggle="tab"
//             href="#link2"
//             role="tablist"
//           >
//             <i className="fas fa-cog text-base mr-1"></i>  DNA
//           </a>
//         </li>
//         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
//           <a
//             className={
//               "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//               (openTab === 3
//                 ? "text-white bg-" + color + "-600"
//                 : "text-" + color + "-600 bg-white")
//             }
//             onClick={e => {
//               e.preventDefault();
//               setOpenTab(3);
//             }}
//             data-toggle="tab"
//             href="#link3"
//             role="tablist"
//           >
//             <i className="fas fa-briefcase text-base mr-1"></i>  RNA
//           </a>
//         </li>
//         <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
//           <a
//             className={
//               "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
//               (openTab === 4
//                 ? "text-white bg-" + color + "-600"
//                 : "text-" + color + "-600 bg-white")
//             }
//             onClick={e => {
//               e.preventDefault();
//               setOpenTab(4);
//             }}
//             data-toggle="tab"
//             href="#link4"
//             role="tablist"
//           >
//             <i className="fas fa-briefcase text-base mr-1"></i> Proteome
//           </a>
//         </li>
//       </ul>
//       <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//         <div className="px-4 py-5 flex-auto">
//           <div className="tab-content tab-space">
//             <div className={openTab === 1 ? "block" : "hidden"} id="link1">
//               1
//             </div>
//             <div className={openTab === 2 ? "block" : "hidden"} id="link2">
//               <p>
//                 2
//               </p>
//             </div>
//             <div className={openTab === 3 ? "block" : "hidden"} id="link3">
//               <p>
//                 3
//               </p>
//             </div>
//             <div className={openTab === 4 ? "block" : "hidden"} id="link4">
//               <p>
//                 4
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
