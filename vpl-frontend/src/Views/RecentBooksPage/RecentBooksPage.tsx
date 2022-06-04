import React from 'react';
//import './RecentBooksPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';
import { checkoutBook } from '../../Slices/BookSlice';

// go inside App for routing
export const RecentBooksPage: React.FC<any> = () => {
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

  return (
    <div className='recent-books'>
        <Navbar />
        <div className="page-title">
            <h3>Recent Books</h3>
        </div>

        {bookInfo.recentbooks?.map((book) => {
          return (
            <div className = 'book-container'>
              <div className='book-details' key={book.bookId}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>GenreId: {book.genreId}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Summay: {book.summary}</p>
              </div>
              <div className='checkout-button'>
                  <button data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          );
        })}

        <div className="home-button">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
    </div>
  );
};
