import React from 'react'
import Menu from './Menu'
import Navigation from '../../../../menu-item';

export default function Header() {
  let menuContent = (
    <Menu items={Navigation.items}/>
  )
  return(
    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
      {menuContent}
    </ul>
  )
}
