import React from 'react'
import childMenu from '../../../../menu-item'
import Menu from './Menu'

export default function Header() {
  let menuContent = (
    <Menu items={childMenu.social.items}/>
  )
  return(
    <ul className="flex flex-row list-none lg:ml-auto justify-end text-white">
      {menuContent}
    </ul>
  )
}
