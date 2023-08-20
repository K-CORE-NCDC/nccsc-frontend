import React, { useState, useEffect } from 'react';
import childMenu from '../../../../menu-item';
import { Link } from 'react-router-dom';

export default function DropdownMenuMobile() {
  const [state, setState] = useState({ menu: [] });
  useEffect(() => {
    let items = childMenu.mainmenu.items;

    let html = [];
    for (var i = 0; i < items.length; i++) {
      let htmlbutton = [];
      htmlbutton.push(
        <Link
          key={'button_' + i}
          to={items[i].url}
          className="text-2xl group_box h-full font-bold  items-center w-full"
        >
          <span className="px-5">{items[i].title}</span>
        </Link>
      );
      let children = items[i].children;
      let tmp = [];
      for (var j = 0; j < children.length; j++) {
        tmp.push(
          <button
            key={i + '_' + j}
            className="flex justify-start space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full "
          >
            <Link
              key={i + 'link_' + j}
              className="text-2xl py-2 px-4 block whitespace-no-wrap"
              to={children[j].url}
            >
              {children[j].title}
            </Link>
          </button>
        );
      }
      if (tmp.length > 0) {
        html.push(
          <div
            key={'li_' + i}
            className="flex flex-col justify-start   px-6  w-full  border-b border-gray-800"
          >
            <button
              className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14 "
              key={'li_' + i}
            >
              <p className="leading-5  uppercase">{htmlbutton}</p>
            </button>
            <div id="menu1" className={`justify-start  flex-col w-full  items-start pb-1 `}>
              {tmp}
            </div>
          </div>
        );
      } else {
        html.push(
          <div
            key={'liul_' + i}
            className="mt-6 flex flex-col justify-start items-center  pl-4 w-full space-y-3 pb-5 border-b border-gray-800"
          >
            <button
              className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14 "
              key={'liul_' + i}
            >
              <p className="text-lg leading-5  uppercase">{htmlbutton}</p>
            </button>
          </div>
        );
      }
    }
    setState((prevState) => ({
      ...prevState,
      menu: html
    }));
  }, []);

  return (
    <div className="mt-6 flex flex-col justify-start items-center  w-full space-y-3 pb-5 mobile-menu-bg">
      {state['menu']}
    </div>
  );
}
