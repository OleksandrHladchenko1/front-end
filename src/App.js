import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './components/main/Login';
import { Register } from './components/main/Register';
import { UserPage } from './components/main/UserPage/UserPage';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/userPage' element={<UserPage />} />
    </Routes>
  );
};

export default App;
