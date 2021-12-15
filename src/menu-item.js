import {FormattedMessage} from 'react-intl';

const sessionAuth = localStorage.getItem('ncc_access_token');


const login = {
  id: 'login',
  title: <FormattedMessage  id = "Login" defaultMessage="Login"/>,
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/login',
  children: [],
}

const logout = {
  id: 'logout',
  title: 'Logout',
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/logout',
  children: [],
}


let childMenu = {
  "social": {
    items: [
      {
        id: 'signup',
        title: <FormattedMessage  id = "Signup" defaultMessage="Sign Up"/>,
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/signup',
        children: [],
      },
      {
        id: 'api',
        title: 'API',
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/API',
        children: [],
      }
    ]
  },
  "mainmenu": {
    items: [

      {
        id: 'introduce',
        title: <FormattedMessage  id = "Introduce" defaultMessage="Introduction"/>,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/introduce',
        children: [
          {
            id: 'Business',
            title: <FormattedMessage  id = "BusinessIntroduce" defaultMessage="Business Introduction"/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/introduce',
            children: []
          },
          {
            id: 'pipeline',
            title: <FormattedMessage  id = "Pipeline" defaultMessage="Pipeline"/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/pipeline',
            children: []
          },
        ],
      },
      {
        id: 'visualization',
        title: <FormattedMessage  id = "Visualization" defaultMessage='Visualization'/>,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/summary',
        children: [
          {
            id: 'DataSummary',
            title: <FormattedMessage  id = "DataSummary" defaultMessage="Data Summary"/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/summary',
            children: []
          },
          {
            id: 'DataVisualization',
            title: <FormattedMessage  id = "DataVisualization" defaultMessage="Data Visualization"/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/visualise/circos/',
            children: []
          }
        ]
      },

      {
        id: 'MyDataVisualization',
        title: <FormattedMessage  id = "MyDataVisualization" defaultMessage='Visualize MyData'/>,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/userdata',
        children: [

        ],
      },
      {
        id: 'dataapplication',
        title: <FormattedMessage  id = "DataApplication" defaultMessage='Data Application'/>,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/application',
        children: [
          {
            id: 'dataprovision',
            title: <FormattedMessage  id = "DataProvision" defaultMessage='Data delivery guidance'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/application',
            children: []
          },
          {
            id: 'datadb',
            title: <FormattedMessage  id = "DataDb" defaultMessage='MaterialDB Guides'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/application',
            children: []
          },
          {
            id: 'datarequest',
            title: <FormattedMessage  id = "DataRequest" defaultMessage='Data Application'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/application',
            children: []
          }
        ],
      },
      {
        id: 'voice',
        title: <FormattedMessage  id = "CustomerVoice" defaultMessage='Customer Voice'/>,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/summary',
        children: [
          {
            id: 'faq',
            title: <FormattedMessage  id = "FAQ" defaultMessage='FAQ'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/faq',
            children: []
          },
          {
            id: 'qa',
            title: <FormattedMessage  id = "QA" defaultMessage='Q&A'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/qa',
            children: []
          },
          {
            id: 'notice',
            title: <FormattedMessage  id = "Notice" defaultMessage='Notice'/>,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/notice',
            children: []
          }
        ],
      },
    ]
  }
}

if (sessionAuth){
  childMenu["social"]["items"].push(logout)
}else{
  childMenu["social"]["items"].push(login)
}
export default childMenu;
