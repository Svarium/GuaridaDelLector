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
    <div className="container text-center d-flex align-items-center justify-content-center">
    <div className="card">
        <div className="card-body">
            <div className="row justify-content-center">
                <div className="col-12">
                    <UserTable users={state.users} />
                </div>
            </div>
        </div>
    </div>
</div>

  )
}
