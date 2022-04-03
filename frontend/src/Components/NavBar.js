import React from 'react'
import {useState} from 'react'


const NavBar = ({onDelete, onAdd, onSearch, ChangeSort, setAdd, setSearch}) => {
    const [Sort, setSort] = useState('Brak')
    const SetSort = (nazwa) =>{
        setSort(nazwa)
        ChangeSort(nazwa)
    }
    
    return (
        <ul className='nav-bar'>
            <div className='el' >
                
            </div>
            <div className='el' >
                <li className='nav-bar-left nav-logo' onClick={() => {setAdd(false); setSearch(false)}} >Baza książek</li>
                <li className='nav-bar-right'><button className='nav-element' onClick={onDelete}> Usuń </button></li>
                <li className='nav-bar-right'><button className='nav-element' onClick={onAdd}> Dodaj </button></li>
                <li className='nav-bar-right'><button className='nav-element' onClick={onSearch}> Szukaj </button></li>
            </div><div className='el' >
                <li className='nav-bar-right nav-element dropdown'>{Sort}
                    <div className="dropdown-content">
                        <button className='nav-element' onClick={() => SetSort("Wg tytułu")}>Wg tytułu</button>
                        <button className='nav-element' onClick={() => SetSort("Wg autora")}>Wg autora</button>
                        <button className='nav-element' onClick={() => SetSort("Wg daty wydania")}>Wg daty wydania</button>
                        <button className='nav-element' onClick={() => SetSort("Wg ocen")}>Wg ocen</button>
                    </div>        
                </li>
                <li className='nav-bar-right nav-logo nav-sort'>Sortowanie:</li>
            </div>
        </ul>
    )
}

export default NavBar
