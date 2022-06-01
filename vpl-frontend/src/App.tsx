import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { UserHomePage } from './Views/HomePage/UserHomePage';
import { OwnerHomePage } from './Views/HomePage/OwnerHomePage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';

import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { EditProfileForm } from './Components/EditProfileForm/EditProfileForm';
import { EditProfilePage } from './Views/EditProfilePage/EditProfilePage';
import { AddBookPage } from './Views/AddBookPage/AddBookPage';

function App() {
  return (
    <HashRouter>
      <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit/" element={<EditProfilePage />} />

        <Route path="/ownerhome" element={<OwnerHomePage />} />
        <Route path="/addbook" element={<AddBookPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
