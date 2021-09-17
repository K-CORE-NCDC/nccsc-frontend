import React from 'react';

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/'));
const GenomiInfo = React.lazy(() => import('./containers/DataSummary/GenomicInformation'));
const AdvanceInfo = React.lazy(() => import('./containers/DataSummary/AdvanceAnalysis'));
const Login = React.lazy(() => import('./containers/Login/login'));
const Logout = React.lazy(() => import('./containers/Login/logout'))

const BoxPlot = React.lazy(() => import('./containers/Common/BoxPlot'))

const ScatterPlot = React.lazy(() => import('./containers/Common/ScatterPlot'))


const Igv = React.lazy(() => import('./containers/Common/igv'))
const Heatmap = React.lazy(() => import('./containers/Common/heatmapNew'))

const Box2 = React.lazy(() => import('./containers/Common/BoxPlot2'))

const Chord = React.lazy(() => import('./containers/Common/Chord'))

const Volcano = React.lazy(() => import('./containers/Common/ScatterVolcano'))
const route = [
  { path: '/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary/:tab?/', exact: true, type:'unauth', name: 'DataSummary', component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: 'Home', component: DataVisualization },
  { path: '/userdata', exact: true, type:'unauth', name: 'Home', component: UserDataVisualization },
  { path: '/login', exact: true, type:'unauth', name: 'Login', component: Login },
  { path: '/logout', exact: true, type:'unauth', name: 'Logout', component: Logout },
  { path: '/boxplot', exact: true, type:'unauth', name: 'boxplot', component: BoxPlot },
  { path: '/scatter', exact: true, type:'unauth', name: 'scatterplot', component: ScatterPlot },
  { path: '/igv', exact: true, type:'unauth', name: 'igv', component: Igv },
  { path: '/heatmap', exact: true, type:'unauth', name: 'igv', component: Heatmap},
  { path: '/box2', exact: true, type:'unauth', name: 'igv', component: Box2},

  { path: '/chord', exact: true, type:'unauth', name: 'igv', component: Chord},
  { path: '/volcano', exact: true, type:'unauth', name: 'igv', component: Volcano}
  // { path: '/customanalysis', exact: true, type:'unauth', name: 'Home', component: Home },
]

export default route;
