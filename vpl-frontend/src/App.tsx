import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { HomePage } from './Views/HomePage/HomePage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';

import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { EditProfileForm } from './Components/EditProfileForm/EditProfileForm';
import { EditProfilePage } from './Views/EditProfilePage/EditProfilePage';

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit/" element={<EditProfilePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
