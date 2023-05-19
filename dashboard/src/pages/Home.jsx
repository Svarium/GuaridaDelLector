import React from 'react'
import { ContentRowMovies } from '../components/ContentRowMovies'
import { LastMovieInDb } from '../components/LastMovieInDb'
import { GenresInDb } from '../components/GenresInDb'

export const Home = () => {
  return (
    <div className="container-fluid mt-3">
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">Panel de Administración</h1>
    </div>

    <ContentRowMovies/>
    

    <div className="row">
      <LastMovieInDb />

      <GenresInDb />
    </div>
  </div>
  )
}
