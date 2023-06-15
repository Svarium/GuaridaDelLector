const btnAddCart = document.querySelector('#btn-addCart')
const URL_API_SERVER= "https://guarida-del-lector-opxd.onrender.com/api/cart"

btnAddCart.addEventListener('click', async ()=> {
  const id = btnAddCart.getAttribute('data-id')
    try {
        const objBookId = {
            bookId:id
        }
   const {ok} = await fetch(`${URL_API_SERVER}/addProduct`, {
            method:"POST",
            body: JSON.stringify(objBookId),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((res) => res.json());

        await Swal.fire({
            title: ok ? "Producto agregado al carrito" : "Debes iniciar sesión",
            icon: ok ? "success" : "warning",
            showConfirmButton: false,
            timer: 1200,
          });
        !ok ? (location.href = "/user/login") : (location.href = "/cart")

    } catch (error) {
        console.log(error);
    }
})



   

 
