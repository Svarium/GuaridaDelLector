const validate = (values) => {
    const errors = {};

    if(!values.titulo) {
        errors.titulo = "El título es requerido"
    }

    if(!values.genero) {
        errors.genero = "Debes elegir un genero"
    }

    
    if(!values.autor) {
        errors.autor = "Debes elegir un autor"
    }

     if(!values.precio) {
        errors.precio = "Debes indicar el precio"
    }

    if(!values.editorial) {
        errors.editorial = "Debes elegir la editorial"
    }

    if(!values.desciption2) {
        errors.desciption2 = "Debes ingresar una pequeña descripción"
    }

    if(!values.video) {
        errors.video = "Debes ingresar el link del video"
    }

     if(!values.image) {
        errors.image = "Debes subir una imagen"
    }


    return errors
}

export default validate