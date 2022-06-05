import React from 'react';
import './AllUsersPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const AllUsersPage: React.FC<any> = () => {
  const usersAll = useSelector((state: RootState) => state.user.users);
  // const navigator = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className='all-users'>
        <Navbar />
        <div className="page-title">
            <h3 className='all-User-Title'>All Users</h3>
        </div>

        {usersAll?.map((user) => {
          return (
            <div className = 'user-container'>
              <div className='user-details' key={user.userId}>
                <label className='all-user-page-info'>UserID: {user.userId}</label>
                <label className='all-user-page-info'>First Name: {user.firstName}</label>
                <label className='all-user-page-info'>Last Name: {user.lastName}</label>
                <label className='all-user-page-info'>Email: {user.email}</label>
              </div>
            </div>
          );
        })}

        <div className="all-users-home-button">
          <Link to="/ownerhome">
            <button className='all-users-back-btn'>back</button>
          </Link>
        </div>
    </div>
  );
};
