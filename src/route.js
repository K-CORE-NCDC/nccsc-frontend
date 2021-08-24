import React from 'react';

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/'));
const Login = React.lazy(() => import('./containers/Login/login'));
const Logout = React.lazy(() => import('./containers/Login/logout'))

const route = [
  { path: '/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary', exact: true, type:'unauth', name: 'DataSummary', component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: 'Home', component: DataVisualization },
  { path: '/userdata', exact: true, type:'unauth', name: 'Home', component: UserDataVisualization },
  { path: '/login', exact: true, type:'unauth', name: 'Login', component: Login },
  { path: '/logout', exact: true, type:'unauth', name: 'Logout', component: Logout }
  // { path: '/customanalysis', exact: true, type:'unauth', name: 'Home', component: Home },
]

export default route;
