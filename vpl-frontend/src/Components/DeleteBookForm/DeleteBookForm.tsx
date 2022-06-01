import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store';
import { deleteBook} from '../../Slices/BookSlice';
import {Link} from 'react-router-dom';
//import "./DeleteBookForm.css";
export const DeleteBookForm: React.FC = () => {
    const [isbn, setIsbn] = useState<number>(0);
    const dispatch: AppDispatch = useDispatch();
    
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "isbn"){
            setIsbn(parseInt(event.target.value));
        }
    }
    const handleDeleteBook = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteBook(isbn));
    }
    return(
        <div className="delete-book">
            <div className="header-container">
                <h1 className="delete-book-header">Delete a Book</h1>
            </div>
            <form className="delete-book-form">
                <div className="input-container">
                    <h4 className="input-field-label">Please Enter isbn of book you would like to delete</h4>
                    <input className="isbn-input" type="number" name="isbn" onChange={handleInput}/>
                </div>   
            </form>
            <div className='buttons'>
                <button className="delete-button" onClick={handleDeleteBook}>Delete</button>
                <Link to={"/ownerhome"} className="nav-ownerhome">
                    <button className='back-button'>Back</button>
                </Link>
            </div>
           
        </div>
    )
}