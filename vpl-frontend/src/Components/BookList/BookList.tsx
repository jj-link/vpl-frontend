import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store'
// import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const BookList: React.FC<any> = () => {
  const allbooks = useSelector((state: RootState) => state.book.books);
  // const navigator = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  return (
    <div className='booklist'>
        <div className="page-title">
            <h3>All book detail list from BookList Component.</h3>
        </div>
        {allbooks?.map((book) => {
          return (
            <div className = 'book-container'>
              <div className='book-details'>
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

        <div className="home-button">
          <Link to="/userhome">
            <button>back</button>
          </Link>
        </div>
    </div>
  );
};
