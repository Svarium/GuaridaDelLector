import React from 'react'
import PropTypes from 'prop-types'
import { BooksRow } from './BooksRow';

export const BooksTable = ({books}) => {

  /*   console.log(books); */

  return (
    <>
    <div className='d-flex justify-content-between'>
      <h4>Lista de productos</h4>
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
            <th scope="col">Acciones</th>
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
    books : PropTypes.array
}