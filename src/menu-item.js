const sessionAuth = localStorage.getItem('ncc_access_token');

const login = {
  id: 'login',
  title: 'Login',
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
        id: 'faq',
        title: 'FAQ',
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/userdata',
        children: [],
      },
      {
        id: 'q&a',
        title: 'Q&A',
        type: 'item',
        icon: 'fa fa-dashboard',
        url: '/API',
        children: [],
      },
      {
        id: 'notice',
        title: 'Notice',
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
        title: 'Introduce',
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/',
        children: [
          {
            id: 'introduce',
            title: 'Business',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/',
            children: []
          },
          {
            id: 'introduce',
            title: 'Introduction',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/',
            children: []
          },
          {
            id: 'introduce',
            title: 'Pipeline',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/',
            children: []
          },
        ],
      },
      {
        id: 'DataSummary',
        title: 'Data Summary',
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/summary',
        children: []
      },
      {
        id: 'DataUserVisualization',
        title: 'Data Visualization',
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/visualise',
        children: [],
      },
      {
        id: 'MyDataVisualization',
        title: 'User Data Visualization',
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/userdata',
        children: [

        ],
      },
      {
        id: 'api',
        title: 'Api',
        type: 'group',
        icon: 'fa fa-dashboard',
        url: '/summary',
        children: [
          {
            id: 'VariantTypes',
            title: 'Variant Types',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/summary',
            children: []
          },
          {
            id: 'VariantClassification',
            title: 'Variant Classification',
            type: 'item',
            icon: 'fa fa-dashboard',
            url: '/summary',
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
