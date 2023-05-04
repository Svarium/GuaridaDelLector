const $ = (id) => document.getElementById(id)

const msgError = (element, message, {target}) => {
    $(element).innerHTML = message
    target.classList.add('errorInput')
}

const cleanError = (element, {target}) => {
    target.classList.remove('errorInput')
    target.classList.remove('validInput')
    $(element).innerHTML = null
}

let regExLetter = /^[A-Z]+$/i;
let regExEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres
let regExPass2 =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_-])[A-Za-z\d$@$!%*?&_-]{6,12}/;
const regExLink = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}$/;


  /* INPUT AUTOR */

  $('autor').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorAutor', "El autor es obligatorio", e)
            break;
        default:
            this.classList.add('validInput')
            break;
    }
  });

  $('autor').addEventListener('focus', function(e) {
    cleanError('errorAutor', e)
  })

  /* INPUT TITULO */

  $('titulo').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorTitulo', "El título es obligatorio", e)
            break;
        case this.value.trim().length < 5 || this.value.trim().length > 60 :
        msgError('errorTitulo', "Entre 2 y 50 caracteres",e)
        break
        default:
            this.classList.add('validInput')
            break;
    }
  });

  $('titulo').addEventListener('focus', function(e) {
    cleanError('errorTitulo', e)
  })

  /* INPUT PRECIO */

  $('precio').addEventListener('blur', function (e) {
    switch (true) {
      case !this.value.trim():
        msgError('priceError', "El precio es requerido", e)
        break;
      case this.value < 0:
        msgError('priceError', "Solo números positivos", e)
        break;
      default:
        this.classList.add('validInput')
        break;
    }
  })

  $('precio').addEventListener('focus', function (e) {
    cleanError('priceError', e)
  })

  /* INPUT PAGINAS */

  $('paginas').addEventListener('blur', function (e) {
    switch (true) {
      case !this.value.trim():
        msgError('errorPaginas', "Ingrese cantidad de páginas", e)
        break;
      case this.value < 0:
        msgError('errorPaginas', "Solo números positivos", e)
        break;
      default:
        this.classList.add('validInput')
        break;
    }
  })

  $('paginas').addEventListener('focus', function (e) {
    cleanError('errorPaginas', e)
  })

  /* INPUT EDITORIAL */

  $('editorial').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorEditorial', "La editorial es obligatoria", e)
            break;
        default:
            this.classList.add('validInput')
            break;
    }
  });

  $('editorial').addEventListener('focus', function(e) {
    cleanError('errorEditorial', e)
  })


  /* INPUT LINK VIDEO */

  $('video').addEventListener('blur', function(e){
    switch (true) {
        case !this.value.trim():
            msgError('errorLink', "El link es obligatorio", e)
            break;
            case !regExLink.test(this.value.trim()):
              msgError('errorLink', "El formato de link no es válido",e)
          break
        default:
            this.classList.add('validInput')
            break;
    }
  });

  $('video').addEventListener('focus', function(e) {
    cleanError('errorLink', e)
  })

/* INPUT DESCRIPCION */

$('description2').addEventListener('blur', function(e){
  switch (true) {
      case !this.value.trim():
          msgError('errorDescript', "La descripción es obligatoria", e)
          break;
      case this.value.trim().length < 10 || this.value.trim().length > 700 :
      msgError('errorDescript', "Entre 10 y 700 caracteres",e)
      break
      default:
          this.classList.add('validInput')
          break;
  }
});

$('description2').addEventListener('focus', function(e) {
  cleanError('errorDescript', e)
})


/* INPUT GENERO */

$('genero').addEventListener('blur', function(e){
  switch (true) {
      case !this.value.trim():
          msgError('errorGenero', "El género es obligatorio", e)
          break;
      default:
          this.classList.add('validInput')
          break;
  }
});

$('genero').addEventListener('focus', function(e) {
  cleanError('errorGenero', e)
})


/* INPUT IMAGE */

const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

$('image').addEventListener('change', function(e){
  switch (true) {
    case !this.value.length === 0: //CHEQUEAR ESTE CASE
      msgError('errorImage', "La imagen es obligatoria", e) 
      break;
      case !regExExt.exec(this.value):
        msgError('errorImage', "Solo se admiten imágenes jpg | jpeg | png | webp", e)
          break;
      default:
          this.classList.add('validInput')
          break;
  }
});

$('image').addEventListener('focus', function(e) {
  cleanError('errorImage', e)
})





/* CHEQUEO DE ERRORES */

$('formAddBook').addEventListener('submit', function(e){
  e.preventDefault();

  let error = false

  for (let i = 0; i < this.elements.length -1; i++) {
      
      if(!this.elements[i].value.trim() || this.elements[i].classList.contains('errorInput')) {
          error = true
          this.elements[i].classList.add('errorInput')
          $('errorFormAdd').innerHTML = "¡Hay campos vacíos o con errores!"
      }
      
  }

  !error && this.submit()

})
