import React from 'react'
import {useState} from 'react'

const SearchForm = ({Search, gatunki}) => {
    const [Tekst, setTekst] = useState('')
    const [Kategoria, setKategoria] = useState('title')
    const [Gatunek, setGatunek] = useState('')
    const [Okladka, setOkladka] = useState('')
    const [Ulubione, setUlubione] = useState('')

    const UstawTekst = (event) => { setTekst(event.target.value) }
    const UstawKategoria = (event) => { setKategoria(event.target.value) }
    const UstawGatunek = (event) => { setGatunek(event.target.value) }
    const UstawOkladka = (event) => { 
        if(event.currentTarget.checked) setOkladka(event.currentTarget.checked)
        else setOkladka('')
    }
    const UstawUlubione = (event) => { 
        if(event.currentTarget.checked) setUlubione(event.currentTarget.checked)
        else setUlubione('')
    }

    return (
        <div className='container' >
            <div className='form-control' >
                <input type='text' placeholder='Wyszukaj...' onChange={UstawTekst} ></input>
                <button className='btn' onClick={() => Search([Tekst, Kategoria, Gatunek, Okladka, Ulubione])} >Szukaj</button>
            </div><div className='form-control' >
                <div>
                    <label> Szukaj po: </label>
                    <select onChange={UstawKategoria}  >
                        <option value="title">tytułach</option>
                        <option value="author">autorach</option>
                        <option value="description">opisach</option>
                    </select>
                </div><div>
                    <label> Gatunek: </label>
                    <select onChange={UstawGatunek} width= '200px' >
                        <option value={""}>Wybierz...</option>
                        {gatunki.map(gatunek => 
                            <option key={gatunek} value={gatunek}>{gatunek}</option>
                        )}
                    </select>
                </div><div>
                    <div>
                        <label> Z okładką </label>
                        <input type='checkbox' onChange={UstawOkladka} ></input>
                    </div><div>
                        <label> Ulubione </label>
                        <input type='checkbox' onChange={UstawUlubione} ></input>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchForm
