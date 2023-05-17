import React from "react";
import { ContentRowMovies } from "./ContentRowMovies";
import { LastMovieInDb } from "./LastMovieInDb";
import { GenresInDb } from "./GenresInDb";
import { Metric } from "./Metric";

export const ContentRowTop = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>

      <ContentRowMovies/>
      

      <div className="row">
        <LastMovieInDb />

        <GenresInDb />
      </div>
    </div>
  );
};
