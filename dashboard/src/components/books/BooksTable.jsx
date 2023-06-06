import React from 'react'
import PropTypes from 'prop-types'
import { BooksRow } from './BooksRow';

export const BooksTable = ({books, pages, currentPage, handleGetPage}) => {

    console.log(pages);
  const paginator = []
  for (let i = 1; i <= pages; i++) {
    paginator.push(i);    
  }

  return (
    <>
    <div className='d-flex justify-content-between'>
      <h4>Lista de productos</h4>
      <nav aria-label="Page navigation example">
  <ul class="pagination pagination-sm">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" onClick={() => handleGetPage(currentPage - 1)}>
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    {
      paginator.map(page => (
        <li key={page} className={`page-item ${page === currentPage && "active"}`}>
          <a class="page-link" href="#" onClick={() => handleGetPage(page)}>
        {page}</a></li>    
      ))
    }
   
   
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" onClick={() => handleGetPage(currentPage + 1)}>
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
    <hr />

    <div className='table-responsive'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Titulo</th>
            <th scope="col">Precio</th>
            <th scope="col">Autor</th>
            <th scope="col">Genero</th>
            <th scope="col">Descripción</th>
            <th scope="col">Portada</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((book, index) => (
              <BooksRow
              key={index}
                {...book}
              />
            ))
          }

        </tbody>
      </table>
    </div>
  </>
  )
}

BooksTable.propTypes = {
    books : PropTypes.array,
    page : PropTypes.number,
    currrentPage : PropTypes.number,
    handleGetPage : PropTypes.function
}