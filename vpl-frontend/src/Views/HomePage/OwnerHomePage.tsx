import React from "react";
import './OwnerHomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getAllUsers } from "../../Slices/UserSlice";

export const OwnerHomePage: React.FC = () => {
    const ownerInfo = useSelector((state: RootState) => state.user);
    const navigator = useNavigate();
    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (!ownerInfo.isLoggedIn) {
          console.log("this ran and went back to login");
          navigator('/login');
        }
        /*
        else{
          //console.log(userInfo);
        }
        // dispatch(getAllResolved());
        */
      }, [ownerInfo.isLoggedIn]);


    //handler for getting all user info
    const handleGetAllUsers = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(getAllUsers());
    }

    return(
        <div className="owner-home-page">
            <Navbar/>
            <div className="owner-home-body">
                {/* 1st row */}
                <div className="Owner-row1">
                    <div className="action-container">
                        <h3 className="textHeader"> Add a New Book</h3>
                        <Link to="/addbook" style={{ textDecoration: 'none' }}>
                            <button className="owner-action-button1">New Book</button>
                        </Link>
                    </div>

                    <div className="action-container">
                        <h3 className="textHeader">Delete a Book</h3>

                        <Link to="/deletebook" style={{ textDecoration: 'none' }}>
                            <button className="owner-action-button2">Delete Book</button>
                        </Link>
                    </div>
                </div>

      {/* 2nd row */}
                <div className="Owner-row2">
                    <div className="action-container">
                        <h3 className="textHeader">Update a Book Listing</h3>
                      
                        <Link to="/search" style={{ textDecoration: 'none' }}>
                        <button className="owner-action-button3" >
                        Update Book
                        </button>
                        </Link>
                    </div>
                    <div className="action-container">
                        <h3 className="textHeader">View all User Accounts</h3>
                        <Link to="/allusers" style={{ textDecoration: 'none' }}>
                        <button className="owner-action-button4" onClick={handleGetAllUsers}>
                        View all Users
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
