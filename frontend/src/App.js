import Books from "./Components/Books"
import BookDetails from "./Components/BookDetails"
import Pagination from "./Components/Pagination"
import NavBar from "./Components/NavBar"
import NavBar2 from "./Components/NavBar2"
import AddEditForm from "./Components/AddEditForm"
import SearchForm from "./Components/SearchForm"
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios'

function App() {
  const [ksiazki, setKsiazki] = useState([])
  const [szukaneksiazki, setSzukaneKsiazki] = useState([])
  const [isLoading, setIsLoading]=useState(true);
  const [isError, setIsError]=useState(false);
  useEffect(()=>{
    fetch("http://localhost:3001/api/book")
    .then(async(response)=>{
      const fetchedData = await response.json()
      setKsiazki(fetchedData)
    }).catch(()=>{
      setIsError(true);
    }).finally(()=>{
      setIsLoading(false);
    });
  }, [ksiazki]);

  const [AddEdit, setAddEdit] = useState(false)
  const [Search, setSearch] = useState(false)
  const [Page, setPage] = useState(1)
  const [BooksOnPage, setBooksOnPage] = useState(10)
  const [Sort, setSort] = useState('Brak')
  const [DoUsuniecia, setDoUsuniecia] = useState([])
  const [Ulubione, setUlubione] = useState([])

  const onAdd = () => { 
    setAddEdit(!AddEdit) 
    setSearch(false)
  } 
  const onSearch = () => { 
    setSearch(!Search)
    setAddEdit(false) 
    setSzukaneKsiazki(ksiazki)
  } 
  const ChangeSort = (nazwa) => { setSort(nazwa) } 
  const ChangePage = (strona) => { setPage(strona) } 
  const ChangeBooksOnPage = (liczba) => { setBooksOnPage(liczba) } 
  const DodajDoUsuniecia = (ksiazkaid) => { setDoUsuniecia([...DoUsuniecia, ksiazkaid]) } 
  const UsunDoUsuniecia = (ksiazkaid) => { setDoUsuniecia(DoUsuniecia.filter(a => a!==ksiazkaid )) }
  const DodajUlubione = (ksiazkaid) => { setUlubione([...Ulubione, ksiazkaid]) } 
  const UsunUlubione = (ksiazkaid) => { setUlubione(Ulubione.filter(a => a!==ksiazkaid )) }
  const onDelete = () => { 
    if (DoUsuniecia.length !== 0) {
      DoUsuniecia.map(a => {
        axios.delete(`http://localhost:3001/api/book/${a}`)
        .then((response) => {
            console.log("Usunieto ksiażkę o id: " + a);
          }, (error) => {
            console.log("Błąd!");
          });
        return a
      })
      setDoUsuniecia([])
      alert("Usunięto ksiązki!")
      setSzukaneKsiazki( szukaneksiazki.filter(ksiazka => 
        DoUsuniecia.map(a => ksiazka.id!==a).reduce((a,b) => a && b) ) )
      setKsiazki( ksiazki.filter(ksiazka => 
        DoUsuniecia.map(a => ksiazka.id!==a).reduce((a,b) => a && b) ) ) 
    } else {
      alert("Brak zaznaczonych książek do usunięcia!")
    }
  }
  const onDelete2 = (id) => { 
    axios.delete(`http://localhost:3001/api/book/${id}`)
        .then((response) => {
            alert("Usunięto ksiązkę!")
            console.log("Usunieto ksiażkę o id: " + id);
          }, (error) => {
            console.log("Błąd!");
          });
    setKsiazki( ksiazki.filter(ksiazka => ksiazka.id!==id))
    setAddEdit(false) 
  }  
  const UsuwaniePowtorzen = (a,b) => {
    if(a.includes(b)) return a
    else return [...a, b]
  }
  const toSearch = (wymagania) => {
    setSzukaneKsiazki( ksiazki
      .filter(ksiazka => ksiazka[wymagania[1]].includes(wymagania[0]) || wymagania[0]=== "" )
      .filter(ksiazka => ksiazka.genre === wymagania[2] || wymagania[2]=== "" ) 
      .filter(ksiazka => ksiazka.image_url !== null || wymagania[3]=== "" )
      .filter(ksiazka => Ulubione.includes(ksiazka.id) || wymagania[4]=== "" )
    )
    setPage(1)
  }

  return (
    <div>
      {isError && <h1> Błąd! </h1>}
      {isLoading && <h1> Ładowanie... </h1>}
      {!isError && !isLoading && <Router>
        <Switch>

          <Route exact path="/book/:id">
            <NavBar2 onDelete={onDelete2} onEdit={onAdd} setAdd={setAddEdit} />
            {AddEdit && <AddEditForm ksiazki = {ksiazki} setAdd={setAddEdit} />}
            < BookDetails ksiazki = {ksiazki} DodajUlubione={DodajUlubione} UsunUlubione={UsunUlubione} Ulubione={Ulubione} setAdd={setAddEdit} setSearch={setSearch} setDoUsuniecia={setDoUsuniecia} />
          </Route>

          <Route exact path="/">
            <NavBar onDelete={onDelete} onAdd={onAdd} onSearch={onSearch} ChangeSort={ChangeSort} setAdd={setAddEdit} setSearch={setSearch}/>

            {AddEdit && <AddEditForm ksiazki = {ksiazki} setAdd={setAddEdit} />}
            {Search && <SearchForm Search={toSearch} gatunki={ksiazki.map(a => a.genre).reduce(UsuwaniePowtorzen, [])} />}

            {!Search && <Pagination ChangePage={ChangePage} ChangeBooksOnPage={ChangeBooksOnPage} Pages={Math.ceil(ksiazki.length / BooksOnPage)} Page={Page} BooksOnPage={BooksOnPage} />}
            {!Search && <Books ksiazki={ksiazki} Page={Page} BooksOnPage={BooksOnPage} SetSort={Sort} DodajDoUsuniecia={DodajDoUsuniecia} UsunDoUsuniecia={UsunDoUsuniecia} DoUsuniecia={DoUsuniecia} DodajUlubione={DodajUlubione} UsunUlubione={UsunUlubione} Ulubione={Ulubione} />}

            {Search && <Pagination ChangePage={ChangePage} ChangeBooksOnPage={ChangeBooksOnPage} Pages={Math.ceil(szukaneksiazki.length / BooksOnPage)} Page={Page} />}
            {Search && <Books ksiazki={szukaneksiazki} Page={Page} BooksOnPage={BooksOnPage} SetSort={Sort} DodajDoUsuniecia={DodajDoUsuniecia} UsunDoUsuniecia={UsunDoUsuniecia} DoUsuniecia={DoUsuniecia} DodajUlubione={DodajUlubione} UsunUlubione={UsunUlubione} Ulubione={Ulubione} />}
          
          </Route>

        </Switch>
      </Router>}
    </div>
  );
}

export default App;
