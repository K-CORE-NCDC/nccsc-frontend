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
const TermsandConditions=React.lazy(()=> import('./containers/TermsAndPolicy/TermsAndConditionsIndex'))
const PrivacyPolicy=React.lazy(()=>import('./containers/TermsAndPolicy/PrivacyActIndex'))
const findID = React.lazy(()=>import('./containers/Login/FindID'))
const findPassword = React.lazy(()=>import('./containers/Login/FindPassword'))


const Introduce = React.lazy(() => import('./containers/Home/introduce'))
const Pipeline = React.lazy(() => import('./containers/Home/pipeline'))
const DataApplication = React.lazy(() => import('./containers/DataApplication'))

const Faq = React.lazy(() => import('./containers/CustomerVoice/Faq'))
const Notice = React.lazy(() => import('./containers/CustomerVoice/Notice'))
const Qa = React.lazy(() => import('./containers/CustomerVoice/QA'))


const genefusion = React.lazy(() => import('./containers/Common/genefusion'))
const UserDataTable = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/projectDataTable'))


const route = [
  { path: '/home/', exact: true, type:'unauth', name: 'Home', component: Home },
  { path: '/summary/:tab?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataSummary" defaultMessage='Data Summary'/>, component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataVisualization" defaultMessage='DataVisualization'/>, component: DataVisualization },
  { path: '/userdata/', exact: true, type:'unauth', name:<FormattedMessage  id = "Home" defaultMessage='Home'/> , childname:<FormattedMessage  id = "DataVisualization" defaultMessage='Visualize MyData'/>, component: UserDataVisualization },
  { path: '/introduce/', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "BusinessIntroduce" defaultMessage='Business Introduction'/>, component: Introduce },
  { path: '/pipeline/', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "Pipeline" defaultMessage='Pipeline'/>, component: Pipeline },
  { path: '/application/', exact: true, type:'unauth',name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage  id = "DataApplication" defaultMessage='Data Application'/>,  component: DataApplication },
  { path: '/login/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Login" defaultMessage='Login'/>,  component: Login },
  { path: '/logout/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Logout" defaultMessage='Logout'/>, component: Logout },
  { path: '/term/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Terms'/>, component: Terms},
  { path: '/member/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Join'/>, component: Join},
  { path: '/signup/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Signup},
  { path: '/genefusion/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: genefusion},
  { path: '/user-data/:id', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: UserDataTable},

  { path: '/faq/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Faq},
  { path: '/notice/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Notice},
  { path: '/qa/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Qa},
  { path: '/termsandconditions/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage id="TermsofService" defaultMessage="TermsofService" />, component: TermsandConditions},
  { path: '/privacypolicy/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="PrivacyPolicy" defaultMessage="PrivacyPolicy" />, component: PrivacyPolicy},
  { path: '/findid/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="" defaultMessage="" />, component: findID},
  { path: '/findpassword/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="" defaultMessage="" />, component: findPassword},

]

export default route;

// adding user data visualization
