import React from 'react'
import PropTypes from 'prop-types'

export const BooksRow = ({titulo, precio, autor, genero}) => {
  return (
    <tr>
    <th scope="row">{titulo}</th>
    <td>{precio}</td>
    <td>{autor.nombre}</td>
    <td>{genero.nombre}</td>
    <td>
        <div className="d-flex justify-content-around">
            <button className='btn btn-sm btn-success' style={{ width: '30px' }} ><i className='fas fa-edit'></i></button>
            <button className='btn btn-sm btn-danger' style={{ width: '30px' }} ><i className='fas fa-trash'></i></button>
        </div>
    </td>
</tr>
  )
}

BooksRow.propTypes = {
  titulo: PropTypes.string,
  precio: PropTypes.number,
  autor:  PropTypes.object,
  genero: PropTypes.object
}
