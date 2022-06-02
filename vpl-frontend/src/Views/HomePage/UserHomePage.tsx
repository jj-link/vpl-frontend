import React from "react";
import './UserHomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";


export const UserHomePage: React.FC = () => {
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
            <div className="menu-bar">
              <div className='menu-buttons'>
                <button className="popular-button" >Most Popular</button>
                <button className='recent-button' >Recently Added</button>
                <button className='mybooks-button' >View My Books</button>
                <select className="select-genre" >
                        <option value="none" selected disabled hidden>Genre</option>
                        <option value="1">Fantasy</option>
                        <option value="2">History</option>
                        <option value="3">Romance</option>
                        <option value="4">Sci-fi</option>
                        <option value="5">Comedy</option>
                    </select>
              </div>
            </div>
            <div className = "home-body">
              {/* 1st row */}
              <div className="row1">
                <div className="preview-container">
                  <h3 className="preview-header"> Most Popular </h3>
                  <div className="preview-list">
                    <p className="b-row1">Popular books will go here</p>
                  </div>      
                </div>
              </div>
              <div className="row2">
                <div className="preview-container">
                  <h3 className="preview-header"> Recently Added</h3>
                  <div className="preview-list">
                    <p className="b-row2">Recently Added books will go here</p>
                  </div>
                </div>
              </div>
              <div className="row3">
                <div className="preview-container">
                  <h3 className="preview-header"> My Books</h3>
                  <div className="preview-list">
                    <p className="b-row3">Checked out books will go here</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}

