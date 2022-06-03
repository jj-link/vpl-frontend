import React from 'react';
import './RecentBooksPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const RecentBooksPage: React.FC<any> = () => {
  const bookInfo = useSelector((state: RootState) => state.book);
  // const navigator = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className='recent-page-books'>
        <Navbar />
        <div className="recent-page-title">
            <h3>Recent Books</h3>
        </div>

        {bookInfo.recentbooks?.map((book) => {
          return (
            <div className = 'recent-page-book-container'>
              <div className='recent-page-book-details' key={book.bookId}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>GenreId: {book.bookId}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Summay: {book.summary}</p>
              </div>
            </div>
          );
        })}

        <div className="recent-page-home-button">
          <Link to="/home">
            <button className='recent-page-btn'>back</button>
          </Link>
        </div>
    </div>
  );
};
