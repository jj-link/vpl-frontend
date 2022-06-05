import React from 'react';
import './RecentBooksPage.css';
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

  const idToGenre = (genreId: number) => {
    let genre = "";
    if (genreId === 1){
      genre = "Fantasy";
    }else if(genreId === 2){
      genre = "History";
    }else if(genreId === 3){
      genre = "Romance";
    }else if(genreId === 4){
      genre = "Sci-fi";
    }else if(genreId === 5){
      genre = "Comedy";
    }else{
      genre = "Genre not found";
    }
    return genre;
  }

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
                <div className='inner-text-div'>
                  <label>Title: {book.title}</label>
                </div>
                <div className='inner-text-div'>
                  <label>Author: {book.author}</label>
                </div>
                <div className='inner-text-div'>
                  <label>Genre: {idToGenre(book.genreId)}</label>
                </div>
                <div className='inner-text-div'>
                  <label>ISBN: {book.isbn}</label>
                </div>
                <div className='inner-text-div'>
                  <label>Year Published: {book.yearPublished}</label>
                </div>
                <div className='inner-text-div'>
                  <label>Summay: {book.summary}</label>
                </div>
              </div>
              <div className='checkout-button'>
                  <button className='recent-page-book-checkout-btn' data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
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
