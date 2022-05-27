import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export const HomePage: React.FC = () => {
    const userInfo = useSelector((state: RootState) => state.user);
    const navigator = useNavigate();

    useEffect(() => {
        if (!userInfo.user) {
          console.log("this ran and went back to login");
          navigator('/login');
        }
        else{
          console.log(userInfo);
        }
        // dispatch(getAllResolved());
      }, [userInfo]);

    return(
        <div className="home-page">
            <h2>Welcome to the Home Page</h2>
            <h3>We got a user but we dont have a controller to retrive details yet</h3>
        </div>
    )
}
