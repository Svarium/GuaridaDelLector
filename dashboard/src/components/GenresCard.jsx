import React from 'react'

export const GenresCard = ({nombre}) => {
  return (
    <div className="col-lg-6 mb-4">
    <div className="card bg-dark text-white shadow">
      <div className="card-body">
        {nombre}
      </div>
    </div>
  </div>
  )
}
