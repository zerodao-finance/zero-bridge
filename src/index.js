import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { StateProvider } from './api/global';
import { TestUI } from './ui/test';

Object.keys(process.env).forEach((key) => {
  const match = key.match(/REACT_APP_(.*$)/);
  if (match) {
    process.env[match[1]] = process.env[key];
  }
});

ReactDOM.render(
  <React.StrictMode className="">
    {/* <StateProvider>
        <Dashboard />
    </StateProvider> */}
    <StateProvider>
      <TestUI/>
    </StateProvider>   
  </React.StrictMode>,
  document.getElementById('root')
);
