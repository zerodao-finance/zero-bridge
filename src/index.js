import React from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import Dashboard from './components/pages/Dashboard'
import 'react-toastify/dist/ReactToastify.min.css';
import { ErrorCard } from './components/molecules/notification';
import { DefaultCheckBox } from './components/atoms/button';

Object.keys(process.env).forEach((key) => {
  const match = key.match(/REACT_APP_(.*$)/);
  if (match) {
    process.env[match[1]] = process.env[key];
  }
});

ReactDOM.render(
  <React.StrictMode className="">
        <Dashboard /> 
  </React.StrictMode>,
  document.getElementById('root')
);
