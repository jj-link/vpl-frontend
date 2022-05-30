import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { editProfile } from "../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../Store";

export const EditProfileForm:React.FC = () => {

    const userState = useSelector((state:RootState) => state.user);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();

    
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "firstName"){
            setFirstName(event.target.value);
        }
        else if(event.target.name === "lastName"){
            setLastName(event.target.value);
        }
        else if(event.target.name === "email"){
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleEditProfile = (event:React.MouseEvent<HTMLButtonElement>) => {
        console.log(userState.user?.userId);
        let updatedUserInfo = {
            userId: userState.user?.userId!,
            email,
            password,
            firstName,
            lastName
        };
        console.log(updatedUserInfo);
        dispatch(editProfile(updatedUserInfo));
    }

    return(
        <div className="edit-profile">
            <div className="header-container">
                <h1 className="edit-profile-header">Edit Profile</h1>
            </div>
            <form className="edit-rofile-form">
                <div className="first-name-container">
                    <h4 className="input-field-label">Please Enter First Name</h4>
                    <input className="registration-input" type="text" name="firstName" placeholder={userState.user?.firstName} onChange={handleInput}/>
                </div>
                <div className="last-name-container">
                    <h4 className="input-field-label">Please Enter Last Name</h4>
                    <input className="registration-input" type="text" name="lastName" placeholder={userState.user?.lastName} onChange={handleInput}/>
                </div>
                <div className="email-container">
                    <h4 className="input-field-label">Please Enter Email</h4>
                    <input className="registration-input" type="text" placeholder={userState.user?.email} name="email" onChange={handleInput}/>
                </div>
                <div className="password-container">
                    <h4 className="input-field-label">Please Enter Password</h4>
                    <input className="registration-input" type="password" name="password" placeholder="password" onChange={handleInput}/>
                </div>
                
            </form>
            <div className='Update-Profile-buttons'>
                <button className="login-button" onClick={handleEditProfile}>Update Profile</button>
                <Link to={"/login"} className="nav-login">
                    <button className='login-button'>Back To Login</button>
                </Link>
            </div>
    
        </div>
    )

}