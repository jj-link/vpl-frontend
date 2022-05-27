import React, { useEffect } from 'react';
//import './RegistrationPage.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../Store';
import { useNavigate } from 'react-router-dom';

import { RegistrationForm } from '../../Components/RegistrationForm/RegistrationForm';

//import { ToastContainer, toast } from 'react-toastify';

//import { Spinner } from '../../Components/Spinner/Spinner';

// will go inside App tsx
export const RegistrationPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();



  useEffect(() => {
    navigator('/login');
    console.log("hello robert");
  }, [userState.isRegistered]);

  /*
    useEffect(() => {

    }, [])
*/
  return (

    <div className="registrationPage">
      {userState.error ? (
        <h2 className="registrationError">Email address already taken</h2>
      ) : null}

      <RegistrationForm/>
    </div>
  );
};
