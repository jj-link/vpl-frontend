import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';
import { checkoutBook, getAllBooks, getBookByIsbn } from '../../Slices/BookSlice';
import { Navbar } from '../Navbar/Navbar';
import { UserInfo } from 'os';

// import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const BookList: React.FC<any> = () => {
  const allbooks = useSelector((state: RootState) => state.book.books);
  const userRole = useSelector((state: RootState) => state.user.user?.userRole);
  const userInfo = useSelector((state: RootState) => state.user)
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

  return (
    <div className='booklist'>
      <Navbar/>
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
              <div className='book-buttons'>  
              { isOwner()?  
                <div className='update-button'> 
                  <button data-id={book.isbn} onClick={handleUpdate}>Update</button>
                </div> :
                <div className='checkout-button'>
                  <button data-id={book.isbn} onClick={handleCheckout}>Checkout</button>
                </div> }
              </div> 
            </div>
          );
        })}

        <div className="home-button">
          { isOwner()?
          <Link to="/ownerhome">
            <button>back</button>
          </Link> :
          <Link to="/userhome">
            <button>back</button>
          </Link>
          }
        </div>
    </div>
  );
};
