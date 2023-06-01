import React, { useEffect, useState } from 'react';
import { UseFetch } from '../../hooks/UseFetch';
import {useFormik} from 'formik';
import validate from '../../validations/bookAddValidator';

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
          titulo: "",
          genero: "",
          autor: "",
          precio: "",
          editorial: "",
          description2: "",
          video: "",
          paginas:"",
          image:""
        },
        validate,
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
      <form className="row" onSubmit={formik.handleSubmit}>
        <div className="col-12 mb-3">
          <label htmlFor="titulo" className="form-label">
            Titulo *
          </label>
          <input 
            type="text" 
            className={`form-control ${
              formik.errors.titulo
                ? "is-invalid"
                : !formik.errors.titulo && formik.values.titulo
                ? "is-valid"
                : null
            }`} 
            name="titulo" 
            onChange={formik.handleChange}
            value={formik.values.titulo}
            />
             {<small className="text-danger">{formik.errors.titulo}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="genero" className="form-label">
            Genero *
          </label>
          <select 
            className={`form-control ${
              formik.errors.genero
                ? "is-invalid"
                : !formik.errors.genero && formik.values.genero
                ? "is-valid"
                : null
            }`}  
            name="genero"
            onChange={formik.handleChange}
            value={formik.values.genero}
            >
              
           <option hidden defaultValue value="">Seleccione...</option>
              {
                genresState.genres.map((genre, index) => (
                  <option value={genre.id} key={index}>{genre.nombre}</option>
                ))
              }
            </select>
            {<small className="text-danger">{formik.errors.genero}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="autor" className="form-label">
            Autor
          </label>
          <select 
            className={`form-control ${
              formik.errors.autor
                ? "is-invalid"
                : !formik.errors.autor && formik.values.autor
                ? "is-valid"
                : null
            }`}   
            name="autor"
            onChange={formik.handleChange}
            value={formik.values.autor}
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                autorsState.autors.map((autor, index) => (
                  <option value={autor.id} key={index}>{autor.nombre}</option>
                ))
              }
            </select>
            {<small className="text-danger">{formik.errors.autor}</small>}
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Precio *
          </label>
          <input 
          type="number" 
          className={`form-control ${
            formik.errors.precio
              ? "is-invalid"
              : !formik.errors.precio && formik.values.precio
              ? "is-valid"
              : null
          }`}    
          name="price"
          onChange={formik.handleChange}
          value={formik.values.precio} //chequear este campo
          />
          {<small className="text-danger">{formik.errors.precio}</small>}
        </div>
        
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="editorial" className="form-label">
            Editorial
          </label>
          <select 
            className={`form-control ${
              formik.errors.editorial
                ? "is-invalid"
                : !formik.errors.editorial && formik.values.editorial
                ? "is-valid"
                : null
            }`}     
            name="editorial"
            onChange={formik.handleChange}
            value={formik.values.editorial}
            >
           <option hidden defaultValue value="">Seleccione...</option>
              {
                editorialState.editorial.map((editorial, index) => (
                  <option value={editorial.id} key={index}>{editorial.nombre}</option>
                ))
              }
            </select>
            {<small className="text-danger">{formik.errors.editorial}</small>}
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="description" className="form-label">
            Descripción *
          </label>
          <textarea
            className={`form-control ${
              formik.errors.desciption2
                ? "is-invalid"
                : !formik.errors.desciption2 && formik.values.desciption2
                ? "is-valid"
                : null
            }`}     
            name="description2"
            onChange={formik.handleChange}
            value={formik.values.description2}
            style={{ resize: "none" }}
          ></textarea>
           {<small className="text-danger">{formik.errors.desciption2}</small>}
        </div>
        <div className="col-12 mb-3">
        <label htmlFor="video" className="form-label">
            Video *
          </label>
          <input 
            type="text" 
            className={`form-control ${
              formik.errors.video
                ? "is-invalid"
                : !formik.errors.video && formik.values.video
                ? "is-valid"
                : null
            }`} 
            name="video" 
            onChange={formik.handleChange}
            value={formik.values.video}
            />
             {<small className="text-danger">{formik.errors.video}</small>}
        </div>
        
        <div className="col-12 mb-3">
                  
                    <input
                        className={`form-control ${
                          formik.errors.image
                            ? "is-invalid"
                            : !formik.errors.image && formik.values.image
                            ? "is-valid"
                            : null
                        }`} 
                        type="file"
                        name="image"
                        id="image"
                        onChange={formik.handleChange}
                        value={formik.values.image}
                        hidden
                    />
                     {<small className="text-danger">{formik.errors.image}</small>}
                    <div className="d-flex align-items-center justify-content-around">
                    <label className="btn btn-success my-1" htmlFor="image" >
                        Cargar portada *
                    </label>
                    <button className="btn btn-dark my-1 " onClick={formik.handleReset} >
                        Limpiar
                    </button>
                    <button className="btn btn-primary my-1" type="submit" >
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
