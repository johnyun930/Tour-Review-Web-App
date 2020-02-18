import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Themes from "./theme";
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './shared/reducers/index';
import theme from './theme';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);
