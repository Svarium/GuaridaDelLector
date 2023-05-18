import React from 'react'

export const LastBookCard = ({titulo, description2, video, precio, imagen}) => {
  return (
    <div className="card-body">
          <div className="text-center">
            <p>{titulo}</p>
      

           { <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "20rem" }}
              src={imagen}
              alt={titulo}
            />}
          </div>
          <p className="text-center">
            {description2}
          </p>       
          <a className="btn btn-danger text-center" target="_blank" rel="nofollow" href={video}>
            Reseña del Libro
          </a>          
         
        </div>
  )
}
