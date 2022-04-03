import React from 'react'
import {useParams, useHistory} from "react-router-dom";

const NavBar2 = ({onDelete, onEdit, setAdd}) => {
    const history = useHistory();
    const {id: Id} = useParams();

    return (
        <ul className='nav-bar'>
            <li className='nav-bar-left2 nav-logo' onClick={() => {history.goBack(); setAdd(false)}}>Baza książek</li>
            <li className='nav-bar-right'><button className='nav-element' onClick={() => {onDelete(Id); history.goBack()}}> Usuń </button></li>
            <li className='nav-bar-right'><button className='nav-element' onClick={() => onEdit(Id)}> Edytuj </button></li>
            
        </ul>
    )
}

export default NavBar2
