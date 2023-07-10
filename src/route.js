import React from 'react';
import { FormattedMessage } from 'react-intl';
import Introduction from './containers/Home/Introduction';
import { SiteIntro } from './containers/Introduction/SiteIntro';
import { SingleDataVisualization } from './containers/VisualizeMyExampleData/SingleDataVisualization';
import { VisualizeMyData } from './containers/VisualizeMyData/VisualizeMyData';
import Home from './containers/Home';
import MultiDataViewProject from './containers/UserDataVisualization/MultiDataVisualization/MultiDataViewProject';
const DataSummary = React.lazy(() => import('./containers/DataSummary'));
const Login = React.lazy(() => import('./containers/Login/login'));
const DataVisualization = React.lazy(() => import('./containers/DataVisualisation'));


// User Datavisualisation
// const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization'));
const UserDataVisualization = React.lazy(() => import('./containers/UserDataVisualization/mainindex'));

//Single Data User Visulaization
const SingleDataUploadIndex = React.lazy(() => import('./containers/UserDataVisualization/SingleDataVisualization/SingleDataUploadIndex'));
const SingleDataAnalysis = React.lazy(() => import('./containers/UserDataVisualization/SingleDataVisualization/SingleDataAnalysis'));

// Multi Data User Visulaization
const MultiDataVisualizationHome = React.lazy(() => import('./containers/UserDataVisualization/MultiDataVisualization/HomeComponent'));
const MultiDataVisualizationUploadIndex = React.lazy(() => import('./containers/UserDataVisualization/MultiDataVisualization/MultiDataUploadIndex'));
const MultiDataAnalysis = React.lazy(() => import('./containers/UserDataVisualization/MultiDataVisualization/MultiDataAnalysis'));
const GeneSet = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/GeneSet'));



const Logout = React.lazy(() => import('./containers/Login/logout'));
const Terms = React.lazy(() => import('./containers/Signup/TermsandConditions'));
const Join = React.lazy(() => import('./containers/Signup/MemberShip'));
const Signup = React.lazy(() => import('./containers/Signup/Signup'));
const TermsandConditions = React.lazy(() => import('./containers/TermsAndPolicy/TermsAndConditionsIndex'));
const PrivacyPolicy = React.lazy(() => import('./containers/TermsAndPolicy/PrivacyActIndex'));
const OldKoreanprivacyact = React.lazy(() => import('./containers/TermsAndPolicy/OldKoreanPrivacyAct'));

const FindIndex = React.lazy(() => import('./containers/Login/FindIndex'));
const ResetPassword = React.lazy(() => import('./containers/Login/ResetPassword'));
const SetPassword = React.lazy(() => import('./containers/Signup/SetPassword'));
const FileProjectDataTable = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/FileProjectDataTable'));

const Introduce = React.lazy(() => import('./containers/Home/introduce'));
const Pipeline = React.lazy(() => import('./containers/Home/pipeline'));

const Faq = React.lazy(() => import('./containers/CustomerVoice/Faq'));
const Notice = React.lazy(() => import('./containers/CustomerVoice/Notice'));
const Qa = React.lazy(() => import('./containers/CustomerVoice/QA'));

const InterPro = React.lazy(() => import('./containers/Tools/InterPro'));
const Blast = React.lazy(() => import('./containers/Tools/Blast'));
const VcfMaf = React.lazy(() => import('./containers/Tools/Vcfmaf'));

const genefusion = React.lazy(() => import('./containers/Common/genefusion'));
const UserDataTable = React.lazy(() => import('./containers/UserDataVisualization/Components/MainComponents/projectDataTable'));
const MobileSuccess = React.lazy(() => import('./containers/Signup/MobileVerify'));

const Organoid = React.lazy(() => import('./containers/CustomerVoice/OtherServices/Organoid'));
const RelatedSites = React.lazy(() => import('./containers/CustomerVoice/OtherServices/RelatedSitesIndex'));
const Refresh = React.lazy(() => import('./containers/Refresh'));

