const addButton = document.querySelector(".add-product-button");
const productForm = document.querySelector(".product-form");
const editform = document.querySelector("edit-form");
const submitButton = document.querySelector(".submit-button");
const productList = document.querySelector(".main");

function crearProducto(producto) {
  const { name, cost, sale, description, stock, image } = producto;
  const newProduct = document.createElement("div");
  newProduct.classList.add("producto");
  newProduct.innerHTML = `
    <div class="imagen-container">
    <img
      class="imagen-producto"
      src="${image.value}"
      alt="${name.value}"
    />
    </div>
    <div class="descripcion-precio">
      <div class="descripcion-producto">
        <h2>${name.value}</h2>
        <div class="descripcion-producto2">
          <p>${description.value}</p>
        </div>
      </div>
      <div class="precio-producto">
        <p>Precio: ${sale.value}</p>
      </div>
      <div class="costo-producto">
        <p>Costo: ${cost.value}</p>
      </div>
      <div class="stock-producto">
        <p>Disponible: ${stock.value}</p>
      </div>
      <div class="eliminar-producto">
        <button class="edit-button">Editar</button>
        <button class="delete-button">Eliminar</button>
      </div>
    </div>`;
  productList.appendChild(newProduct);
  name.value = "";
  cost.value = "";
  sale.value = "";
  description.value = "";
  stock.value = "";
  image.value = "";
  productForm.style.display = "none";
}

function obtenerProductos(api) {
  fetch(api)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al cargar los productos");
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((producto) => {
        const newProduct = document.createElement("div");
        newProduct.id = producto.id;
        newProduct.classList.add("producto");
        newProduct.innerHTML = `
          <div class="imagen-container">
          <img
            class="imagen-producto"
            src="${producto.image}"
            alt="${producto.name}"
          />
          </div>
          <div class="descripcion-precio">
            <div class="descripcion-producto">
              <h2>${producto.name}</h2>
              <div class="descripcion-producto2">
                <p>${producto.description}</p>
              </div>
            </div>
            <div class="precio-producto">
              <p>Precio: ${producto.sale}</p>
            </div>
            <div class="costo-producto">
              <p>Costo: ${producto.cost}</p>
            </div>
            <div class="stock-producto">
              <p>Disponible: ${producto.stock}</p>
            </div>
            <div class="eliminar-producto">
              <button class="edit-button">Editar</button>
              <button class="delete-button">Eliminar</button>
            </div>
          </div>`;

        productList.appendChild(newProduct);
      });
    })
    .catch((err) => {
      console.log(err.message);
      alert(err.message);
    });
}
//Al refrescar la pagina
document.addEventListener("DOMContentLoaded", function () {
  obtenerProductos("https://api-daox.2.us-1.fl0.io/products");
});

// Boton para abrir el formulario de creacion de producto
addButton.addEventListener("click", function () {
  productForm.style.display = "block";
  console.log(productForm);
});

// Manejar el evento submit del formulario para crear
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("https://api-daox.2.us-1.fl0.io/products", {
    method: "POST",
    body: JSON.stringify({
      name: e.target.elements.name.value,
      cost: parseInt(e.target.elements.cost.value),
      sale: parseInt(e.target.elements.sale.value),
      description: e.target.elements.description.value,
      stock: parseInt(e.target.elements.stock.value),
      image: e.target.elements.image.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      crearProducto(e.target.elements);
      alert(data.message);
    })
    .catch((error) => {
      console.log(error);
      alert("Error al crear el producto");
    });
});

// editform.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch("http://localhost:3000/products", {
//     method: "PUT",
//     body: JSON.stringify({
//       name: e.target.elements.name.value,
//       cost: e.target.elements.cost.value,
//       sale: e.target.elements.sale.value,
//       description: e.target.elements.description.value,
//       stock: e.target.elements.stock.value,
//       image: e.target.elements.image.value,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       crearProducto(e.target.elements);
//       alert(data.message);
//     })
//     .catch((error) => {
//       console.log(error);
//       alert("Error al crear el producto");
//     });
// });

//   submitButton.addEventListener("click", function () {
//     const productName = document.getElementById("product-name").value;
//     const productCost = document.getElementById("product-cost").value;
//     const productSale = document.getElementById("product-sale").value;
//     const productDescription =
//       document.getElementById("product-descrption").value;
//     const productStock = document.getElementById("product-stock").value;

//     const newProduct = document.createElement("div");
//     newProduct.classList.add("producto");

//     newProduct.innerHTML = `
//         <div class="imagen-container">
//             <img class="imagen-producto" src="public/gorra.webp" alt="${productName}">
//         </div>
//         <div class="descripcion-precio">
//             <div class="descripcion-producto">
//                 <h2>${productName}</h2>
//                 <div class="descripcion-producto2">
//                 <p>${productDescription}</p>
//                 </div>
//             </div>
//             <div class="precio-producto">
//                 <p>Precio: $${productSale}</p>
//             </div>
//             <div class="costo-producto">
//                 <p>Costo: $${productCost}</p>
//                 </div>
//               <div class="stock-producto">
//                 <p>Disponibles: ${productStock}</p>
//               </div>
//             <div class="eliminar-producto">
//                 <button class="edit-button">Editar</button>
//                 <button class="delete-button">Eliminar</button>
//             </div>
//         </div>
//         </div>
//       `;

//     newProduct
//       .querySelector(".delete-button")
//       .addEventListener("click", function () {
//         productList.removeChild(newProduct);
//       });

//     productList.appendChild(newProduct);

//     productForm.style.display = "none";
//     document.getElementById("product-name").value = "";
//     document.getElementById("product-cost").value = "";
//     document.getElementById("product-sale").value = "";
//     document.getElementById("product-descrption").value = "";
//     document.getElementById("product-stock").value = "";
//   });
// });

// const deleteButtons = document.querySelectorAll(".delete-button");

// deleteButtons.forEach(function (deleteButton) {
//   deleteButton.addEventListener("click", function () {
//     const product = deleteButton.closest(".producto");
//     product.remove();
//   });
