import { useEffect, useState } from "react";
import { BooksTable } from '../components/books/BooksTable'

import { UseFetch } from "../hooks/UseFetch";

export const Books = () => {

const [state, setState] = useState({
  loading: true,
  books: [],
  pages : null,
  currentPage: null
});


useEffect(() => {

  UseFetch('/libros?withPagination=true')
  .then(({ok, data})=>{
    ok &&
    console.log(data);
    setState({
      loading : false,
      books : data.libros,
      pages: data.pages,
      currentPage:data.currentPage
    })
  })
  .catch(() => console.error)
}, [])

const handleGetPage = (page) => {
  UseFetch(`/libros?withPagination=true&page=${page}`)
  .then(({ok, data})=>{
    ok &&
   /*  console.log(data); */
    setState({
      loading : false,
      books : data.libros,
      pages: data.pages,
      currentPage:data.currentPage
    })
  })
  .catch(() => console.error)
}

  return (
    <div className="container">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <BooksTable books = {state.books}
                        pages = {state.pages}
                        currentPage = {state.currentPage}
                        handleGetPage = {handleGetPage}               
             />
          </div>
          <div className="col-12 col-md-5">
            
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
