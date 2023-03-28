import React from 'react';
import { Route } from 'react-router-dom';

/* eslint-disable react/prop-types */
function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

export default PrivateRoute;
