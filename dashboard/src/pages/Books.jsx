import { useEffect, useState } from "react";
import { BooksTable } from '../components/books/BooksTable'
import { BookAdd } from '../components/books/BookAdd'
import { UseFetch } from "../hooks/UseFetch";

export const Books = () => {

const [state, setState] = useState({
  loading: true,
  books: [],
});


useEffect(() => {

  UseFetch('/libros?withPagination=false')
  .then(({ok, data})=>{
    ok &&
   /*  console.log(data); */
    setState({
      loading : false,
      books : data.libros

    })
  })
  .catch(() => console.error)
}, [])




  return (
    <div className="container">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-7">
            <BooksTable books = {state.books}/>
          </div>
          <div className="col-12 col-md-5">
            <BookAdd />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
