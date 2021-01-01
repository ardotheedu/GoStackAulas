import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Route from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Route />
      </AppProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
