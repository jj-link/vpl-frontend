import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { editBook } from "../../Slices/BookSlice";
import { AppDispatch, RootState } from "../../Store";
import './EditBookForm.css';

export const EditBookForm:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user.user);
    const bookInfo = useSelector((state:RootState) => state.book.book);

    const [bookId] = useState(bookInfo?.bookId);
    const [title, setTitle] = useState(bookInfo?.title);
    const [author, setAuthor] = useState(bookInfo?.author);
    const [genreId, setGenreId] = useState(bookInfo?.genreId);
    const [isbn, setIsbn] = useState(bookInfo?.isbn);
    const [yearPublished, setYearPublished] = useState(bookInfo?.yearPublished);
    const [checkedOutCount] = useState(bookInfo?.checkedOutCount);
    const [summary, setSummary] = useState(bookInfo?.summary);

    const navigator = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {}, []);

    //console.log(bookInfo);

    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "title"){
            setTitle(event.target.value);
        }
        else if(event.target.name === "author"){
            setAuthor(event.target.value);
        }
        else if(event.target.name === "summary"){
            setSummary(event.target.value);
        }
        else if(event.target.name === "isbn"){
            setIsbn(parseInt(event.target.value));
        } 
        else {
            setYearPublished(parseInt(event.target.value));
        }
    };

    const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
        if(event?.target.name === "genreId"){
            setGenreId(parseInt(event.target.value));
        }
    }

    const handleEditBook = (event:React.MouseEvent<HTMLButtonElement>) => {
        //console.log(userState.user?.userId);
        let credentials = {
            bookId: bookId,
            title: title,
            author: author,
            genreId: genreId,
            isbn: isbn,
            yearPublished: yearPublished,
            summary: summary
        };
        console.log("credentials = " + credentials.toString());
        dispatch(editBook(credentials));
        // also can go to the book detail page with updated information
        navigator('/ownerhome');
    }

    return(
        <div className="edit-book">
            <div className="edit-book-header-container">
                <h1 className="edit-book-header">Edit Book</h1>
            </div>
            <form className="edit-book-form">
                <div className="title-container">
                    <h4 className="edit-book-input-field-label">Title</h4>
                    <input className="edit-book-add-book-input" type="text" name="title" placeholder={bookInfo?.title} value={title} onChange={handleInput}/>
                </div>
                <div className="author-container">
                    <h4 className="edit-book-input-field-label">Author</h4>
                    <input className="edit-book-add-book-input" type="text" name="author" placeholder={bookInfo?.author} value={author} onChange={handleInput}/>
                </div>
                <div className="genre-id-container">
                    <h4 className="edit-book-input-field-label">Please Select Genre</h4>
                    <select className="select-genre" name="genreId" onChange={handleSelect}>
                        <option value="none" selected disabled hidden>Genre</option>
                        <option value="1">Fantasy</option>
                        <option value="2">History</option>
                        <option value="3">Romance</option>
                        <option value="4">Sci-fi</option>
                        <option value="5">Comedy</option>
                    </select>
                </div>
                <div className="summary-container">
                    <h4 className="edit-book-input-field-label">Summary</h4>
                    <input className="edit-book-add-book-input" type="text" name="summary" placeholder={bookInfo?.summary} onChange={handleInput}/>
                </div>
                <div className="isbn-container">
                    <h4 className="edit-book-input-field-label">ISBN</h4>
                    <input className="edit-book-add-book-input" type="number" name="isbn" placeholder={bookInfo?.isbn.toString()} onChange={handleInput}/>
                </div>
                <div className="year-published-container">
                    <h4 className="edit-book-input-field-label">Year Published</h4>
                    <input className="edit-book-add-book-input" type="number" name="yearPublished" placeholder={bookInfo?.yearPublished.toString()} onChange={handleInput}/>
                </div>
                
            </form>
            <div className='edit-book-buttons'>
                <button className="edit-book-edit-btn" onClick={handleEditBook}>Edit Book</button>
                <Link to={"/ownerhome"} className="nav-ownerhome">
                    <button className='edit-book-back-btn'>Back To Home</button>
                </Link>
            </div>
    
        </div>
    )

}