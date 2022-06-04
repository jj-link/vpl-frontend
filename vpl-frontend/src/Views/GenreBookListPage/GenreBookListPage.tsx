
import React, { useEffect } from 'react';
import './GenreBookListPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';
import { checkoutBook } from '../../Slices/BookSlice';

// go inside App for routing
export const GenreBookListPage: React.FC<any> = () => {
  const bookInfo = useSelector((state: RootState) => state.book);
  const userInfo = useSelector((state: RootState) => state.user)
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleCheckout=(event: React.MouseEvent<HTMLButtonElement>) =>{

    let credentials = {
      userId: userInfo.user?.userId,
      isbn: 0
    }

    credentials.isbn = parseInt(event.currentTarget.getAttribute("data-id")!);
    dispatch(checkoutBook(credentials));
    navigator('/userhome');
  }

  useEffect(() =>{
    console.log("in useeffect");
    console.log(bookInfo.genrebooklist);
  },[bookInfo])
  

  return (
    <div className='genre-list-books'>
        <Navbar />
        <div className="genre-list-page-title">
            <h3>Books by Genre: </h3>
        </div>

        {bookInfo.genrebooklist?.map((book) => {
          return (
            <div className = 'genre-list-book-container'>
              <div className='genre-list-book-details' key={book.bookId}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>GenreId: {book.genreId}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Summay: {book.summary}</p>
              </div>
              <div className='genre-list-checkout-button'>
                  <button className='genre-list-checkout-btn' data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          );
        })}

        <div className="genre-list-home-button">
          <Link to="/home">
            <button className='genre-list-home-btn'>back</button>
          </Link>
        </div>
    </div>
  );
};
