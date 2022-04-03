import React from 'react'
import Rating from "./Rating"
import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from 'react'

const BookDetails = ({ksiazki, DodajUlubione, UsunUlubione, Ulubione, setAdd, setSearch, setDoUsuniecia}) => {
    const history = useHistory();
    const {id: Id} = useParams();
    const [Ksiazka, setKsiazka] = useState({})
    useEffect(() => {
        setDoUsuniecia([])
        setAdd(false)
        setSearch(false)
    }, [setAdd, setSearch, setDoUsuniecia])
    useEffect(()=>{
        setKsiazka(ksiazki.find(a => a.id === Number(Id)))  
    },[Id, ksiazki]);

    return (
        <div className='container book2'>
            <div className='col1'>
                { Ksiazka.image_url && <img className='okladka2' alt="" src={Ksiazka.image_url}></img>}
                { !Ksiazka.image_url && <img className='okladka2' alt="" src={'https://zdrowepodejscie.pl/Photos/nophoto.jpg'}></img>}
                <Rating Rating={Ksiazka.rating} Id={Id} />
                {Ksiazka.rating !== undefined && Ksiazka.rating !== null && <h3> Ocena: {Ksiazka.rating.toFixed(2)} </h3>}
            </div>
            <div className='buttons'>
                <button className='btn' onClick={() => {setAdd(false); history.goBack()}}>Cofnij</button>
                { !Ulubione.includes(Ksiazka.id) && <button className='fav' onClick={() => DodajUlubione(Ksiazka.id)} > Ulubione </button>}
                { Ulubione.includes(Ksiazka.id) && <button className='fav2' onClick={() => UsunUlubione(Ksiazka.id)} > Ulubione </button>} 
            </div>
            <h1> {Ksiazka.title} </h1>
            <h1> {Ksiazka.author} </h1>
            <h2> Gatunek: {Ksiazka.genre} </h2>
            {Ksiazka.release_date !== undefined && 
                <h2> Data wydania:  
                    <div style={{display: 'inline-block'}}>{
                        new Date(Ksiazka.release_date).toLocaleDateString('en-CA')
                    }</div> 
                </h2>
            }
            <h3> {Ksiazka.description} </h3>
            
            
            
            
                    
        </div>
    )
}

export default BookDetails
