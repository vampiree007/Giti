import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store, sagaMiddleware } from './redux/store';
import rootSaga from './redux/sagas/rootSaga';

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);