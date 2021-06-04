import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'

const SingleElem = ({elem}) =>{
  if (elem.url){
    return (
      <li className="flex items-center">
        <Link to={elem.url}  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
          {elem.icon && <i  className={elem.icon}></i>}
          <span>{elem.title}</span>
        </Link>
      </li>
    );
  }else{
    return (<li className="header-menu">
      <p>
        <span>{elem.title}</span>
      </p>
    </li>)
  }
}

const addActiveClass = (e)=> {
  var id = e.currentTarget.id.split('_')
  var element = document.getElementById(e.currentTarget.id);
  element.classList.toggle("active");
  var elem = document.getElementById("multisubmenu_"+id[1]);
  elem.classList.toggle("d-block");

}

const MultipleElem = ({elem,ind}) =>{

  return (
    <li className="sidebar-dropdown" id={"multi_"+ind} onClick={addActiveClass}>
      <a href={"#"+elem.title}>
        <i className={elem.icon}></i>
        <span>{elem.title}</span>
      </a>
      <div className="sidebar-submenu" id={"multisubmenu_"+ind}>
        <ul>
          {
            elem['children'].map((e,i)=>{
              return <SingleElem key={"single_multi"+i} elem={e}/>
            })
          }
        </ul>
      </div>
    </li>
  );
}

const Menu = ({items}) => {



  const item = items
  const m = item.map((ele,index)=>{
    if(ele.type==='item'){
      return <SingleElem key={"single"+index} elem={ele}/>
    }else if (ele.type==='group') {
      return <MultipleElem key={"multiple"+index} elem={ele} ind={index} />
    }
    return ""
  })
  return <>{m}</>
}

export default Menu;
