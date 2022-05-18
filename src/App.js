import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { StartPage } from './components/main/StartPage/StartPage';
import Login from './components/main/Login/Login';
import Register from './components/main/Register/Register';
import { UserPage } from './components/main/UserPage/UserPage';
import { ChangePassword } from './components/main/ChangePassword';
import { VisitPage } from './components/main/VisitPage';
import { VisitDetails } from './components/main/VisitDetails';
import { NewCarPage } from './components/main/NewCarPage';
import { UserCarPage } from './components/main/UserCarPage';
import { AdminPage } from './components/main/AdminPage';
import { StatisticsPage } from './components/main/StatisticsPage';
import { Header } from './components/common/Header';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/userPage' element={[<Header key="header"/>, <UserPage key="userPage"/>]} />
      <Route path='/changePassword' element={[<Header key="header"/>, <ChangePassword key="changePassword"/>]} />
      <Route path='/visits' element={[<Header key="header" />, <VisitPage key="visitPage" /> ]} />
      <Route path='/visits/:id' element={[<Header key="header" />, <VisitDetails key="visitPage" />]} />
      <Route path='/car' element={[<Header key="header" />, <NewCarPage key="newCarPage" />]} />
      <Route path='/my-cars' element={[<Header key="header" />, <UserCarPage key="userCarPage" />]} />
      <Route path='/admin' element={[<Header key="header" />, <AdminPage key="admin" />]} />
      <Route path='/statistics' element={[<Header key="header" />, <StatisticsPage key="statistics" />]} />
    </Routes>
  );
};

export default App;
