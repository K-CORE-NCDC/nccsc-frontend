import React from 'react';

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
// const UserDataVisualization = React.lazy(() => import('./containers/Home/'));
const route = [
  { path: '/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary', exact: true, type:'unauth', name: 'DataSummary', component: DataSummary },
  { path: '/visualise', exact: true, type:'unauth', name: 'Home', component: DataVisualization },
  // { path: '/customanalysis', exact: true, type:'unauth', name: 'Home', component: Home },
]

export default route;
