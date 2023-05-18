import React, { useState } from 'react'
import { useEffect } from 'react';
import { UseFetch } from "../hooks/UseFetch";
import { LastBookCard } from './LastBookCard';


export const LastMovieInDb = () => {


  const[state, setState] = useState({
  
    loading : true,
    LastBook: []
  
  });

 

  useEffect(() => {

    UseFetch('/lastBook')
    .then(({ok, data}) => {
      console.log(data);
      const {book} = data
   
      setState({
        loading:false,
        lastBook:book
      })
    })
    .catch(error => console.error)
  
  }, []);



  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Último libro agregado
          </h5>
        </div>
        
        {
          state.loading ?
          <p>Cargando...</p> :
          state.lastBook.map((book, index) => <LastBookCard {...book} />)
        }

      </div>
    </div>
  );
};
