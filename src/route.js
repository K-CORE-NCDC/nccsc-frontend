import React from 'react';
import {FormattedMessage} from 'react-intl';
import { useParams } from "react-router-dom";

const Home = React.lazy(() => import('./containers/Home/'));
const DataSummary = React.lazy(() => import('./containers/DataSummary/'));
const Login = React.lazy(() => import('./containers/Login/login'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation/'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/'));
const Logout = React.lazy(() => import('./containers/Login/logout'))
const Terms = React.lazy(() => import('./containers/Signup/TermsandConditions'))
const Join = React.lazy(() => import('./containers/Signup/MemberShip'))
const Signup = React.lazy(() => import('./containers/Signup/'))
const TermsandConditions=React.lazy(()=> import('./containers/TermsAndPolicy/TermsAndConditionsIndex'))
const PrivacyPolicy=React.lazy(()=>import('./containers/TermsAndPolicy/PrivacyActIndex'))
const OldKoreanprivacyact = React.lazy(()=>import('./containers/TermsAndPolicy/OldKoreanPrivacyAct'))
const FindID = React.lazy(()=>import('./containers/Login/FindID'))
const FindPassword = React.lazy(()=>import('./containers/Login/FindPassword'))
const ResetPassword =React.lazy(()=>import('./containers/Login/ResetPassword'))

const FileProjectDataTable =React.lazy(()=>import('./containers/UserDataVisualization/Components/MainComponents/FileProjectDataTable'))

const Introduce = React.lazy(() => import('./containers/Home/introduce'))
const Pipeline = React.lazy(() => import('./containers/Home/pipeline'))
// const DataApplication = React.lazy(() => import('./containers/DataApplication'))

const Faq = React.lazy(() => import('./containers/CustomerVoice/Faq'))
const Notice = React.lazy(() => import('./containers/CustomerVoice/Notice'))
const Qa = React.lazy(() => import('./containers/CustomerVoice/QA'))

const InterPro =  React.lazy(() => import('./containers/Tools/InterPro'))
const Blast =  React.lazy(() => import('./containers/Tools/Blast'))
const VcfMaf =  React.lazy(() => import('./containers/Tools/Vcfmaf'))


const genefusion = React.lazy(() => import('./containers/Common/genefusion'))
const UserDataTable = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/projectDataTable'))
const MobileSuccess = React.lazy(() => import('./containers/Signup/MobileVerify'))

const Organoid = React.lazy(() => import('./containers/CustomerVoice/OtherServices/Organoid'))
const RelatedSites = React.lazy(()=>import('./containers/CustomerVoice/OtherServices/RelatedSitesIndex'))

const Refresh = React.lazy(() => import('./containers/Refresh'))
// const MobileSuccess = React.lazy(()=>import('./containers/Signup/MobileSuccess'))
// const Report = React.lazy(()=>import ('./containers/DataVisualisation/Charts/NewSankeyIndex'))

// const Report = React.lazy(()=>import ('./containers/DataVisualisation/Charts/NewSankeyIndex'))
// let Checkproject_id = ()=>{
//   let { tab, project_id } = useParams()
//   if (project_id !== undefined) return true
// }

