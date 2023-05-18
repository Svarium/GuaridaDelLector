import React, { useState } from 'react'
import { useEffect } from 'react';
import { UseFetch } from '../hooks/UseFetch';
import { GenresCard } from './GenresCard';


export const GenresInDb = () => {

const[state, setState] = useState({
  
  loading : true,
  genres: []

});

useEffect(() => {

  UseFetch('/genres')
  .then(({ok, data}) => {
    console.log(data);
    const {allGenres} = data
 
    setState({
      loading:false,
      genres: allGenres
    })
  })
  .catch(error => console.error)

}, []);

  return (
    <div className="col-lg-6 mb-4">						
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h5 className="m-0 font-weight-bold text-gray-800">Todos los Géneros</h5>
      </div>
      <div className="card-body">
        <div className="row">

          {
            state.loading ? 
            <p>Cargando...</p> : 
            state.genres.map((genre, index) => <GenresCard key={genre.nombre + index} {...genre}/>)
           }        

        </div>
      </div>
    </div>
  </div>
  )
}
