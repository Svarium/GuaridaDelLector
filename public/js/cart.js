const $ = (el) => document.querySelector(el)

const cardsContainer = $('#card-container')
const clearCart = $('#clear-cart')
const btnBuy = $('#btn-buy')
const outputTotal = $('#output-total')
const URL_API_SERVER= "https://guarida-del-lector-opxd.onrender.com/api/cart"

const getOrder = () => {
    return fetch(`${URL_API_SERVER}/getOrderPending`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const paintProducts = ( {products}) => {
    console.log({products});
    cardsContainer.innerHTML = "";
    if(products.length){
        products.forEach(product => {
            const priceFormatARG = product.precio.toLocaleString("es-AR", {style:"currency", currency:"ARS"})
            const template = `
            <!-- COURSE TEMPLATE CARD -->
            <div class="card col-6 col-lg-10 my-5">
              <div class="card-body row">
                
                <img class="col-4" style="object-fit: contain;" src="/images/libros/${product.imagen}" alt="">
                <div class="col-8 position-relative">
                  <button onclick="removeProductToCart(${product.id})" class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger " style="top:-3px;right:10px"><i style="padding:2px" class="rounded-circle btn-clear far fa-times-circle"></i></button>
    
                  <h5 class="card-title">${product.titulo}</h5>
                  <p class="card-text ">${product.description2.slice(0, 100)}...</p>
                  <p class="card-text ">${priceFormatARG}</p>
                  <p class="d-flex align-items-center gap-1">
                    <label for=""></label>
                    <button onclick="lessProduct(${product.id},${product.Cart.quantity})" class="btn btn-light">-</button>
                    <output style="width:50px"  class="form-control text-center">
                      ${product.Cart.quantity}
                    </output>
                    <button onclick="moreProduct(${product.id})" class="btn btn-light">+</button>
                    <a href="${product.video}" class="btn btn-outline-dark">Ver más</a>
                  </p>
                </div>
             
              </div>
            </div>
            `
    
            cardsContainer.innerHTML += template;
        });
        return
    }
    cardsContainer.innerHTML = "<h5>No existen productos en el carrito</h5>";

}

const paintTotal = (n) => {
    outputTotal.textContent = convertFormatPeso(n);
  };

window.addEventListener("load", async () => {
    try {
      const { ok, data } = await getOrder();
      if (ok) {
        paintProducts({ products: data.cart });
        paintTotal(data.total);
      }
  
      console.log({ ok, data });
    } catch (error) {
      console.log(error);
    }
  });

  const moreProduct = async (id) => {
    const objBookId = {
        bookId :id,
    }
  const {ok} = await  fetch(`${URL_API_SERVER}/moreQuantity`, {
        method: 'PUT',
        body: JSON.stringify(objBookId),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json());

    if(ok){
        const { ok, data } = await getOrder();
        if (ok) {
            paintProducts({ products: data.cart });
            paintTotal(data.total)
    }
}
  }

  const lessProduct = async (id, quantity) => {
    const objBookId = {
        bookId :id,
    }
    if(quantity > 1){
        const {ok} = await  fetch(`${URL_API_SERVER}/lessQuantity`, {
            method: 'PUT',
            body: JSON.stringify(objBookId),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json());
    
        if(ok){
            const { ok, data } = await getOrder();
            if (ok) {
                paintProducts({ products: data.cart });
                paintTotal(data.total);
        }
    }
    }
  
  }

  const removeProductToCart = async (id) => {
    try {
      const result = await  Swal.fire({
            title: '¿Estas seguro de quitar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor:'#3085d6' ,
            confirmButtonText: 'Si, quitar!'
          })
            if (result.isConfirmed) {
                const objBookId = {
                    bookId :id,
                }
                const {ok} = await fetch(`${URL_API_SERVER}/removeProduct`,{
                    method:'DELETE',
                    body: JSON.stringify(objBookId),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((res)=> res.json())
                if(ok){
                    const { ok, data } = await getOrder();
                    if (ok) {
                        paintProducts({ products: data.cart });
                        paintTotal(data.total)
                        Swal.fire(
                            {
                                title:'Producto eliminado',
                                icon:"success",
                                showConfirmButton:false,
                                timer:1200
                            }
                           )
                }
            }
              
            }

    } catch (error) {
        console.log(error);
    }
   
  }

 clearCart.addEventListener('click', async() => {
    try {
        const result = await  Swal.fire({
            title: '¿Estas seguro de borrar todo el carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor:'#3085d6' ,
            confirmButtonText: 'Si, quitar!'
          })

          if(result.isConfirmed){
            const {ok} = await  fetch(`${URL_API_SERVER}/clearCart`, {
                method: 'DELETE',
            }).then((res) => res.json());

            if(ok){
                const { ok, data } = await getOrder();
                if(ok){
                    paintProducts({ products: data.cart });
                    paintTotal(data.total)
                }
                Swal.fire(
                    {
                        title:'Carrito vaciado',
                        icon:"success",
                        showConfirmButton:false,
                        timer:1200
                    }
                   )
            }
          }

       
    } catch (error) {
        console.log(error);
    }
 })

 btnBuy.addEventListener('click', async()=> {

    const result = await  Swal.fire({
        title: '¿Estas seguro de realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:'#d33',
        confirmButtonText: 'Si, comprar!'
      })

      if(result.isConfirmed){

        const {ok} = await  fetch(`${URL_API_SERVER}/statusOrder`, {
            method: 'PUT',
            body: JSON.stringify({status:"completed"}),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json());


        let timerInterval
      const result = await Swal.fire({
          title: 'Procesando la compra!',
          html: 'I will close in <b></b> milliseconds.',
          text:"Espera mientras se realiza la compra",
          timer: 5000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        })
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
          await Swal.fire({
                title: ok ? "Gracias por su compra" : "Upsss, hubo un error",
                icon:ok ? 'success':'error',
                showConfirmButton:false,
                timer:1200
            })

            ok && (location.href = "/")
          }
    
      }

   

 })