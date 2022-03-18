import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './components/main/Login';
import { Register } from './components/main/Register';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default App;
