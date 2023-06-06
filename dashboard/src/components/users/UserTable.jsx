import React from 'react'
import { UsersRow } from './UsersRow'

export const UserTable = ({users}) => {
  return (
    <>
    <div className='d-flex justify-content-between'>
      <h4>Lista de usuarios</h4>      
    </div>
    

    <div className='table-responsive'>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Fecha de actualización</th>

            <th  colspan="2" scope="col">Foto de perfil</th>            
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => (
              <UsersRow
              key={index}
                {...user}
              />
            ))
          }

        </tbody>
      </table>
    </div>
  </>
  )
}
