import React from "react";
import { IUser } from "../../Interfaces/IUser";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../Components/Navbar/Navbar';
import { RootState } from "../../Store";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { userInfo } from "os";
import { useNavigate } from "react-router-dom";

export const ProfilePage:React.FC = () => {

    const userState = useSelector((state:RootState) => state.user);

    const navigator = useNavigate();

    useEffect(() => {
        if(!userState.isLoggedIn){
            navigator('/login');
        }
    }, [userState.isLoggedIn])


    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">
                    <h1>Profile of {userState.user?.firstName} {userState.user?.lastName}</h1>
                </div>
                <div className="profile-body">
                    <p>FirstName: {userState?.user?.firstName}</p>
                    <p>LastName: {userState.user?.lastName}</p>
                    <p>Email: {userState.user?.email}</p>
                    <p>Password: ****** </p>
                </div>
            </div>

        </div>
    )
}