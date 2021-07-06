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

          <button key={'button_'+items[i]}
            className="text-3xl group_box h-full font-bold  items-center w-full"
          >
          <span className="px-5">{items[i].title}</span>

          </button>

      )
      let children = items[i].children
      let tmp = []
      for (var j = 0; j < children.length; j++) {
        tmp.push(
          <li key={"li_"+i+"_"+items[i].title+"_"+j} className='px-3 py-5'>
            <a
              className="text-3xl py-2 px-4 block whitespace-no-wrap"
              href="#"
              >{children[j].title}</a
            >
          </li>
        )
      }
      if(tmp.length>0){
        html.push(
          <div className="group h-full table-cell relative " key={items[i].id}>
            {htmlbutton}
            <ul className="absolute hidden pt-1 list-none" key={'ul'+items[i].id}>
              {tmp}
            </ul>
          </div>
        )
      }else{
        html.push(
          <div className="group h-full table-cell relative " key={items[i].id}>
            {htmlbutton}

          </div>
        )
      }

    }
    setState((prevState)=>({
      ...prevState,
      'menu':html
    }))
  },[])

  return(
    <div className="dropdownHeader">
      {state['menu']}
    </div>
  )
}
