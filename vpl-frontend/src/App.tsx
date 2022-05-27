import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { HomePage } from './Views/HomePage/HomePage';

import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="*" element={<Navigate to="/register" replace />} />
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
