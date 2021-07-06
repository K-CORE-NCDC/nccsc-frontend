import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'

const SingleElem = ({elem}) =>{
  if (elem.url){
    return (
      <li className="flex mx-3">
        <Link to={elem.url}  className="px-3 py-4 lg:py-2 flex  ">
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
      <div className="text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1" id={"multisubmenu_"+ind}>

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
  return <>
    {m}
    <div className="relative inline-flex">
      <svg className="w-5 h-5 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
        <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#fff" fillRule="nonzero"/>
      </svg>
      <select className="border border-white rounded bg-transparent text-white h-15 pl-5 pr-10 focus:tex-black active:tex-black hover:border-gray-400 focus:outline-none appearance-none">
        <option>Korea</option>
        <option value='English'>English</option>
      </select>
    </div>
  </>
}

export default Menu;
