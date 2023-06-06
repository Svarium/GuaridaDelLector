import React from 'react'

export const UsersRow = ({id,name, surname, email, rol, icon, createdAt, updatedAt, socialProvider}) => {

  let fecha = new Date(createdAt)
  let update = new Date(updatedAt)

  return (
    <tr>
      <th>{id}</th>
    <th scope="row">{name}</th>
    <td>{surname}</td>
    <td>{email}</td>
    <td>{rol.nombreRol}</td>
    <td>{fecha.toISOString().substring(0,10)}</td>
    <td>{update.toISOString().substring(0,10)}</td>
    <td colspan="2"> { <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4 rounded-circle "
              style={{ width: "150px", height:"100px", objectFit:"cover" }}
              src={socialProvider? icon.slice(42) : icon}
            />}</td>
</tr>
  )
}
