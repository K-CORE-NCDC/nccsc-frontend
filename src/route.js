import React from 'react';
import {FormattedMessage} from 'react-intl';

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/'));
const Login = React.lazy(() => import('./containers/Login/login'));
const Logout = React.lazy(() => import('./containers/Login/logout'))
const Terms = React.lazy(() => import('./containers/Signup/TermsOfUse'))
const Join = React.lazy(() => import('./containers/Signup/MemberShip'))
const Signup = React.lazy(() => import('./containers/Signup/'))

const Introduce = React.lazy(() => import('./containers/Home/introduce'))
const Pipeline = React.lazy(() => import('./containers/Home/pipeline'))
const DataApplication = React.lazy(() => import('./containers/DataApplication'))

const genefusion = React.lazy(() => import('./containers/Common/genefusion'))
const UserDataTable = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/projectDataTable'))

const route = [
  { path: '/home/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary/:tab?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataSummary" defaultMessage='Data Summary'/>, component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataVisualization" defaultMessage='DataVisualization'/>, component: DataVisualization },
  { path: '/userdata', exact: true, type:'unauth', name:<FormattedMessage  id = "Home" defaultMessage='Home'/> , childname:<FormattedMessage  id = "DataVisualization" defaultMessage='Visualize MyData'/>, component: UserDataVisualization },
  { path: '/introduce', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "BusinessIntroduce" defaultMessage='Business Introduction'/>, component: Introduce },
  { path: '/pipeline', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "Pipeline" defaultMessage='Pipeline'/>, component: Pipeline },
  { path: '/application', exact: true, type:'unauth',name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage  id = "DataApplication" defaultMessage='Data Application'/>,  component: DataApplication },
  { path: '/login', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Login" defaultMessage='Login'/>,  component: Login },
  { path: '/logout', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Logout" defaultMessage='Logout'/>, component: Logout },
  { path: '/term', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Terms'/>, component: Terms},
  { path: '/member', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Join'/>, component: Join},
  { path: '/signup', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Signup},
  { path: '/genefusion', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: genefusion},
  { path: '/user-data/:id', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: UserDataTable},

]

export default route;

// adding user data visualization
