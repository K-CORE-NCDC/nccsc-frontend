import React,{useState,useEffect,useRef } from "react";
import childMenu from '../../../../menu-item'
import Menu from './Menu'
import { useSelector, useDispatch } from "react-redux";

export default function DropdownMenu() {
  const [state, setState] = useState({"menu":[]});
  useEffect(()=>{
    let items = childMenu.mainmenu.items

    let html =[]
    for (var i = 0; i < items.length; i++) {

      let htmlbutton = []
      htmlbutton.push(

          <a key={'button_'+items[i]} href={items[i].url}
            className="text-3xl group_box h-full font-bold  items-center w-full"
          >
          <span className="px-5">{items[i].title}</span>

          </a>

      )
      let children = items[i].children
      let tmp = []
      for (var j = 0; j < children.length; j++) {
        tmp.push(
          <li key={"li_"+i+"_"+items[j].title+"_"+j} className='px-3 py-5'>
            <a
              className="text-3xl py-2 px-4 block whitespace-no-wrap"
              href={children[j].url}
              >{children[j].title}</a
            >
          </li>
        )
      }
      if(tmp.length>0){
        html.push(
          <li className="group h-full table-cell relative " key={items[i].id}>
            {htmlbutton}
            <ul className="absolute hidden list-none" key={'ul'+items[i].id}>
              {tmp}
            </ul>
          </li>
        )
      }else{
        html.push(
          <li className="group h-full table-cell relative px-3 py-5" key={items[i].id}>
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
