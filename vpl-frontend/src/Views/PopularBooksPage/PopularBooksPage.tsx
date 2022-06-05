
import React from 'react';
import './PopularBooksPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store'
import { Navbar } from '../../Components/Navbar/Navbar';
import { checkoutBook } from '../../Slices/BookSlice';

// go inside App for routing
export const PopularBooksPage: React.FC<any> = () => {
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
    <div className='page-popular-books'>
        <Navbar />
        <div className="popular-page-title">
            <h3 className='popular-page-header'>Popular Books</h3>
        </div>

        {bookInfo.popularbooks?.map((book) => {
          return (
            <div className = 'popular-page-book-container'>
              <div className='popular-page-book-details' key={book.bookId}>
                <div className='popular-book-text'>
                  <label>Title: {book.title}</label>
                </div>
                <div className='popular-book-text'>
                  <label>Author: {book.author}</label>
                </div>
                <div className='popular-book-text'>
                  <label>Genre: {idToGenre(book.genreId)}</label>
                </div>
                <div className='popular-book-text'>
                  <label>ISBN: {book.isbn}</label>
                </div>
                <div className='popular-book-text'>
                  <label>checkedOutCount: {book.checkedOutCount}</label>
                </div>
                <div className='popular-book-text'>
                  <label>Summay: {book.summary}</label>
                </div>
              </div>
              <div className='checkout-button'>
                  <button className='popular-page-book-checkout-btn' data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
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
