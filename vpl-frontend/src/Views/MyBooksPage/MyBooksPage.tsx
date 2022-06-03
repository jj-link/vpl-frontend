import React from 'react';
import './MyBooksPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';

export const MyBooksPage: React.FC<any> = () => {
  const bookInfo = useSelector((state: RootState) => state.book);
  // const navigator = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className='my-books-page'>
        <Navbar />
        <div className="my-books-page-title">
            <h3>My Books</h3>
        </div>

        {bookInfo.mybooks?.map((book) => {
          return (
            <div className = 'my-books-page-container'>
              <div className='my-books-page-details' key={book.bookId}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>GenreId: {book.bookId}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Summay: {book.summary}</p>
              </div>
            </div>
          );
        })}

        <div className="my-books-page-home-button">
          <Link to="/home">
            <button className='my-books-page-btn'>back</button>
          </Link>
        </div>
    </div>
  );
};
