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
          navigator('/login');
        }
        // dispatch(getAllResolved());
      }, [userInfo]);

    return(
        <div className="home-page">
            <h2>Welcome to the Home Page</h2>

        </div>
    )
}
