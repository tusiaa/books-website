import React from 'react'

const Pagination = ({ChangePage, ChangeBooksOnPage, Pages, Page, BooksOnPage}) => {

    return (
        <div className='pagination'>
            <button onClick={() => ChangePage(Math.max(Page-1, 1))} >{'<'}</button>
            
            {[...Array(Pages).keys()].map(page => {
                if(page+1 !== Page) return(<button key={page} onClick={() => ChangePage(page+1)} >{page+1}</button>)
                else return(<button key={page} style={{backgroundColor: '#333', color: 'white'}} onClick={() => ChangePage(page+1)} >{page+1}</button>)
            })}

            <button onClick={() => ChangePage(Math.min(Page+1, Pages))} >{'>'}</button>
            
            <select onChange={(e) => {ChangeBooksOnPage(e.target.value); ChangePage(1)}} >
                <option selected disabled hidden>{BooksOnPage}</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>
            <label>Liczba książek na stronie: </label>
        </div>
    )
}

export default Pagination
