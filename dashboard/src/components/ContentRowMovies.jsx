import React, { useEffect, useState } from "react";
import { Metric } from "./Metric";


export const ContentRowMovies = () => {

  const [state, setState] = useState({
    libros : {
      title: "Libros",
      color: "primary",
      value: 0,
      icon: "fa-book",
    },
    autores : {
      title: "Autores",
      color: "success",
      value: 0,
      icon: "fa-pencil-alt",
    },
    users : {
      title: "Usuarios",
      color: "warning",
      value: 0,
      icon: "fa-user",
    }
  });

  useEffect(() => {
    // el pedido por fetch
   
    fetch('http://localhost:3000/api/metrics')
    .then(response => {
      return response.json(); 
         
    })
    .then(({ok, data}) => {
      console.log(data);
      if(ok){
        const {totalBooks, totalUsers, totalAutors} = data
        setState({
          libros :{
            ...state.libros,
            value: totalBooks
          },
          autores : {
            ...state.autores,
            value: totalAutors
          },
          users : {
            ...state.users,
            value: totalUsers
          }
        })
      }
     
    })
    .catch(error => console.log(error))  
   
  }, []);
 
  return (
  <div className="row">
    
    <Metric {...state.libros}/>
    <Metric {...state.autores}/>
    <Metric {...state.users}/>
    
    
    </div>
  );
};
