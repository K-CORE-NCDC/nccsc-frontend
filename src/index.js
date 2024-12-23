import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/fonts.css';
import './styles/css/material-icons.css';
import './styles/css/layout.css';
import './styles/css/layout_responsive.css';
import './styles/css/main.css';
import './styles/css/main_responsive.css';
import './styles/css/contents.css';
import './styles/css/contents_responsive.css';
import './styles/css/custom_tailwind.css';
import './styles/css/survival.css';
import './styles/css/volcano.css';
import './styles/css/fusionPlot.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App/index';
import { store } from './store';
import config from './config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
  // document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
