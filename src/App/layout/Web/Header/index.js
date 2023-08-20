import React from 'react';
import childMenu from '../../../../menu-item';
import Menu from './Menu';

export default function Header({ activeClassIndex }) {
  let menuContent = <Menu items={childMenu.social.items} activeClassIndex={activeClassIndex} />;
  return (
    <div className="inline-block">
      <ul
        className={`${
          activeClassIndex !== 0 ? 'ncc-black' : 'text-white'
        } flex flex-row list-none lg:ml-auto justify-end`}
      >
        {menuContent}
      </ul>
    </div>
  );
}
