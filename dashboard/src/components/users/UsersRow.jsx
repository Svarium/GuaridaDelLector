import React from 'react'

export const UsersRow = ({id,name, surname, email, rol, icon, createdAt, socialProvider}) => {

  let fecha = new Date(createdAt)

  return (
    <tr>
      <th>{id}</th>
    <th scope="row">{name}</th>
    <td>{surname}</td>
    <td>{email}</td>
    <td>{rol.nombreRol}</td>
    <td>{fecha.toISOString().substring(0,10)}</td>
    <td> { <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4 "
              style={{ width: "150px", height:"150px", objectFit:"cover" }}
              src={socialProvider? icon.slice(42) : icon}
            />}</td>
</tr>
  )
}
