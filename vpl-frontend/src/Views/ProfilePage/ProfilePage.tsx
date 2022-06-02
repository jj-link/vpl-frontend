import React from "react";
import { IUser } from "../../Interfaces/IUser";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Navbar } from '../../Components/Navbar/Navbar';
import { RootState } from "../../Store";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { userInfo } from "os";
import { useNavigate } from "react-router-dom";
import './ProfilePage.css';

export const ProfilePage:React.FC = () => {
    const userState = useSelector((state:RootState) => state.user);

    const navigator = useNavigate();

    useEffect(() => {
        if(!userState.isLoggedIn){
            navigator('/login');
        }
    }, [userState.user])
    console.log(userState.user);
    return (
        <div className="profile-page-main">
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Profile of {userState.user?.firstName} {userState.user?.lastName}</h1>
                </div>
                <div className="profile-body">
                    <p className="profile-firstName">FirstName: {userState?.user?.firstName}</p>
                    <p className="profile-lastName">LastName: {userState.user?.lastName}</p>
                    <p className="profile-email">Email: {userState.user?.email}</p>
                    <p className="profile-password">Password: ****** </p>
                </div>
                <Link to={"/edit/"} className="edit-info-link">
                    <button className="edit-info-btn">Edit Information</button>
                </Link>
            </div>

        </div>
    )
}