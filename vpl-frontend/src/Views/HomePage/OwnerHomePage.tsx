import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";

export const OwnerHomePage: React.FC = () => {
    const ownerInfo = useSelector((state: RootState) => state.user);
    const navigator = useNavigate();

    {/*
    useEffect(() => {
        if (!ownerInfo.isLoggedIn) {
          console.log("this ran and went back to login");
          navigator('/login');
        }
        else{
          //console.log(userInfo);
        }
        // dispatch(getAllResolved());
      }, [ownerInfo.isLoggedIn]);

    */}

    return(
        <div className="owner-home-page">
            <Navbar/>
            <div className="owner-home-body">
                {/* 1st row */}
                <div className="row1">
                    <div className="action-container">
                        <h3 className="textHeader"> Add a New Book</h3>
                        <Link to="/addbook" style={{ textDecoration: 'none' }}>
                            <button className="action-button">New Book</button>
                        </Link>
                    </div>

                    <div className="action-container">
                        <h3 className="textHeader">Delete a Book</h3>

                        <Link to="/deletebook" style={{ textDecoration: 'none' }}>
                            <button className="action-button">Delete Book</button>
                        </Link>
                    </div>
                </div>

      {/* 2nd row */}
                <div className="row2">
                    <div className="action-container">
                        <h3 className="textHeader">Update a Book Listing</h3>

                        <Link to="/updatebook" style={{ textDecoration: 'none' }}>
                        <button className="action-button" >
                        Update Book
                        </button>
                        </Link>
                    </div>
                    <div className="action-container">
                        <h3 className="textHeader">View all User Accounts</h3>
                        <Link to="/allusers" style={{ textDecoration: 'none' }}>
                        <button className="action-button" >
                        View all Users
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
