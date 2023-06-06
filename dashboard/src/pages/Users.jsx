import React from 'react'
import { useEffect, useState } from "react";
import { UseFetch } from "../hooks/UseFetch";
import { UserTable } from '../components/users/UserTable';

export const Users = () => {

  const [state, setState] = useState({
    loading: true,
    users: [],
  });

  useEffect(() => {

    UseFetch('/users')
    .then(({ok, data})=>{
      console.log();
      ok &&
      console.log(data);
      setState({
       loading : false,
       users:data       
      })
    })
    .catch(() => console.error)
  }, [])
  

  return (
    <div className="container d-flex align-items-center justify-content-center">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <UserTable users = {state.users}             
             />
          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
}
