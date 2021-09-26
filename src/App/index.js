import React, { Suspense, useState } from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader/';
import { PrivateRoute } from './PrivateRoute';
import '../assets/css/style.css'
const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay: 60
});


export default function App() {
  const [blurScreenCss, setBlurScreenCss] = useState("")

  // document.addEventListener("keyup", function (e) {
  //   var keyCode = e.keyCode ? e.keyCode : e.which;
  //   if (keyCode == 44) {
  //     stopPrntScr();
  //   }
  // });

  // document.addEventListener("drag", function (e) {
  //   console.log(e);
  // });

  // function stopPrntScr() {

  //   var inpFld = document.createElement("input");
  //   inpFld.setAttribute("value", ".");
  //   inpFld.setAttribute("width", "0");
  //   inpFld.style.height = "0px";
  //   inpFld.style.width = "0px";
  //   inpFld.style.border = "0px";
  //   document.body.appendChild(inpFld);
  //   inpFld.select();
  //   document.execCommand("copy");
  //   inpFld.remove(inpFld);
  // }
  // function AccessClipboardData() {
  //   try {
  //     window.clipboardData.setData('text', "Access   Restricted");
  //   } catch (err) {
  //   }
  // }


  // window.addEventListener("focus", () => console.log('Has focus'))
  // window.addEventListener("focusout", () => console.log('focusout'))
  // window.addEventListener("blur", () => console.log('blur'))
  // window.addEventListener("keydown", (e) => {
  //   if (e.ctrlKey || e.keyCode == 44 || e.keyCode == 18 || e.keyCode == 91) {
  //     setBlurScreenCss('opacity-0')
  //   }
  // })
  // window.addEventListener("keyup", (e) => {
  //   if (e.ctrlKey || e.keyCode == 44 || e.keyCode == 18 || e.keyCode == 91) {
  //     setBlurScreenCss('opacity-0')
  //   }
  // })

  // setInterval(AccessClipboardData(), 300);


  return (
    <div className={blurScreenCss}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute exact path="*" component={Web} />
        </Switch>
      </Suspense>
    </div>
  )
}

// class App extends Component {
//   render(){
//
//     return (
//       <div>
//         <Suspense fallback={<Loader/>}>
//           <Switch>
//             <PrivateRoute exact path="*" component={Admin} />
//           </Switch>
//         </Suspense>
//       </div>
//     )
//
//   }
// }
// export default App;
