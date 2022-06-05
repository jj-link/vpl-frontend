import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';
import './AddBookPage.css';

import { AddBookForm } from '../../Components/AddBookForm/AddBookForm';


// will go inside App tsx
export const AddBookPage: React.FC = () => {
    const ownerInfo = useSelector((state: RootState) => state.user);
    const navigator = useNavigate();

    useEffect(() => {
        if (!ownerInfo.isLoggedIn || ownerInfo.user?.userRole !== 2) {
          console.log("this ran and went back to login");
          navigator('/login');
        }
        else{
          //console.log(userInfo);
        }
      }, [ownerInfo.isLoggedIn, ownerInfo.user?.userRole, navigator]);

  return (
    <div className="add-book-page">
      <AddBookForm/>
    </div>
  );
};