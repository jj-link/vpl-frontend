import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { UserHomePage } from './Views/HomePage/UserHomePage';
import { OwnerHomePage } from './Views/HomePage/OwnerHomePage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';

import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { EditProfilePage } from './Views/EditProfilePage/EditProfilePage';
import { AddBookPage } from './Views/AddBookPage/AddBookPage';
import { AllUsersPage } from './Views/AllUsersPage/AllUsersPage';
import { DeleteBookForm } from './Components/DeleteBookForm/DeleteBookForm';
import { BookList } from './Components/BookList/BookList';
import { PopularBooksPage } from './Views/PopularBooksPage/PopularBooksPage';
import { RecentBooksPage } from './Views/RecentBooksPage/RecentBooksPage';
import { MyBooksPage } from './Views/MyBooksPage/MyBooksPage';
import { EditBookForm } from './Components/EditBookForm/EditBookForm';
import { GenreBookListPage } from './Views/GenreBookListPage/GenreBookListPage';
import { SearchResultsList } from './Components/SearchResultsList/SearchResultsList';

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
        <Route path="/allusers" element={<AllUsersPage />} />
        <Route path="/deletebook" element={<DeleteBookForm />} />
        <Route path="/updatebook" element={<EditBookForm />} />

        <Route path="/search" element={<BookList />} />
        <Route path="/popularbooks" element={<PopularBooksPage/>}></Route>
        <Route path="/recentbooks" element={<RecentBooksPage/>}></Route>
        <Route path="/mybooks" element={<MyBooksPage/>}></Route>
        <Route path="/genrelist" element={<GenreBookListPage/>}></Route>
        <Route path="/search/results" element={<SearchResultsList/>}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
