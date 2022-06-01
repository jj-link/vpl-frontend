import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProfile } from "../../Slices/UserSlice";
import { AppDispatch, RootState } from "../../Store";
import './EditProfileForm.css';
export const EditProfileForm:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user.user);

    const [email, setEmail] = useState(userInfo?.email);
    const [password, setPassword] = useState(userInfo?.password);
    const [firstName, setFirstName] = useState(userInfo?.firstName);
    const [lastName, setLastName] = useState(userInfo?.lastName);

    const navigator = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {}, []);

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
    };

    const handleEditProfile = (event:React.MouseEvent<HTMLButtonElement>) => {
        //console.log(userState.user?.userId);
        let credentials = {
            userId: userInfo?.userId,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        //console.log(credentials);
        dispatch(editProfile(credentials));
        navigator('/profile');
    }

    return(
        <div className="edit-profile">
            <div className="header-container">
                <h1 className="edit-profile-header">Edit Profile</h1>
            </div>
            <form className="edit-profile-form">
                <div className="first-name-container">
                    <h4 className="input-field-label">Please Enter First Name</h4>
                    <input className="registration-input" type="text" name="firstName" placeholder={userInfo?.firstName} value={firstName} onChange={handleInput}/>
                </div>
                <div className="last-name-container">
                    <h4 className="input-field-label">Please Enter Last Name</h4>
                    <input className="registration-input" type="text" name="lastName" placeholder={userInfo?.lastName} value={lastName} onChange={handleInput}/>
                </div>
                <div className="email-container">
                    <h4 className="input-field-label">Please Enter Email</h4>
                    <input className="registration-input" type="text" placeholder={userInfo?.email} name="email" value={email} onChange={handleInput}/>
                </div>
                <div className="password-container">
                    <h4 className="input-field-label">Please Enter Password</h4>
                    <input className="registration-input" type="password" name="password" placeholder="password" value={password} onChange={handleInput}/>
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