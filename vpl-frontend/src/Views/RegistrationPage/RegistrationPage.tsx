import React, { useEffect } from 'react';
import './RegistrationPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';

import { RegistrationForm } from '../../Components/RegistrationForm/RegistrationForm';

// will go inside App tsx
export const RegistrationPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if(userState.isRegistered !== true){
      console.log("if were not registered yet we dont go anywhere");
    }
    else{
      console.log("user has regesitered and sent to loginpage")
      navigator('/login');
    }
    console.log("hello robert");
  }, [userState.isRegistered, navigator]);

  return (
    <div className="registrationPage">
      {userState.error ? (
        <h2 className="registrationError">Email address already taken</h2>
      ) : null}

      <RegistrationForm/>
    </div>
  );
};
