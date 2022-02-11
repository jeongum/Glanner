import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

// axios 요청 시 헤더에 항상 JWT 토큰 넣어주기 글로벌 설정
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

