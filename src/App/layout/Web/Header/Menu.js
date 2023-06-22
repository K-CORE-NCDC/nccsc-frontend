import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import {Context} from '../../../../wrapper'
import config from '../../../../config';
import { getCookie } from "../../../../containers/getCookie";
const SingleElem = ({elem}) =>{
  if (elem.url){
    return (
      <li className="flex mx-3 text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md ">
        <Link to={"#"+elem.id}  className="px-3 py-4 lg:py-2 flex  ">
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
    <li className="sidebar-dropdown" id={"multi_"+ind} onClick={addActiveClass} key={elem.title+'_li'}>
      <a href={"#"+elem.title}>
        <i className={elem.icon}></i>
        <span>{elem.title}</span>
      </a>
      <div className="text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 abc " id={"multisubmenu_"+ind}>

          {
            elem['children'].map((e,i)=>{
              return (
                <a key={e.title}
                href="#pablo"
                className=
                  "rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap "
                >
                {e.title}
              </a>
              )
            })
          }

      </div>
    </li>
  );
}

const Menu = ({items , activeClassIndex}) => {

  const item = items
  const m = item.map((ele,index)=>{
    if(ele.type==='item'){
      if(ele.type === 'item' && ele.id === 'signup' &&  getCookie('is_login')){
        return null;
      }
      return <SingleElem key={"single"+index} elem={ele}/>
    }else if (ele.type==='group') {
      return <MultipleElem key={"multiple"+index} elem={ele} ind={index} />
    }
    else if(ele.type === 'admin'){
      return <a key='admin_button' className="px-3 py-4 lg:py-2 flex text-base sm:text-sm md:text-md lg:text-base xl:text-xl  2xl:text-md" href={config['auth']+'login'} target='__blank'>Admin</a>
    }

    return ""
  })
  const context = useContext(Context);
  
  return <>
    {m}
  </>
}

export default Menu;
