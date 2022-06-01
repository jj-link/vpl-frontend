import React, { useEffect } from 'react';
//import './AllUsersPage.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const AllUsersPage: React.FC<any> = () => {
  const usersAll = useSelector((state: RootState) => state.user.users);
  const test = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  console.log(test);


  return (
    <div className='all-users'>
        <Navbar />
        <div className="page-title">
            <h3>All Employees</h3>
        </div>

        {usersAll?.map((user) => {
          return (
            <div className = 'user-container'>
              <div className='user-details'>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>UserID: {user.userId}</p>
              </div>
            </div>
          );
        })}

        <div className="home-button">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
    /</div>
  );
};
