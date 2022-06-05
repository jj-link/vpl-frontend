import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { checkoutBook, getAllBooks, getBookByIsbn, searchBooks } from '../../Slices/BookSlice';
import { Navbar } from '../Navbar/Navbar';
import { UserInfo } from 'os';
import './BookList.css';
// import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const BookList: React.FC<any> = () => {
  const allbooks = useSelector((state: RootState) => state.book.books);
  const searchResults = useSelector((state: RootState) => state.book.searchResults)
  const userRole = useSelector((state: RootState) => state.user.user?.userRole);
  const userInfo = useSelector((state: RootState) => state.user)
  const [search, setSearch] = useState<string>("");
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isOwner=() => {
      if(userRole == 2){
        return true;
      }
      else{
        return false;
      }
  }

  useEffect(() => {
    if (!userInfo.isLoggedIn) {
      console.log("this ran and went back to login");
      navigator('/login');
    }
    else {
      dispatch(getAllBooks())
    }
  }, [userInfo.isLoggedIn]);



  const handleUpdate=(event: React.MouseEvent<HTMLButtonElement>) =>{
    let value = parseInt(event.currentTarget.getAttribute("data-id")!);
    dispatch(getBookByIsbn(value));
    navigator('/updatebook');
  }

  const handleCheckout=(event: React.MouseEvent<HTMLButtonElement>) =>{

    let credentials = {
      userId: userInfo.user?.userId,
      isbn: 0
    }

    credentials.isbn = parseInt(event.currentTarget.getAttribute("data-id")!);
    dispatch(checkoutBook(credentials));
    navigator('/userhome');
  }


  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
  }

  const handleSearch=(event: React.MouseEvent<HTMLButtonElement>) =>{
    // add %20 in place of any spaces
    dispatch(searchBooks(search));
    navigator('/search/results');
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
    <div className='book-list-form'>
      <Navbar/>
        <div className="book-list-form-title">
            <h3>Search for a Book</h3>
        </div>
        <div className='search-container'>
        <input className="search-field" type="text" name="search-box" value={search} onChange={handleInput}/>
        <button className="search-button" onClick={handleSearch}>find book</button>
        </div>
        {allbooks?.map((book) => {
          return (
            <div className = 'book-list-form-container'>
              <div className='book-list-form-details'>
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
                  <label>Checked Out Count: {book.checkedOutCount}</label>
                </div>
                <div className='inner-text-div'>
                  <label>Summary: {book.summary}</label>
                </div>
              </div>
              <div className='book-buttons'>  
              { isOwner()?  
                <div className='book-list-form-update-button'> 
                  <button className='book-list-form-update-btn' data-id={book.isbn} onClick={handleUpdate}>Update</button>
                </div> :
                <div className='book-list-form-checkout-button'>
                  <button className='book-list-form-checkout-btn' data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
                </div> }
              </div> 
            </div>
          );
        })}
        <div className="book-list-form-home-button">
        { isOwner()?
          <Link to="/ownerhome">
            <button className='book-list-owner-home-btn'>back</button>
          </Link> :
          <Link to="/userhome">
            <button className='book-list-user-home-btn'>back</button>
          </Link>
          }
        </div>
    </div>
  );
};
