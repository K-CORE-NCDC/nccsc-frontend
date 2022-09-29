import React, { useState, useEffect, useRef, Fragment } from "react";
import childMenu from '../../../../menu-item'
import { Link } from 'react-router-dom';
import {
  MenuIcon,
  XIcon
} from '@heroicons/react/outline'

export default function DropdownMenu() {
  const [state, setState] = useState({ "menu": [] });
  const [openClass, setOpenClass] = useState(false);
  useEffect(() => {
    let items = childMenu.mainmenu.items


    let html = []
    for (var i = 0; i < items.length; i++) {
      // console.log("item is ", i);
      let htmlbutton = []
      htmlbutton.push(
        <Link key={'button_' + i}
          to={items[i].url}
          className="text-sm md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl group_box h-full font-bold  items-center w-full">
          <span className="px-5">{items[i].title}</span>
        </Link>
      )
      let children = items[i].children
      console.log("children are ", children);
      let tmp = []
      for (var j = 0; j < children.length; j++) {
        tmp.push(
          <li key={i + "_" + j} className='px-3 py-5'>
            <Link key={i + "link_" + j}
              className="text-3xl py-2 px-4 block whitespace-no-wrap"
              to={children[j].url}
            >{children[j].title}
            </Link>

            {children[j]['id'] === 'otherservice' &&
              <ul className="absolute hidden list-none text-center h-auto" style={{top:''}}>
                <li key={i + "_" + j} className='px-3 py-5'>
                  <Link key={i + "link_" + j} className="text-3xl py-2 px-4 block whitespace-no-wrap" to='/organoid'>
                    a1
                  </Link>
                </li>
                <li key={i+1 + "_" + j+1} className='px-3 py-5'>
                  <Link key={i + "link_" + j+1} className="text-3xl py-2 px-4 block whitespace-no-wrap" to='/qa'>
                    a1
                  </Link>
                </li>
              </ul>
            }

          </li >
        )
  // console.log("abcdfdfd",tmp[0]);
  // tmp[j].append()
  let innerchild = children[j].children
  console.log("inner child --------->", children[j]['id']);
  // console.log("inner child --------->",innerchild);

  // let innertmp = []
  // console.log("innerchild", innerchild);
  // for (var k = 0; k < innerchild.length; k++) {
  //   console.log("entered loop", children, "ssdsdsds", j);
  //   innertmp.push(
  //     <li key={i + "_" + j} className='px-3 py-5'>
  //       <Link key={i + "link_" + j}
  //         className="text-3xl py-2 px-4 block whitespace-no-wrap"
  //         to={children[j].url}
  //       >{children[j].title}
  //       </Link>
  //       <></>
  //     </li>
  //   )
  //   console.log("entered loop", children, "ssdsdsds", j);
  // }

  // console.log("tmp of j is", tmp[j]);

  // if(innertmp.length>0){
  //   tmp.push(
  //     <li className="group h-full table-cell relative " key={'li_'+i}>
  //       <ul className="absolute hidden list-none text-center h-auto" key={'ul_'+i}>
  //         {innertmp}
  //       </ul>
  //     </li>
  //   )
  // }

  // if (innertmp.length > 0) {
  //   tmp.push(
  //     <li className="group h-full table-cell relative " key={'li_' + i}>
  //       {innertmp}
  //     </li>
  //   )
  // }
  // console.log("tmp is", tmp);

}
if (tmp.length > 0) {
  html.push(
    <li className="group h-full table-cell relative " key={'li_' + i}>
      {htmlbutton}
      <ul className="absolute hidden list-none text-center h-auto" key={'ul_' + i}>
        {tmp}
      </ul>
    </li>
  )
} else {
  html.push(
    <li className="group h-full table-cell relative " key={'liul_' + i}>
      {htmlbutton}
      <ul className="absolute hidden list-none text-center h-auto" key={'ul_' + i}>

      </ul>
    </li>
  )
}

    }
console.log("html is", html);
// console.log("atlast menu is ----->", html);
setState((prevState) => ({
  ...prevState,
  'menu': html
}))
  }, [])

const openMenu = (e) => {
  var l = document.getElementById('mainHeader')
  if (l.classList.contains('openmenu')) {
    l.classList.remove("openmenu");
    setOpenClass(false)
  } else {
    l.classList.add('openmenu')
    setOpenClass(true)
  }
}

return (

  <ul className="dropdownHeader t" id='mainHeader'>
    <li className='group h-full table-cell relative cursor-pointer' onClick={e => openMenu(e)}>
      <a className='text-3xl group_box h-full font-bold items-center w-full' style={{ 'minWidth': '50px' }}>
        {!openClass && <MenuIcon className='w-6' />}
        {openClass && <XIcon className='w-6' />}
      </a>
    </li>
    {state['menu']}
  </ul>
)
}
