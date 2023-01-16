import { FormattedMessage } from 'react-intl';
import config from './config';
const sessionAuth = localStorage.getItem('ncc_access_token');


function parseJwt (islogin1) {
    var base64Url = islogin1 && islogin1.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
 
  
}



const login = {
  id: 'login',
  title: <FormattedMessage id="Login" defaultMessage="Login" />,
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/login/',
  children: [],
}

const logout = {
  id: 'logout',
  title: 'Logout',
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/logout/',
  children: [],
}
const superAdmin = {
  id: 'admin',
  title: 'Admin',
  type: 'admin',
  icon: 'fa fa-dashboard',
  url: config['auth']+'/login',
  children: [],
}


let childMenu = {
  "social": {
    items: [
    
      {

        id: 'signup',
        title: <FormattedMessage id="Signup" defaultMessage="Sign Up" />,
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/signup/',
        children: [],
      },
      {
        id: 'api',
        title: 'API',
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/API/',
        children: [],
      }
    ]
  },
  "mainmenu": {
    items: [

      {
        id: 'introduce',
        title: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/introduce/',
        children: [
          {
            id: 'Business',
            title: <FormattedMessage id="BusinessIntroduce" defaultMessage="Business Introduction" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/introduce/',
            children: []
          },
          {
            id: 'pipeline',
            title: <FormattedMessage id="Pipeline" defaultMessage="Pipeline" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/pipeline/',
            children: []
          },
        ],
      },
      {
        id: 'visualization',
        title: <FormattedMessage id="Visualization" defaultMessage='Visualization' />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/summary/',
        children: [
          {
            id: 'DataSummary',
            title: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/summary/',
            children: []
          },
          {
            id: 'DataVisualization',
            title: <FormattedMessage id="DataVisualization" defaultMessage="Data Visualization" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/visualise/circos/',
            children: []
          }
        ]
      },

      {
        id: 'MyDataVisualization',
        title: <FormattedMessage id="MyDataVisualization" defaultMessage='Visualize MyData' />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/userdata/',
        children: [

        ],
      },
      {
        id: 'tools',
        title: <FormattedMessage id="Tools" defaultMessage='Tools' />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/blast/',
        children: [
          {
            id: 'Blast',
            // title: <FormattedMessage id="Blast" defaultMessage='Blast' />,
            title: 'Blast',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/blast/',
            children: []
          },
          {
            id: 'VCFMAF',
            title: 'VCF to MAF',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/vcfmaf/',
            children: []
          },
          {
            id: 'Interpro',
            title: "Interpro",
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/interpro/',
            children: []
          }
        ],
      },
      {
        id: 'voice',
        title: <FormattedMessage id="CustomerVoice" defaultMessage='Customer Voice' />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/faq/',
        children: [
          {
            id: 'faq',
            title: <FormattedMessage id="FAQ" defaultMessage='FAQ' />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/faq',
            children: []
          },
          {
            id: 'qa',
            title: <FormattedMessage id="QA" defaultMessage='Q&A' />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/qa',
            children: []
          },
          {
            id: 'notice',
            title: <FormattedMessage id="Notice" defaultMessage='Notice' />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/notice',
            children: []
          },
          {
            id: 'otherservice',
            title: <FormattedMessage id="OtherServices" defaultMessage='Other Service' />,
            type: 'group',
            icon: 'fa fa-dashboard',
            url: '/otherservice',
            children: [
              {
                id: 'organoid',
                title: <FormattedMessage id="Organoid" defaultMessage='Organoid' />,
                type: 'item',
                icon: 'fa fa-dashboard',
                url: '/organoid',
                children: []
              },
              {
                id: 'qa',
                title: <FormattedMessage id="RelatedSites" defaultMessage='Related Sites' />,
                type: 'item',
                icon: 'fa fa-dashboard',
                url: '/qa',
                children: []
              }
            ]
          }
        ],
      },
    ]
  }
}

if (sessionAuth) {
  let jwt = parseJwt(sessionAuth)
  console.log('jwt',jwt);
  childMenu["social"]["items"].push(logout)
  if(jwt['is_superuser']){
    childMenu["social"]["items"].push(superAdmin)
  }
  // childMenu["social"]["items"].splice(0, childMenu["social"]["items"],...childMenu["social"]["items"].filter(function(item){
  //   return (item.id!=='signup' ||  item.id!=='logout')
  // }))
} else {
  childMenu["social"]["items"].push(login)
}
// if(parseJwt(islogin1)){
//   childMenu["social"]["items"].push(superAdmin)

// }

export default childMenu;
