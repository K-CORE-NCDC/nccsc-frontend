import React,{useState,useEffect} from "react";
import {
  BeakerIcon
} from '@heroicons/react/outline'
// import ClinicalFileUpload from "./MainComponents/ClinicalFileUpload"
import ChildTabs from './ChildTabComponent'
import { useSelector, useDispatch } from "react-redux";

const Circos = (child_tab_data) => {
  return (
    <div>
      <ChildTabs type={"circos"} headers_data={child_tab_data['child_tab_data']}/>
    </div>
  );
};

export default Circos;



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
