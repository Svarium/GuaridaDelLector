const $ = (el) => document.querySelector(el)

const btnPrev = $('#btn-prev')
const btnNext = $('#btn-next')
const containerItemPage = $('#container-items-page')
const containerLibrosCard = $('#container-libros-card')


const apiGetLibros = "http://localhost:3000/api/libros"
const getLibros = ({page = 1 } ={}) =>{
  return fetch(`${apiGetLibros}?page=${page}`).then(res => res.json())
}

const paintLibros = (libros) =>{
    containerLibrosCard.innerHTML= ''
    libros.forEach(libro => {
        const template = `
        
        
    <div class="card--populares">
        <figure>
        <img src="${libro.imagen}" alt="">
        </figure>
    <div class="contenido">
        <h3>$ ${libro.precio}</h3>
        <p>  ${libro.description2.slice(0,100)}...  </p>
        <a href="/products/detail/ ${libro.id}">Leer más</a>
    </div>
        `;
        containerLibrosCard.innerHTML += template
    });
}

const paintItemsPage = (numberPages) => {
    containerItemPage.innerHTML = ''
    for (let i = 1; i <= numberPages; i++) {
       containerItemPage.innerHTML += `
       <li class="page-item"><a class="page-link" href="#">${i}</a></li>
       `
        
    }
}


window.addEventListener("load", async () => {

    try {
        const {
        data:{count, page, currentPage, libros},
            } = await getLibros()

        console.log(libros);    

      paintLibros(libros)    
      paintItemsPage(oages)  

    } catch (error) {
        console.log(error);
    }
    
    
  

})



