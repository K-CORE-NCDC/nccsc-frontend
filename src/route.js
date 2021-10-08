import React from 'react';

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/'));
const Login = React.lazy(() => import('./containers/Login/login'));
const Logout = React.lazy(() => import('./containers/Login/logout'))
const Terms = React.lazy(() => import('./containers/Signup/TermsOfUse'))
const Join = React.lazy(() => import('./containers/Signup/MemberShip'))
const Signup = React.lazy(() => import('./containers/Signup/'))
const VolcanoPlotD3 = React.lazy(() => import('./containers/Common/VolcanoD3'))
const TimeLineChart = React.lazy(() => import('./containers/Common/timelineCss'))

const Survival = React.lazy(() => import('./containers/Common/test_scatter_data'))

const route = [
  { path: '/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary/:tab?/', exact: true, type:'unauth', name: 'DataSummary', component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: 'Home', component: DataVisualization },
  { path: '/userdata', exact: true, type:'unauth', name: 'Home', component: UserDataVisualization },
  { path: '/login', exact: true, type:'unauth', name: 'Login', component: Login },
  { path: '/logout', exact: true, type:'unauth', name: 'Logout', component: Logout },
  { path: '/term', exact: true, type:'unauth', name: 'igv', component: Terms},
  { path: '/member', exact: true, type:'unauth', name: 'igv', component: Join},
  { path: '/signup', exact: true, type:'unauth', name: 'igv', component: Signup},
  { path: '/volcano', exact: true, type:'unauth', name: 'igv', component: VolcanoPlotD3},
  { path: '/timeline', exact: true, type:'unauth', name: 'igv', component: TimeLineChart},
  { path: '/survival', exact: true, type:'unauth', name: 'igv', component: Survival},
  
]

export default route;
