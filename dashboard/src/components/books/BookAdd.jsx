import React, { useEffect, useState } from 'react';
import { UseFetch } from '../../hooks/UseFetch';
import {useFormik} from 'formik';

export const BookAdd = ({}) => {


    const [genresState, setGenresState] = useState({
        loading: true,
        genres: [],
      });
    
      const [autorsState, setAutorsState] = useState({
        loading: true,
        autors: [],
      });
    
      const [editorialState, setEditorialState] = useState({
        loading: true,
        editorial: [],
      });
    
      useEffect(() => {
        Promise.all([
          UseFetch('/genres'),
          UseFetch('/autores'),
          UseFetch('/editoriales'),
        ]).then(([genresRes, autorsRes, editorialRes]) => {
          setGenresState({
            loading: false,
            genres: genresRes.data.allGenres,
          });
          setAutorsState({
            loading: false,
            autors: autorsRes.data.autors,
          });
          setEditorialState({
            loading: false,
            editorial: editorialRes.data.allEditorial,
          });
        }).catch(() => console.error);
      }, []);

      const formik = useFormik ({
        initialValues: {

        },
    onSubmit : (values) => {
      console.log(values)
    }
      })

    
  return (
    <>
          <div className='d-flex justify-content-between'>

      <h4>Agregar Libro </h4>
      </div>
      <hr />
      <form className="row">
        <div className="col-12 mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo *
          </label>
          <input 
            type="text" 
            className="form-control" 
            name="titulo" 
            />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="genero" className="form-label">
            Genero *
          </label>
          <select 
            className="form-control" 
            name="genero"
             
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                genresState.genres.map((genre, index) => (
                  <option value={genre.id} key={index}>{genre.nombre}</option>
                ))
              }
            </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="autor" className="form-label">
            Autor
          </label>
          <select 
            className="form-control" 
            name="autor"
             
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                autorsState.autors.map((autor, index) => (
                  <option value={autor.id} key={index}>{autor.nombre}</option>
                ))
              }
            </select>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input 
          type="number" 
          className="form-control" 
          name="price" 
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="editorial" className="form-label">
            Editorial
          </label>
          <select 
            className="form-control" 
            name="editorial"
             
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                editorialState.editorial.map((editorial, index) => (
                  <option value={editorial.id} key={index}>{editorial.nombre}</option>
                ))
              }
            </select>
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            className="form-control"
            name="description"
            style={{ resize: "none" }}
          ></textarea>
        </div>
        
        <div className="col-12 mb-3">
                  
                    <input
                        className="form-control"
                        type="file"
                        name="image"
                        id="image"
                        hidden
                    />
                    <div className="d-flex align-items-center justify-content-around">
                    <label className="btn btn-success my-1" htmlFor="image" >
                        Cargar portada *
                    </label>
                    <button className="btn btn-dark my-1 " type="reset" >
                        Limpiar
                    </button>
                    <button className="btn btn-primary my-1" type="submit" disabled>
                        Guardar
                    </button>
                    
                    </div>
                
                    </div>

                <div className="col-12">

                </div>

      </form>
    </>
  )
}
