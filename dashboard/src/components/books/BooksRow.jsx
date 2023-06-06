import React from 'react'
import PropTypes from 'prop-types'

export const BooksRow = ({titulo, precio, autor, genero, imagen, description2}) => {
  return (
    <tr>
    <th scope="row">{titulo}</th>
    <td>{precio}</td>
    <td>{autor.nombre}</td>
    <td>{genero.nombre}</td>
    <td>
    {description2.slice([0], [200])}...
    </td>
    <td> { <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "20rem" }}
              src={imagen}
              alt={titulo}
            />}</td>
</tr>
  )
}

BooksRow.propTypes = {
  titulo: PropTypes.string,
  precio: PropTypes.number,
  autor:  PropTypes.object,
  genero: PropTypes.object
}
