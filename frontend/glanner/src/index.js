import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import store from './redux/store'
import './index.css';

// axios 요청 시 헤더에 항상 JWT 토큰 넣어주기 글로벌 설정
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

