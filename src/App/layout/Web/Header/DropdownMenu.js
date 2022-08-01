import React,{useState,useEffect,useRef,Fragment } from "react";
import childMenu from '../../../../menu-item'
import { Link } from 'react-router-dom';
import {
  MenuIcon,
  XIcon
} from '@heroicons/react/outline'


export default function DropdownMenu() {
  const [state, setState] = useState({"menu":[]});
  const [openClass,setOpenClass] = useState(false);
  useEffect(()=>{
    let items = childMenu.mainmenu.items

    let html =[]
    for (var i = 0; i < items.length; i++) {
      
      let htmlbutton = []
      htmlbutton.push(
          <Link key={'button_'+i} 
            to={items[i].url}
            className="text-sm md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl group_box h-full font-bold  items-center w-full">
            <span className="px-5">{items[i].title}</span>
          </Link>
      )
      let children = items[i].children
      let tmp = []
      for (var j = 0; j < children.length; j++) {
        tmp.push(
          <li key={i+"_"+j} className='px-3 py-5'>
            <Link key={i+"link_"+j }
              className="text-3xl py-2 px-4 block whitespace-no-wrap"
              to={children[j].url}
              >{children[j].title}
            </Link>
          </li>
        )
      }
      if(tmp.length>0){
        html.push(
          <li className="group h-full table-cell relative " key={'li_'+i}>
            {htmlbutton}
            <ul className="absolute hidden list-none text-center h-auto" key={'ul_'+i}>
              {tmp}
            </ul>
          </li>
        )
      }else{
        html.push(
          <li className="group h-full table-cell relative " key={'liul_'+i}>
            {htmlbutton}
            <ul className="absolute hidden list-none text-center h-auto" key={'ul_'+i}>
              
            </ul>
          </li>
        )
      }

    }
    setState((prevState)=>({
      ...prevState,
      'menu':html
    }))
  },[])

  const openMenu = (e) => {
    var l = document.getElementById('mainHeader')
    if(l.classList.contains('openmenu')){
      l.classList.remove("openmenu");
      setOpenClass(false)
    }else{
      l.classList.add('openmenu')
      setOpenClass(true)
    }
  }

  return(

    <ul className="dropdownHeader t" id='mainHeader'>
      <li className='group h-full table-cell relative cursor-pointer' onClick={e=>openMenu(e)}>
        <a className='text-3xl group_box h-full font-bold items-center w-full' style={{'minWidth':'50px'}}>
          {!openClass && <MenuIcon className='w-6'/>}
          {openClass && <XIcon className='w-6'/>}
        </a>
      </li>
      {state['menu']}
    </ul>
  )
}
