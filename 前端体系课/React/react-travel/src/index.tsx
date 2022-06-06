import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import './i18n/configs'
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';

axios.defaults.headers['x-icode'] = 'J2FAB54A87EA78BBF'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate  persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
