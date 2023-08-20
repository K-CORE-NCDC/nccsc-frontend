import Menu from './Menu';
import childMenu from '../../../../menu-item';
export default function MobileHeader() {
  let menuContent = <Menu items={childMenu.social.items} />;
  return (
    <div className="flex flex-wrap justify-start items-center px-6 w-full text-white my-6">
      {menuContent}
    </div>
  );
}
