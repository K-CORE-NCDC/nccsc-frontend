import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CustomerServiceDetail } from './containers/Common/CusomerSeviceDetail';
import Home from './containers/Home';
import MultiDataViewProject from './containers/UserDataVisualization/MultiDataVisualization/MultiDataViewProject';
import DataframeRecon from './containers/Tools/DataframeRecon';
const DataSummary = React.lazy(() => import('./containers/DataSummary'));
const Login = React.lazy(() => import('./containers/Login/login'));

//Single Data User Visulaization
const SingleDataUploadIndex = React.lazy(() =>
  import('./containers/UserDataVisualization/SingleDataVisualization/SingleDataUploadIndex')
);
const SingleDataAnalysis = React.lazy(() =>
  import('./containers/UserDataVisualization/SingleDataVisualization/SingleDataAnalysis')
);

// Multi Data User Visulaization
const MultiDataVisualizationHome = React.lazy(() =>
  import('./containers/UserDataVisualization/MultiDataVisualization/HomeComponent')
);
const MultiDataVisualizationUploadIndex = React.lazy(() =>
  import('./containers/UserDataVisualization/MultiDataVisualization/MultiDataUploadIndex')
);
const MultiDataAnalysis = React.lazy(() =>
  import('./containers/UserDataVisualization/MultiDataVisualization/MultiDataAnalysis')
);
const GeneSet = React.lazy(() =>
  import('./containers/UserDataVisualization/Components/MainComponents/GeneSet')
);

const Logout = React.lazy(() => import('./containers/Login/logout'));
const Terms = React.lazy(() => import('./containers/Signup/TermsandConditions'));
const Signup = React.lazy(() => import('./containers/Signup/Signup'));
const TermsandConditions = React.lazy(() =>
  import('./containers/TermsAndPolicy/TermsAndConditionsIndex')
);
const PrivacyPolicy = React.lazy(() => import('./containers/TermsAndPolicy/PrivacyActIndex'));
const OldKoreanprivacyact = React.lazy(() =>
  import('./containers/TermsAndPolicy/OldKoreanPrivacyAct')
);

const FindIndex = React.lazy(() => import('./containers/Login/FindIndex'));
const ResetPassword = React.lazy(() => import('./containers/Login/ResetPassword'));
const SetPassword = React.lazy(() => import('./containers/Signup/SetPassword'));
const FileProjectDataTable = React.lazy(() =>
  import('./containers/UserDataVisualization/Components/MainComponents/FileProjectDataTable')
);

const Pipeline = React.lazy(() => import('./containers/Home/pipeline'));

const Notice = React.lazy(() => import('./containers/CustomerVoice/Notice'));
const NoticeDetails = React.lazy(() => import('./containers/CustomerVoice/NoticeDetails'));
const Faq = React.lazy(() => import('./containers/CustomerVoice/Faq'));
const FaqDetails = React.lazy(() => import('./containers/CustomerVoice/FaqDetails'));
const Qa = React.lazy(() => import('./containers/CustomerVoice/QA'));
const QaDetails = React.lazy(() => import('./containers/CustomerVoice/QADetails'));

const ToolsIndex = React.lazy(() => import('./containers/Tools/ToolsIndex'));
const InterPro = React.lazy(() => import('./containers/Tools/InterPro'));
const Blast = React.lazy(() => import('./containers/Tools/Blast'));
const VcfMaf = React.lazy(() => import('./containers/Tools/Vcfmaf'));
const MAFMerger = React.lazy(() => import('./containers/Tools/MAFMerger'));
const RefVerConverter = React.lazy(() => import('./containers/Tools/RefVerConverter'));

const genefusion = React.lazy(() => import('./containers/Common/genefusion'));
const UserDataTable = React.lazy(() =>
  import('./containers/UserDataVisualization/Components/MainComponents/projectDataTable')
);

const Organoid = React.lazy(() => import('./containers/CustomerVoice/OtherServices/Organoid'));
const RelatedSites = React.lazy(() =>
  import('./containers/CustomerVoice/OtherServices/RelatedSitesIndex')
);
const Refresh = React.lazy(() => import('./containers/Refresh'));
const SankeyPlot = React.lazy(() => import('./containers/DataVisualisation/Charts/SankeyPlot'));

