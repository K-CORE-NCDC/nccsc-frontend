import { FormattedMessage } from 'react-intl';
import React from 'react';
import config from './config';
import { getCookie } from './containers/getCookie';

const logout = {
  id: 'logout',
  title: 'Find Password',
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/logout/',
  children: []
};

const login = {
  id: 'login',
  title: <FormattedMessage id="Login" defaultMessage="Login" />,
  type: 'item',
  icon: 'fa fa-dashboard',
  url: '/login/',
  children: []
};
const superAdmin = {
  id: 'admin',
  title: 'Admin',
  type: 'admin',
  icon: 'fa fa-dashboard',
  url: `${config.auth}login`,
  children: []
};

const childMenu = {
  social: {
    items: []
  },
  mainmenu: {
    items: [
      {
        id: 'Introduction',
        title: <FormattedMessage id="Introduce" defaultMessage="Introduction" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/introduction/',
        index: 1,
        children: [
          {
            id: 'Business',
            title: (
              <FormattedMessage id="BusinessIntroduce" defaultMessage="Business Introduction" />
            ),
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
          }
        ]
      },
      {
        id: 'Visualize Example Data',
        title: <FormattedMessage id="Visualization" defaultMessage="Visualize Example Data" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/visualizeMyExampleData/',
        index: 2,
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
            url: '/visualise/home/',
            children: []
          }
        ]
      },

      {
        id: 'Visualize MyData',
        title: <FormattedMessage id="VisualizeMyData" defaultMessage="Visualize My Data" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/visualizeMyData/',
        index: 3,
        children: []
      },
      {
        id: 'Customer Service',
        title: <FormattedMessage id="CustomerVoice" defaultMessage="Customer Service" />,
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/faq/',
        index: 4,
        children: [
        ]
      }
    ]
  }
};
if (getCookie('is_login') && getCookie('is_login') === 'True') {
  childMenu.social.items.push(logout);
  if (getCookie('superuser')) {
    childMenu.social.items.push(superAdmin);
  }
} else {
  childMenu.social.items.push(login);
}

export default childMenu;
