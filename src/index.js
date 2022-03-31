import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './app.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { StateProvider } from './api/global'
import { TestUI } from './ui/test'
import { NotificationProvider } from './api/notification/NotificationContext'

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
    <NotificationProvider >
    <StateProvider>
      <TestUI/>
    </StateProvider>   
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
