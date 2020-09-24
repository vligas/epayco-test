import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';
import GlobalStyles, { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Routes />
            <ToastContainer />
          </ThemeProvider>
        </StylesProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
