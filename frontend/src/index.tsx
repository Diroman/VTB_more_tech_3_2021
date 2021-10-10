import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import UserService from './services/UserService';

const renderApp = () =>
render(
  <App/>,
  document.getElementById('app'),
);

UserService.initKeycloak(renderApp);
