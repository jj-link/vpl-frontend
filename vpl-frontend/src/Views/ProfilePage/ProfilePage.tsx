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
                    <label className="profile-firstName">FirstName: {userState?.user?.firstName}</label>
                    <label className="profile-lastName">LastName: {userState.user?.lastName}</label>
                    <label className="profile-email">Email: {userState.user?.email}</label>
                    <label className="profile-password">Password: ****** </label>
                </div>
                <Link to={"/edit/"} className="edit-info-link">
                    <button className="edit-info-btn">Edit Information</button>
                </Link>
            </div>

        </div>
    )
}