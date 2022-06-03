
import './UserHomePage.css';
import React, {useState}from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { getAllBooks, getPopularBooks, getRecentBooks, getMyBooks } from "../../Slices/BookSlice";



export const UserHomePage: React.FC = () => {

  const userInfo = useSelector((state: RootState) => state.user);
  const bookInfo = useSelector((state: RootState) => state.book);
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [userId] = useState<number>(userInfo.user?.userId!);

  useEffect(() => {
      if (!userInfo.isLoggedIn) {
        console.log("this ran and went back to login");
        navigator('/login');
      }
      else {
        dispatch(getPopularBooks());
        dispatch(getRecentBooks());
        dispatch(getMyBooks(userId));
      }
    }, [userInfo.isLoggedIn]);

  const handleGetAllBooks = (event: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(getAllBooks());
  }
    

  return(
    <div className="home-page">
        <Navbar/>
        <div className="menu-bar">
          <div className='menu-buttons'>
            <Link to="/popularbooks"><button className="popular-button">Most Popular</button></Link>
            <Link to="/recentbooks"><button className='recent-button' >Recently Added</button></Link>
            <Link to="/mybooks"><button className='mybooks-button' >View My Books</button></Link>
            <select className="select-genre" >
                    <option selected disabled hidden>Genre</option>
                    <option value="1">Fantasy</option>
                    <option value="2">History</option>
                    <option value="3">Romance</option>
                    <option value="4">Sci-fi</option>
                    <option value="5">Comedy</option>
            </select>
            <Link to="/search">
              <button className='search-button' onClick={handleGetAllBooks}>Search</button>
            </Link> 
          </div>
        </div>
        <div className = "home-body">
          <div className="row1">
            <div className="preview-container">
              <Link to="/popularbooks"><h3 className="preview-header">Most Popular</h3></Link>
              <div className="preview-list">
                <p>Popular books will go here</p>
                {bookInfo.popularbooks?.map((book) => {
                  return (
                    <div className = 'book-container'>
                      <div className='book-details' key={book.bookId}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author}</p>
                        <p>GenreId: {book.bookId}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Year Published: {book.yearPublished}</p>
                        <p>Checked Out Count: {book.checkedOutCount}</p>
                        <p>Summary: {book.summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>      
            </div>
          </div>
          <div className="row2">
            <div className="preview-container">
              <Link to="/recentbooks"><h3 className="preview-header">Recently Added</h3></Link>
              <div className="preview-list">
                <p>Recently Added books will go here</p>
                {bookInfo.recentbooks?.map((book) => {
                  return (
                    <div className = 'book-container'>
                      <div className='book-details' key={book.bookId}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author}</p>
                        <p>GenreId: {book.bookId}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Year Published: {book.yearPublished}</p>
                        <p>Checked Out Count: {book.checkedOutCount}</p>
                        <p>Summary: {book.summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row3">
            <div className="preview-container">
              <Link to="/mybooks"><h3 className="preview-header">My Books</h3></Link>
              <div className="preview-list">
                <p>Checked out books will go here</p>
                {bookInfo.mybooks?.map((book) => {
                  return (
                    <div className = 'book-container'>
                      <div className='book-details' key={book.bookId}>
                        <p>Title: {book.title}</p>
                        <p>Author: {book.author}</p>
                        <p>GenreId: {book.bookId}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Year Published: {book.yearPublished}</p>
                        <p>Checked Out Count: {book.checkedOutCount}</p>
                        <p>Summary: {book.summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

