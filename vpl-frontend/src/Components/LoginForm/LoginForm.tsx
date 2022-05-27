import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store';
import { loginUser, toggleError } from '../../Slices/UserSlice';
//import "./LoginForm.css"
export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "email"){
            setEmail(event.target.value);
        }
        else if(event.target.name === "password"){
            setPassword(event.target.value);
        }
    }
    const handleLogin = (event:React.MouseEvent<HTMLButtonElement>) => {
        let credentials = {email, password};
        dispatch(loginUser(credentials));
    }
    return(
        <div className="login">
            <div className="header-container">
                <h1 className="login-header">Login Form</h1>
            </div>
            <form className="login-form">
                <div className="email-container">
                    <h4 className="input-field-label">Please Enter Email</h4>
                    <input className="login-input" type="text" placeholder="abc@gmail.com" name="email" onChange={handleInput}/>
                </div>
                <div className="password-container">
                    <h4 className="input-field-label">Please Enter Password</h4>
                    <input className="login-input" type="password" name="password" placeholder="password" onChange={handleInput}/>
                </div>
                
            </form>
            <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
    )
}