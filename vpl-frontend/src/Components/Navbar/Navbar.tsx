import React from "react";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../Store";
import './Navbar.css';
import { RootState } from '../../Store';
import {logout} from '../../Slices/UserSlice';

export const Navbar: React.FC = () => {
    const userRole = useSelector((state: RootState) => state.user.user?.userRole);

    const dispatch:AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const user = useSelector((state:RootState) => state.user.user);

    const isOwner=() => {
        if(userRole == 2){
          return true;
        }
        else{
          return false;
        }
    }

    return(
        <nav className="navbar">
            <div className="nav-container">
                <ul className='nav-menu'>
                { isOwner()?
                <Link to="/ownerhome">
                <li className="nav-link">Home</li>
                </Link> :
                <Link to="/userhome">
                <li className="nav-link">Home</li>
                </Link>
                }

                    <li className="nav-item">
                        <Link to={"/profile"} className="nav-link">Profile</Link>
                    </li>

                    <li className="logout">
                        <Link to={"/login"} className="nav-link">
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

