import React,{useState,useEffect,useRef } from "react";
import childMenu from '../../../../menu-item'
import { Link } from 'react-router-dom';

export default function DropdownMenu() {
  const [state, setState] = useState({"menu":[]});
  useEffect(()=>{
    let items = childMenu.mainmenu.items

    let html =[]
    for (var i = 0; i < items.length; i++) {
      
      let htmlbutton = []
      htmlbutton.push(
          <Link key={'button_'+i} 
            to={items[i].url}
            className="text-3xl group_box h-full font-bold  items-center w-full">
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
            <ul className="absolute hidden list-none" key={'ul_'+i}>
              {tmp}
            </ul>
          </li>
        )
      }else{
        html.push(
          <li className="group h-full table-cell relative px-3 py-5" key={'liul_'+i}>
            {htmlbutton}
          </li>
        )
      }

    }
    setState((prevState)=>({
      ...prevState,
      'menu':html
    }))
  },[])

  return(
    <ul className="dropdownHeader">
      {state['menu']}
    </ul>
  )
}
