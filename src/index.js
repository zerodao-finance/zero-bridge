import React from 'react';
import ReactDOM from 'react-dom';
import './app.css'
import 'react-toastify/dist/ReactToastify.min.css';
<<<<<<< HEAD
import { ErrorCard } from './components/molecules/notification';
import { DefaultCheckBox } from './components/atoms/button';
=======
import { StateProvider } from './api/global'
import { TestUI } from './ui/test'
>>>>>>> b2b0b2a27e860a0776e9e6368e04cd3681129ae4

Object.keys(process.env).forEach((key) => {
  const match = key.match(/REACT_APP_(.*$)/);
  if (match) {
    process.env[match[1]] = process.env[key];
  }
});

ReactDOM.render(
  <React.StrictMode className="">
<<<<<<< HEAD
        <Dashboard /> 
=======
    {/* <StateProvider>
        <Dashboard />
    </StateProvider> */}
    <StateProvider>
      <TestUI/>
    </StateProvider>   
>>>>>>> b2b0b2a27e860a0776e9e6368e04cd3681129ae4
  </React.StrictMode>,
  document.getElementById('root')
);
