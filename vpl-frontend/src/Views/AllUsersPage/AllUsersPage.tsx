import React from 'react';
//import './AllUsersPage.css';
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
            <h3>All Employees</h3>
        </div>

        {usersAll?.map((user) => {
          return (
            <div className = 'user-container'>
              <div className='user-details' key={user.userId}>
                <p>UserID: {user.userId}</p>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          );
        })}

        <div className="home-button">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
    </div>
  );
};
