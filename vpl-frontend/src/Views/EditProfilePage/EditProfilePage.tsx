import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { EditProfileForm } from "../../Components/EditProfileForm/EditProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useNavigate } from "react-router-dom";
import './EditProfilePage.css';

export const EditProfilePage:React.FC = () => {

    const userState = useSelector((state:RootState) => state.user);

    const navigator = useNavigate();

    useEffect(() => {
        if(!userState.isLoggedIn){
            navigator('/login');
        }
    }, [userState.isLoggedIn])

    return (
        <div className="edit-profile-page">
            <Navbar />
            <EditProfileForm/>
        </div>
    )

}