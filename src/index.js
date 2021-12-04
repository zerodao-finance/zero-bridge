import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';

Object.keys(process.env).forEach((key) => {
  const match = key.match(/REACT_APP_(.*$)/);
  if (match) {
    process.env[match[1]] = process.env[key];
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
