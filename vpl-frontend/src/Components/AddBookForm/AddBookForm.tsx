import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store';
import { addBook } from '../../Slices/BookSlice';
import {Link} from 'react-router-dom';

export const AddBookForm: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [genreId, setGenreId] = useState<number>(0);
    const [summary, setSummary] = useState<string>(""); 
    const [checkedOutCount] = useState<number>(0);
    const [isbn, setIsbn] = useState<number>(0);
    const [yearPublished, setYearPublished] = useState<number>(0);
    
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
    }

    const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
        if(event.target.name === "genreId"){
            setGenreId(parseInt(event.target.value));
        }
    }

    const handleAddBook = (event:React.MouseEvent<HTMLButtonElement>) => {
        let credentials = {title, author, genreId, summary, checkedOutCount, isbn, yearPublished};
        dispatch(addBook(credentials));
    }
    
    return(
        <div className="add-book">
            <div className="header-container">
                <h1 className="add-book-header">Add New Book</h1>
            </div>
            <form className="add-book-form">
                <div className="title-container">
                    <h4 className="input-field-label">Please Enter Book Title</h4>
                    <input className="add-book-input" type="text" name="title" onChange={handleInput}/>
                </div>
                <div className="author-container">
                    <h4 className="input-field-label">Please Enter Author Name</h4>
                    <input className="add-book-input" type="text" name="author" onChange={handleInput}/>
                </div>
                <div className="genreId-container">
                    <h4 className="input-field-label">Please Select Genre</h4>
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
                    <h4 className="input-field-label">Please Enter Summary</h4>
                    <input className="add-book-input" type="text" name="summary" onChange={handleInput}/>
                </div>
                <div className="isbn-container">
                    <h4 className="input-field-label">Please Enter ISBN</h4>
                    <input className="add-book-input" type="number" name="isbn" onChange={handleInput}/>
                </div>
                <div className="year-published-container">
                    <h4 className="input-field-label">Please Enter Year Published</h4>
                    <input className="add-book-input" type="number" name="yearPublished" onChange={handleInput}/>
                </div>
                
            </form>
            <div className='add-book-buttons'>
                <button className="add-button" onClick={handleAddBook}>Add Book</button>
                <Link to={"/ownerhome"} className="nav-ownerhome">
                    <button className='back-button'>Back To Home</button>
                </Link>
            </div>
    
        </div>
    )
}