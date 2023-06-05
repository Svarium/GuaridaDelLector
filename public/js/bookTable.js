const $ = (el) => document.querySelector(el)

const btnPrev = $('#btn-prev-table')
const btnNext = $('#btn-next-table')
const containerItemPage = $('#container-items-page-table')
const bookTable = $('#bookTable')
const URL_API_SERVER= "http://localhost:3000/api/cart"

let pageActive=1;

const apiGetLibros = "http://localhost:3000/api/libros"
const getLibros = ({page = 1 } ={}) =>{
  return fetch(`${apiGetLibros}?page=${page}`).then(res => res.json())
}

const paintLibros = (libros) =>{
    bookTable.innerHTML= '';
    libros.forEach(libro => {
        const template = ` <tbody>
       
          <tr>
          <th scope="row">${libro.id}</th>
          <td>${libro.titulo}</td>
          <td>$ ${libro.precio}</td>
          <td>${libro.autor.nombre}</td>
          <td>
              <div class="d-flex justify-content-center gap-2"> 
                  <a class="btn  btn-primary" href="products/detail/${libro.id}"><i class="fa-solid fa-eye"></i></a>
                  <a class="btn  btn-success" href="products/editar/${libro.id}"><i class="fa-solid fa-edit"></i></a>              
              
            <div class="boton-modal detalle-comprar">
                <label class="btn btn-sm btn-success" for="btn-modal" style="background-color: rgb(199, 54, 66);">
                  <i class="fa-solid fa-trash"></i>
                </label>
            </div>
           
                
              </div>
      </td>
        </tr>

        
     <input type="checkbox" id="btn-modal">
     <div class="container-modal">
         <div class="content-modal">
             <h2>¡ATENCION!</h2>
             <p>¿Estas seguro de que deseas eliminar esta publicación?</p>
             <div class="btn-cerrar">
               <form action="/products/delete/${libro.id}?_method=DELETE" method="POST" >
                 <button type="submit">ELIMINAR <i class="fa-solid fa-trash"></i></button>
                </form> 
                 <label for="btn-modal">CANCELAR</label>
             </div>
         </div>
         <label for="btn-modal" class="cerrar-modal"></label>
     </div>
     </input>

   
      
        
       
      </tbody>`;
      bookTable.innerHTML += template
    });

    
}


const getPage = async (page) => {
    pageActive = page
    const {
        data:{ pages, currentPage, libros},
            } = await getLibros({page});

        paintLibros(libros)    
        paintItemsPage({numberPages: pages, itemActive: currentPage})  
        statusPrevAndNext({currentPage, pages})
}


const paintItemsPage = ({numberPages, itemActive}) => {
    containerItemPage.innerHTML = ''
    for (let i = 1; i <= numberPages; i++) {
        containerItemPage.innerHTML += `
       <li class="page-item ${itemActive === i && 'active'}">
       <a class="page-link" href="#" onclick="getPage(${i})">${i}</a></li>
       `
        }
}

const statusPrevAndNext = ({currentPage, pages}) => {
    if(currentPage === pages){
        btnNext.hidden = true;
    }else{
        btnNext.hidden = false;
    }

    if(currentPage === 1){
        btnPrev.hidden = true;
    }else{
        btnPrev.hidden = false;
    }
}

btnNext.addEventListener('click', async () => {
    try {
        const {
            data:{ pages, currentPage, libros}} = await getLibros({page : ++pageActive});
                paintLibros(libros)    
                paintItemsPage({numberPages: pages, itemActive: currentPage})  
                statusPrevAndNext({currentPage, pages})

    } catch (error) {
        console.log(error);
    }
})

btnPrev.addEventListener('click', async () => {
    try {
        const {
            data:{ pages, currentPage, libros}} = await getLibros({page : --pageActive});
                paintLibros(libros)    
                paintItemsPage({numberPages: pages, itemActive: currentPage})  
                statusPrevAndNext({currentPage, pages})

    } catch (error) {
        console.log(error);
    }
})





window.addEventListener("load", async () => {

    try {
        const {
        data:{ pages, currentPage, libros},
            } = await getLibros()

        console.log(libros);    

      paintLibros(libros)    
      paintItemsPage({numberPages: pages, itemActive: currentPage})  
      statusPrevAndNext({currentPage, pages})

    } catch (error) {
        console.log(error);
    }
})


