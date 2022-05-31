import React, { useEffect } from 'react';
//import './RegistrationPage.css';
import './LoginPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';

//import { ToastContainer, toast } from 'react-toastify';
//import { Spinner } from '../../Components/Spinner/Spinner';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if (userState.isLoggedIn != false) {
      console.log(userState.user?.userRole);
      if(userState.user?.userRole == 2){
        navigator('/ownerhome')
      }
      else{
      navigator('/userhome');
      }
    }
    else{
      console.log("credentials failed");
    }
  }, [userState.isLoggedIn, userState.user?.userRole]);


  return (

    <div className="loginPage">
      {userState.error ? (
        <h2 className="loginError">Email or password incorrect</h2>
      ) : null}

      <LoginForm/>
    </div>
  );
};
