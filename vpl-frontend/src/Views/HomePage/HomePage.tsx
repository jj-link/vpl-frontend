import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";

export const HomePage: React.FC = () => {
    const userInfo = useSelector((state: RootState) => state.user);
    const navigator = useNavigate();

    useEffect(() => {
        if (!userInfo.isLoggedIn) {
          console.log("this ran and went back to login");
          navigator('/login');
        }
        else{
          //console.log(userInfo);
        }
        // dispatch(getAllResolved());
      }, [userInfo.isLoggedIn]);

    return(
        <div className="home-page">
            <Navbar/>
            <h2>Welcome to the Home Page</h2>
            <h3>We got a user but we dont have a controller to retrive details yet</h3>
        </div>
    )
}