const NotFound = React.lazy(() => import('./containers/ErrorPages/index'));
const ServerError = React.lazy(() => import('./containers/ErrorPages/ServerError'));
const route = [
  {
    path: '/summary/:tab?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
    component: DataSummary
  },

  {
    path: '/sankey/',
    exact: true,
    type: 'unauth',
    category: 'home',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />
    ),
    component: SankeyPlot
  },

  {
    path: '/visualise-singledata/:tab?/:project_id?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />
    ),
    component: SingleDataAnalysis
  },
  {
    path: '/visualizesingle-exampledata/:tab?/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />
    ),
    component: SingleDataAnalysis
  },

  {
    path: '/gene-set/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />
    ),
    component: GeneSet
  },
  {
    path: '/singledata-upload/:tab?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="SingleDataVisualization" defaultMessage="Single Data Visualization" />
    ),
    component: SingleDataUploadIndex
  },
  {
    path: '/visualise-multidata/:tab?/:project_id?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />
    ),
    component: MultiDataAnalysis
  },

  {
    path: '/visualizemulti-exampledata/:tab?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: (
      <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />
    ),
    component: MultiDataAnalysis
  },

  {
    path: '/multidatavisualization/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: (
      <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />
    ),
    component: MultiDataVisualizationHome
  },

  {
    path: '/',
    exact: true,
    type: 'unauth',
    category: 'home',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="BusinessIntroduce" defaultMessage="Business Introduction" />,
    component: Home
  },
  {
    path: '/home/introduction/',
    exact: true,
    type: 'unauth',
    category: 'introduce',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="SiteIntro" defaultMessage="Business Introduction" />,
    component: Home
  },
  {
    path: '/home/visualizeMyExampleData/',
    exact: true,
    type: 'unauth',
    category: 'visualize',
    name: <FormattedMessage id="Visualization" defaultMessage="Visualization" />,
    childname: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
    component: Home
  },
  {
    path: '/home/visualizeMyData/',
    exact: true,
    type: 'unauth',
    category: 'visualizeData',
    name: <FormattedMessage id="VisualizeMyData" defaultMessage="VisualizeMyData" />,
    childname: <FormattedMessage id="VisualizeMyData" defaultMessage="VisualizeMyData" />,
    component: Home
  },
  {
    path: '/newmultidataproject/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: (
      <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />
    ),
    component: MultiDataVisualizationUploadIndex
  },

  {
    path: '/multidataprojectview/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: (
      <FormattedMessage id="MultiDataVisualization" defaultMessage="Multi Data Visualization" />
    ),
    component: MultiDataViewProject
  },

  {
    path: '/pipeline/',
    exact: true,
    type: 'unauth',
    category: 'introduce',
    name: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
    childname: <FormattedMessage id="Pipeline" defaultMessage="Pipeline" />,
    component: Pipeline
  },

  {
    path: '/login/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Login" defaultMessage="Login" />,
    component: Login
  },
  {
    path: '/logout/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Logout" defaultMessage="Logout" />,
    component: Logout
  },
  {
    path: '/term/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Terms" />,
    component: Terms
  },


  {
    path: '/genefusion/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Signup" />,
    component: genefusion
  },
  {
    path: '/user-data/:id',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Signup" />,
    component: UserDataTable
  },
  {
    path: '/home/faq/',
    exact: true,
    type: 'unauth',
    category: 'visualizeData',
    name: <FormattedMessage id="CustomerService" defaultMessage="CustomerService" />,
    childname: <FormattedMessage id="CustomerService" defaultMessage="CustomerService" />,
    component: Home
  },
  {
    path: '/faq/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="FAQ" defaultMessage="FAQ" />,
    component: Faq
  },
  {
    path: '/faq/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="FAQ" defaultMessage="FAQ" />,
    component: FaqDetails
  },
  {
    path: '/notice/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="Notice" defaultMessage="Notice" />,
    component: Notice
  },
  {
    path: '/notice/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="Notice" defaultMessage="Notice" />,
    component: NoticeDetails
  },
  {
    path: '/qa/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="QA" defaultMessage="Q&A" />,
    component: Qa
  },
  {
    path: '/qa/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="QA" defaultMessage="Q&A" />,
    component: QaDetails
  },
  {
    path: '/details/:slug?/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
    childname: <FormattedMessage id="details" defaultMessage="Details" />,
    component: CustomerServiceDetail
  },
  {
    path: '/termsandconditions/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="TermsofService" defaultMessage="Terms of Service" />,
    component: TermsandConditions
  },
  {
    path: '/oldprivacyact/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="OldPrivacyPolicy" defaultMessage="PreviousPrivacyPolicy" />,
    component: OldKoreanprivacyact
  },
  {
    path: '/privacypolicy/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="PrivacyPolicy" defaultMessage="PrivacyPolicy" />,
    component: PrivacyPolicy
  },
  {
    path: '/findregistrationnumber/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="FindRegistrationNumber" defaultMessage="Find Registration Number" />,
    component: FindIndex
  },
  {
    path: '/findpassword/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="FindPassword" defaultMessage="Find Password" />,
    component: FindIndex
  },
  {
    path: '/signup/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Signup" defaultMessage="Sign Up" />,
    component: Signup
  },
  {
    path: '/resetpassword/:token',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="ChangePassword" defaultMessage="ChangePassword" />,
    component: ResetPassword
  },
  {
    path: '/set-password/:token',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="SetPassword" defaultMessage="Set Password" />,
    component: SetPassword
  },

  {
    path: '/tools/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    component: ToolsIndex
  },

  {
    path: '/blast/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="blast" defaultMessage="Blast" />,
    component: Blast
  },
  {
    path: '/dataframeconverter/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="dataframeconverter" defaultMessage="Dataframe Converter" />,
    component: DataframeRecon
  },
  {
    path: '/interpro/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="Interpro" defaultMessage="Interpro" />,
    component: InterPro
  },
  {
    path: '/vcfmaf/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="VCFMAF" defaultMessage="VCF to MAF" />,
    component: VcfMaf
  },
  {
    path: '/mafmerger/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="MAFMerger" defaultMessage="MAF Merger" />,
    component: MAFMerger
  },
  {
    path: '/refverconverter/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Tools" defaultMessage="Tools" />,
    childname: <FormattedMessage id="REFVERCONVERTER" defaultMessage="RefVer Converter (Liftover)" />,
    component: RefVerConverter
  },
  {
    path: '/organoid/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: Organoid
  },
  {
    path: '/related-sites/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
    childname: <FormattedMessage id="RelatedSites" defaultMessage="Related Sites" />,
    component: RelatedSites
  },
  {
    path: '/fileprojectdatatable/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: FileProjectDataTable
  },
  {
    path: '/refresh/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
    component: Refresh
  },
  {
    path: '/notfound/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="notfound" defaultMessage="notfound" />,
    component: NotFound
  },
  {
    path: '/server-error/',
    exact: true,
    type: 'unauth',
    name: <FormattedMessage id="Home" defaultMessage="Home" />,
    childname: <FormattedMessage id="serverError" defaultMessage="Server Error" />,
    component: ServerError
  }
];

export default route;
