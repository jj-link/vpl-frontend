
import React from 'react';
import './PopularBooksPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const PopularBooksPage: React.FC<any> = () => {
  const bookInfo = useSelector((state: RootState) => state.book);
  // const navigator = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className='page-popular-books'>
        <Navbar />
        <div className="popular-page-title">
            <h3 className='popular-page-header'>Popular Books</h3>
        </div>

        {bookInfo.popularbooks?.map((book) => {
          return (
            <div className = 'popular-page-book-container'>
              <div className='popular-page-book-details' key={book.bookId}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>GenreId: {book.bookId}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Summay: {book.summary}</p>
              </div>
            </div>
          );
        })}

        <div className="popular-page-home-button">
          <Link to="/home">
            <button className='popular-page-back-btn'>back</button>
          </Link>
        </div>
    </div>
  );
};