const NotFound = React.lazy(() => import('./containers/404NotFound/index'))
const route = [
  {
    path: '/mobile_verify/', exact: true, type: 'unauth', name: '', component: MobileSuccess,
  },
  {
    path: '/summary/:tab?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
    component: DataSummary,
  },

  {
    path: '/visualise/:tab?/:project_id?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="DataVisualization" defaultMessage="DataVisualization" />,
    component: DataVisualization,
  },

  {
    path: '/visualise-singledata/:tab?/:project_id?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />,
    component: SingleDataAnalysis,
  },
  {
    path: '/gene-set/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />,
    component: GeneSet,
  },
  {
    path: '/singledata-upload/:tab?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />,
    component: SingleDataUploadIndex,
  },
  {
    path: '/visualise-multidata/:tab?/:project_id?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />,
    component: MultiDataAnalysis,
  },

  {
    path: '/multidatavisualization/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />,
    component: MultiDataVisualizationHome,
  },

  {
    path: '/',
    exact: true,
    type: 'unauth',
    category: 'home',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="BusinessIntroduce" defaultMessage="Business Introduction" />,
    component: Home,
  },
  {
    path: '/home/introduction/',
    exact: true,
    type: 'unauth',
    category: 'introduce',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="SiteIntro" defaultMessage="Business Introduction" />,
    component: Home,
  },
  {
    path: '/home/visualizeMyExampleData/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
    component: Home,
  },
  {
    path: '/home/visualizeMyData/',
    exact: true,
    type: 'unauth',
    category: 'visualizeData',
    name: <FormattedMessage id="VisualizeMyData" defaultMessage="VisualizeMyData" />,
    childname: <FormattedMessage id="VisualizeMyData" defaultMessage="VisualizeMyData" />,
    component: Home,
  },
  {
    path: '/home/faq/',
    exact: true,
    type: 'unauth',
    category: 'visualizeData',
    name: <FormattedMessage id="CustomerService" defaultMessage="CustomerService" />,
    childname: <FormattedMessage id="CustomerService" defaultMessage="CustomerService" />,
    component: Home,
  },

  {
    path: '/newmultidataproject/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />,
    component: MultiDataVisualizationUploadIndex,
  },

  {
    path: '/multidataprojectview/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />,
    component: MultiDataViewProject,
  },


  {
    path: '/pipeline/',
    exact: true,
    type: 'unauth',
    category: 'introduce',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="Pipeline" defaultMessage="Pipeline" />,
    component: Pipeline,
  },

  {
    path: '/login/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Login" defaultMessage="Login" />,
    component: Login,
  },
  {
    path: '/logout/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Logout" defaultMessage="Logout" />,
    component: Logout,
  },
  {
    path: '/term/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Terms" />,
    component: Terms,
  },
  {
    path: '/member/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Join" />,
    component: Join,
  },
  {
    path: '/signup/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Sign Up" />,
    component: Signup,
  },
  {
    path: '/genefusion/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Signup" />,
    component: genefusion,
  },
  {
    path: '/user-data/:id',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Signup" />,
    component: UserDataTable,
  },

  {
    path: '/faq/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="FAQ" defaultMessage="FAQ" />,
    component: Faq,
  },
  {
    path: '/notice/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="Notice" defaultMessage="Notice" />,
    component: Notice,
  },
  {
    path: '/qa/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="QA" defaultMessage="Q&A" />,
    component: Qa,
  },
  {
    path: '/termsandconditions/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="TermsofService" defaultMessage="Terms of Service" />,
    component: TermsandConditions,
  },
  {
    path: '/oldprivacyact/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="OldPrivacyPolicy" defaultMessage="PreviousPrivacyPolicy" />,
    component: OldKoreanprivacyact,
  },
  {
    path: '/privacypolicy/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="PrivacyPolicy" defaultMessage="PrivacyPolicy" />,
    component: PrivacyPolicy,
  },
  {
    path: '/findid/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="FindID" defaultMessage="Find ID" />,
    component: FindIndex,
  },
  {
    path: '/findpassword/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="FindPassword" defaultMessage="Find Password" />,
    component: FindIndex,
  },
  {
    path: '/resetpassword/:token',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="ChangePassword" defaultMessage="ChangePassword" />,
    component: ResetPassword,
  },
  {
    path: '/set-password/:token',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="SetPassword" defaultMessage="Set Password" />,
    component: SetPassword,
  },
  {
    path: '/blast/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="blast" defaultMessage="Blast" />,
    component: Blast,
  },
  {
    path: '/interpro/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="Interpro" defaultMessage="Interpro" />,
    component: InterPro,
  },
  {
    path: '/vcfmaf/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="VCFMAF" defaultMessage="VCF to MAF" />,
    component: VcfMaf,
  },
  {
    path: '/organoid/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: Organoid,
  },
  {
    path: '/related-sites/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
    childname: <FormattedMessage id="RelatedSites" defaultMessage="Related Sites" />,
    component: RelatedSites,
  },
  {
    path: '/fileprojectdatatable/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: FileProjectDataTable,
  },
  {
    path: '/refresh/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: Refresh,
  },
  {
    path: '/notfound/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="notfound" defaultMessage="notfound" />,
    component: NotFound,
  },
];

export default route;

