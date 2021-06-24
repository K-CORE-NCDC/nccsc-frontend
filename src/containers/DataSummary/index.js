import React,{useState,useEffect,useRef } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsIcon
} from '@heroicons/react/outline'
import { useSelector, useDispatch } from "react-redux";
import GenomicInfo from "./GenomicInformation"
import ClinicalInformation from "./ClinicalInformation"


export default function DataSummary() {

  const parentRef = useRef(null);

  const toggleTab = (event)=>{
    let tabsContainer = document.querySelector("#tabs");
    let tabTogglers = tabsContainer.querySelectorAll("a");
    tabTogglers.forEach(function(toggler) {
      toggler.addEventListener("click", function(e) {
        e.preventDefault();

        let tabName = this.getAttribute("href");

        let tabContents = document.querySelector("#tab-contents");

        for (let i = 0; i < tabContents.children.length; i++) {

          tabTogglers[i].parentElement.classList.remove("border-blue-400", "border-b",  "-mb-px", "opacity-100");  tabContents.children[i].classList.remove("hidden");
          if ("#" + tabContents.children[i].id === tabName) {
            continue;
          }
          tabContents.children[i].classList.add("hidden");

        }
        e.target.parentElement.classList.add("border-blue-400", "border-b-4", "-mb-px", "opacity-100");
      })
    })
  }



  return (
    <div className="header py-5">
      <section className="pt-5 relative pt-11 items-center  bg-cover bg-center bg-website-bg  justify-center">
        <nav className="bg-white px-8 pt-2 shadow-md">
          <ul id="tabs" className="inline-flex justify-center w-full px-1 pt-2 " onClick={toggleTab}>
            <li className="px-4 py-2  font-semibold rounded-t opacity-100 opacity-50 border-b-4 -mb-px border-blue-400">
              <a id="default-tab" href="#first" >Clinical Information</a>
            </li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50   "><a href="#second">Genomic Information</a></li>
            <li className="px-4 py-2 font-semibold  rounded-t opacity-50"><a href="#third">Advanced Information</a></li>
          </ul>
        </nav>

      </section>
      <section className="bg-website ">
        <div id="tab-contents">
          <div id="first" className=" p-4">
            <ClinicalInformation/>
          </div>
          <div id="second" className="hidden p-4">
            <GenomicInfo/>
          </div>
          <div id="third" className="hidden p-4">
            Third tab
          </div>

        </div>
      </section>
    </div>
  )
}
