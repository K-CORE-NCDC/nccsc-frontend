import { FormattedMessage } from 'react-intl';
import React from 'react';
import config from './config';
import { getCookie } from './containers/getCookie';


const sessionAuth = getCookie('sessionId')
// console.log('menu',loginResponse)


// const logout = {
//   id: 'logout',
//   title: 'Logout',
//   type: 'item',
//   icon: 'fa fa-dashboard',
//   url: '/logout/',
//   children: [],
// };
const logout = {
  id: 'logout',
  title: 'Find Password',
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/logout/',
  children: [],
};

const login = {
  id: 'login',
  title: <FormattedMessage id="Login" defaultMessage="Login" />,
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/login/',
  children: [],
};
const superAdmin = {
  id: 'admin',
  title: 'Admin',
  type: 'admin',
  icon: 'fa fa-dashboard',
  url: `${config.auth}/login`,
  children: [],
};

const childMenu = {
  social: {
    items: [
      // {
      //   id: 'signup',
      //   title: <FormattedMessage id="Signup" defaultMessage="Sign Up" />,
      //   type: 'item',
      //   icon: 'fa fa-dashboard',
      //   url: '/signup/',
      //   children: [],
      // },
      // {
      //   id: 'api',
      //   title: 'API',
      //   type: 'item',
      //   icon: 'fa fa-dashboard',
      //   url: '/API/',
      //   children: [],
      // },
    ],
  },
  mainmenu: {
    items: [
      {
        id: 'introduce',
        title: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/introduction/',
        index:1,
        children: [
          {
            id: 'Business',
            title: (
              <FormattedMessage id="BusinessIntroduce" defaultMessage="Business Introduction" />
            ),
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/introduce/',
            children: [],
          },
          {
            id: 'pipeline',
            title: <FormattedMessage id="Pipeline" defaultMessage="Pipeline" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/pipeline/',
            children: [],
          },
        ],
      },
      {
        id: 'visualization',
        title: <FormattedMessage id="Visualization" defaultMessage="Visualize Example Data" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/visualizeMyExampleData/',
        index:2,
        children: [
          {
            id: 'DataSummary',
            title: <FormattedMessage id="DataSummary" defaultMessage="Data Summary" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/summary/',
            children: [],
          },
          {
            id: 'DataVisualization',
            title: <FormattedMessage id="DataVisualization" defaultMessage="Data Visualization" />,
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/visualise/home/',
            children: [],
          },
        ],
      },

      {
        id: 'MyDataVisualization',
        title: <FormattedMessage id="MyDataVisualization" defaultMessage="Visualize MyData" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/visualizeMyData/',
        index:3,
        children: [],
      },
      // {
      //   id: 'tools',
      //   title: <FormattedMessage id="Tools" defaultMessage="Tools" />,
      //   type: 'group',
      //   icon: 'fa fa-dashboard',
      //   url: '/blast/',
      //   children: [
      //     {
      //       id: 'Blast',
      //       // title: <FormattedMessage id="Blast" defaultMessage='Blast' />,
      //       title: 'Blast',
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/blast/',
      //       children: [],
      //     },
      //     {
      //       id: 'VCFMAF',
      //       title: 'VCF to MAF',
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/vcfmaf/',
      //       children: [],
      //     },
      //     {
      //       id: 'Interpro',
      //       title: 'Interpro',
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/interpro/',
      //       children: [],
      //     },
      //   ],
      // },
      // {
      //   id: 'voice',
      //   title: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Voice" />,
      //   type: 'group',
      //   icon: 'fa fa-dashboard',
      //   url: '/faq/',
      //   children: [
      //     {
      //       id: 'faq',
      //       title: <FormattedMessage id="FAQ" defaultMessage="FAQ" />,
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/faq',
      //       children: [],
      //     },
      //     {
      //       id: 'qa',
      //       title: <FormattedMessage id="QA" defaultMessage="Q&A" />,
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/qa',
      //       children: [],
      //     },
      //     {
      //       id: 'notice',
      //       title: <FormattedMessage id="Notice" defaultMessage="Notice" />,
      //       type: 'item',
      //       icon: 'fa fa-dashboard',
      //       url: '/notice',
      //       children: [],
      //     },
      //     {
      //       id: 'otherservice',
      //       title: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
      //       type: 'group',
      //       icon: 'fa fa-dashboard',
      //       url: '/organoid',
      //       children: [
      //         {
      //           id: 'organoid',
      //           title: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
      //           type: 'item',
      //           icon: 'fa fa-dashboard',
      //           url: '/organoid',
      //           children: [],
      //         },
      //         {
      //           id: 'qa',
      //           title: <FormattedMessage id="RelatedSites" defaultMessage="Related Sites" />,
      //           type: 'item',
      //           icon: 'fa fa-dashboard',
      //           url: '/qa',
      //           children: [],
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        id: 'voice',
        title: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Service" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/faq/',
        children: [
          // {
          //   id: 'faq',
          //   title: <FormattedMessage id="FAQ" defaultMessage="FAQ" />,
          //   type: 'item',
          //   icon: 'fa fa-dashboard',
          //   url: '/faq',
          //   children: [],
          // },
          // {
          //   id: 'qa',
          //   title: <FormattedMessage id="QA" defaultMessage="Q&A" />,
          //   type: 'item',
          //   icon: 'fa fa-dashboard',
          //   url: '/qa',
          //   children: [],
          // },
          // {
          //   id: 'notice',
          //   title: <FormattedMessage id="Notice" defaultMessage="Notice" />,
          //   type: 'item',
          //   icon: 'fa fa-dashboard',
          //   url: '/notice',
          //   children: [],
          // },
          // {
          //   id: 'otherservice',
          //   title: <FormattedMessage id="OtherServices" defaultMessage="Other Services" />,
          //   type: 'group',
          //   icon: 'fa fa-dashboard',
          //   url: '/organoid',
          //   children: [
          //     {
          //       id: 'organoid',
          //       title: <FormattedMessage id="Organoid" defaultMessage="Organoid" />,
          //       type: 'item',
          //       icon: 'fa fa-dashboard',
          //       url: '/organoid',
          //       children: [],
          //     },
          //     {
          //       id: 'qa',
          //       title: <FormattedMessage id="RelatedSites" defaultMessage="Related Sites" />,
          //       type: 'item',
          //       icon: 'fa fa-dashboard',
          //       url: '/qa',
          //       children: [],
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
};
// childMenu.social.items.push(logout);
// childMenu.social.items.push(login);
if (getCookie('is_login') && getCookie('is_login') === 'True' )
 {
  childMenu.social.items.push(logout);
  if (getCookie('superuser'))
  {
    childMenu.social.items.push(superAdmin);
  }
  }
  else
  {
  childMenu.social.items.push(login);
  }

export default childMenu;
