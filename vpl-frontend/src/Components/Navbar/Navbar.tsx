import React from "react";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../Store";
//import './Navbar.css';
import { RootState } from '../../Store';
import {logout} from '../../Slices/UserSlice';

export const Navbar: React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const user = useSelector((state:RootState) => state.user.user);

    return(
        <nav className="navbar">
        <ul className='nav-menu'>
            {/*
            <li className="nav-item">
                <Link to={`/user/${user?.userId}`} className="nav-link">Profile</Link>
            </li>
            */}
            <li className="nav-item">
                <Link to={"/home"} className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
                <Link to={"/profile"} className="nav-link">Profile</Link>
            </li>
            <li className="logout">
                <Link to={"/login"} className="nav-link">
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </Link>
            </li>
        </ul>
    </nav>
    )

}

