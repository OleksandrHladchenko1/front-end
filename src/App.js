import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Login } from './components/main/Login';
import { Register } from './components/main/Register';
import { UserPage } from './components/main/UserPage/UserPage';
import { ChangePassword } from './components/main/ChangePassword';
import { VisitPage } from './components/main/VisitPage';
import { Header } from './components/common/Header';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/userPage' element={[<Header key="header"/>, <UserPage key="userPage"/>]} />
      <Route path='/changePassword' element={[<Header key="header"/>, <ChangePassword key="changePassword"/>]} />
      <Route path='/visits' element={[<Header key="header" />, <VisitPage key="visitPage" /> ]} />
    </Routes>
  );
};

export default App;
