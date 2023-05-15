const $ = (el) => document.querySelector(el)

const btnPrev = $('#btn-prev')
const btnNext = $('#btn-next')
const containerItemPage = $('#container-items-page')
const containerLibrosCard = $('#container-libros-card')

let pageActive=1;


const apiGetLibros = "http://localhost:3000/api/libros"
const getLibros = ({page = 1 } ={}) =>{
  return fetch(`${apiGetLibros}?page=${page}`).then(res => res.json())
}

const paintLibros = (libros) =>{
    containerLibrosCard.innerHTML= ''
    libros.forEach(libro => {
        const template = `      
    <div class="contenedor">    
    <div class="card--populares">
        <figure>
        <img src="${libro.imagen}" alt="">
        </figure>
    <div class="contenido">
        <h3>$ ${libro.precio}</h3>
        <p>  ${libro.description2.slice(0,100)}...  </p>
        <a href="/products/detail/ ${libro.id}">Leer más</a>
    </div>
    </div>
        `;
        containerLibrosCard.innerHTML += template
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


/* const handleEventPrevNext = (btnElement, {isNext = false} = {}) => {
    btnElement.addEventListener('click', async () => {
        try {
            let pageAct = pageActive
            const {
                data:{ pages, currentPage, libros}
            } = await getLibros({page : isNext ? ++pageAct  : --pageAct});
                    paintLibros(libros)    
                    paintItemsPage({numberPages: pages, itemActive: currentPage})  
                    statusPrevAndNext({currentPage, pages})
    
        } catch (error) {
            console.log(error);
        }
    })
}

handleEventPrevNext(btnNext, {isNext:true});
handleEventPrevNext(btnPrev, {pageActive});
 */


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
