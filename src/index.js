/** @jsxImportSource @emotion/react */
import {Global, css} from '@emotion/react'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,300,400&display=swap');
  body {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 300;
    h1, h2, h3, h4, h5{
      text-align: center;
    }
    button{
      font-family: 'Source Sans Pro', sans-serif;
    }
  }

`;

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