const route = [
  { path: '/home', exact: true, type:'unauth', name: 'Home',childname:'', component: Home },
  { path: '/mobile_verify/', exact: true, type:'unauth', name: '', component: MobileSuccess },
  { path: '/summary/:tab?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataSummary" defaultMessage='Data Summary'/>, component: DataSummary },
  { path: '/visualise/:tab?/:project_id?/', exact: true, type:'unauth', name: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,childname:<FormattedMessage  id = "DataVisualization" defaultMessage='DataVisualization'/>, component: DataVisualization },
  { path: '/userdata/', exact: true, type:'unauth', name:<FormattedMessage  id = "Home" defaultMessage='Home'/> , childname:<FormattedMessage  id = "DataVisualization" defaultMessage='Visualize MyData'/>, component: UserDataVisualization },
  { path: '/introduce/', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "BusinessIntroduce" defaultMessage='Business Introduction'/>, component: Introduce },
  { path: '/pipeline/', exact: true, type:'unauth', name: <FormattedMessage  id = "Introduce" defaultMessage='Introduction'/>, childname:<FormattedMessage  id = "Pipeline" defaultMessage='Pipeline'/>, component: Pipeline },
  // { path: '/application/', exact: true, type:'unauth',name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage  id = "DataApplication" defaultMessage='Data Application'/>,  component: DataApplication },
  { path: '/login/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Login" defaultMessage='Login'/>,  component: Login },
  { path: '/logout/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Logout" defaultMessage='Logout'/>, component: Logout },
  { path: '/term/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Terms'/>, component: Terms},
  { path: '/member/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Join'/>, component: Join},
  { path: '/signup/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: Signup},
  { path: '/genefusion/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: genefusion},
  { path: '/user-data/:id', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage  id = "Signup" defaultMessage='Signup'/>, component: UserDataTable},
  

  { path: '/faq/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "CustomerVoice" defaultMessage='Customer Voice'/>, childname:<FormattedMessage  id = "FAQ" defaultMessage='FAQ'/>, component: Faq},
  { path: '/notice/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "CustomerVoice" defaultMessage='Customer Voice'/>, childname:<FormattedMessage  id = "Notice" defaultMessage='Notice'/>, component: Notice},
  { path: '/qa/:slug?/', exact: true, type:'unauth', name: <FormattedMessage  id = "CustomerVoice" defaultMessage='Customer Voice'/>, childname:<FormattedMessage  id = "QA" defaultMessage='Q&A'/>, component: Qa},
  { path: '/termsandconditions/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname:<FormattedMessage id="TermsofService" defaultMessage="Terms of Service" />, component: TermsandConditions},
  { path: '/oldprivacyact/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="OldPrivacyPolicy" defaultMessage="PreviousPrivacyPolicy" />, component: OldKoreanprivacyact},
  { path: '/privacypolicy/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="PrivacyPolicy" defaultMessage="PrivacyPolicy" />, component: PrivacyPolicy},
  { path: '/findid/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="FindID" defaultMessage="Find ID" />, component: FindID},
  { path: '/findpassword/', exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="ResetPassword" defaultMessage="Reset Password" />, component: FindPassword},
  { path: `/resetpassword/:token`, exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="ChangePassword" defaultMessage="ChangePassword" />, component: ResetPassword},
  // { path: `/gettable/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="ChangePassword" defaultMessage="ChangePassword" />, component: Report},

  { path: `/blast/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Tools" defaultMessage='Tools'/>, childname: <FormattedMessage id="blast" defaultMessage="Blast" />, component: Blast},
  { path: `/interpro/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Tools" defaultMessage='Tools'/>, childname: <FormattedMessage id="Interpro" defaultMessage="Interpro" />, component: InterPro},
  { path: `/vcfmaf/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Tools" defaultMessage='Tools'/>, childname: <FormattedMessage id="VCFMAF" defaultMessage="VCF to MAF" />, component: VcfMaf},
  { path: `/organoid/`, exact: true, type:'unauth', name: <FormattedMessage  id = "OtherServices" defaultMessage='Other Services'/>, childname: <FormattedMessage id="Organoid" defaultMessage="organoid" />, component: Organoid},
  { path: `/related-sites/`, exact: true, type:'unauth', name: <FormattedMessage  id = "OtherServices" defaultMessage='Other Services'/>, childname: <FormattedMessage id="RelatedSites" defaultMessage="Related Sites" />, component: RelatedSites},
  { path: `/fileprojectdatatable/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="Organoid" defaultMessage="organoid" />, component: FileProjectDataTable},
  { path: `/refresh/`, exact: true, type:'unauth', name: <FormattedMessage  id = "Home" defaultMessage='Home'/>, childname: <FormattedMessage id="Organoid" defaultMessage="organoid" />, component: Refresh},
  // { path:'/checkplus_success',exact:true,type:'unauth','childname':'',component:MobileSuccess}
]

export default route;

// adding user data visualization


