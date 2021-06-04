import React, { Suspense  } from 'react';
import { Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader/';
import {PrivateRoute} from './PrivateRoute';
const Web = Loadable({
  loader: () => import('./layout/Web'),
  loading: Loader,
  delay:60
});


export default function App() {

  return (
    <div>
      <Suspense fallback={<Loader/>}>
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
