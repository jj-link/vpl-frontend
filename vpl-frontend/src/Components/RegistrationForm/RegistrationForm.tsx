import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store';
import { registerUser, toggleError } from '../../Slices/UserSlice';
import {Link, useNavigate} from 'react-router-dom';
import './RegistrationForm.css';
export const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    const navigator = useNavigate();
    
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
    const handleRegister = (event:React.MouseEvent<HTMLButtonElement>) => {
        let credentials = {email, password, firstName, lastName};
        dispatch(registerUser(credentials));
        navigator('/login');
    }
    
    return(
        <div className="registration">
            <div className="header-container">
                <h1 className="register-header">Registration Form</h1>
            </div>
            <form className="register-form">
                <div className="first-name-container">
                    <h4 className="register-input-field-label">Please Enter First Name</h4>
                    <input className="register-registration-input" type="text" name="firstName" placeholder="First name" onChange={handleInput}/>
                </div>
                <div className="last-name-container">
                    <h4 className="register-input-field-label">Please Enter Last Name</h4>
                    <input className="register-registration-input" type="text" name="lastName" placeholder="Last name" onChange={handleInput}/>
                </div>
                <div className="email-container">
                    <h4 className="register-input-field-label">Please Enter Email</h4>
                    <input className="register-registration-input" type="text" placeholder="abc@gmail.com" name="email" onChange={handleInput}/>
                </div>
                <div className="password-container">
                    <h4 className="register-input-field-label">Please Enter Password</h4>
                    <input className="register-registration-input" type="password" name="password" placeholder="password" onChange={handleInput}/>
                </div>
                
            </form>
            <div className='Register-buttons'>
                <button className="register-button" onClick={handleRegister}>Register</button>
                <Link to={"/login"} className="nav-login">
                    <button className='login-button'>Back To Login</button>
                </Link>
            </div>
    
        </div>
    )
}