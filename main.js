const addButton = document.querySelector(".add-product-button");
const productForm = document.querySelector(".product-form");
const editform = document.querySelector("edit-form");
const submitButton = document.querySelector(".submit-button");
const productList = document.querySelector(".main");
const closeButton = document.querySelector("#closeButton");

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

function mostrarFormularioEdicion(product) {
  const descripcionProducto = product.querySelector(".descripcion-producto h2");
  const precioProducto = product.querySelector(".precio-producto p");
  const costoProducto = product.querySelector(".costo-producto p");

  document.getElementById("editedName").value = descripcionProducto.textContent;
  document.getElementById("editedCost").value = parseFloat(
    precioProducto.textContent.replace("$", "")
  );
  document.getElementById("editedSale").value = parseFloat(
    costoProducto.textContent.replace("$", "")
  );

  const editForm = document.querySelector(".edit-form");
  editForm.style.display = "block";
}

productList.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("edit-button")) {
    const product = target.closest(".producto");
    mostrarFormularioEdicion(product);
  }
});

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
        newProduct.dataset.id = producto.id;
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

      const deletebutton = document.querySelectorAll(".delete-button");
      console.log(deletebutton);
      deletebutton.forEach((e) => {
        e.addEventListener("click", (i) => {
          const elemento = i.target.closest(".producto");
          const id = elemento.dataset.id;
          deleteproducto(id, elemento);
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
      alert(err.message);
    });
}

function deleteproducto(id, elemento) {
  fetch(`https://api-daox.2.us-1.fl0.io/products/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      alert("no respondio");
      throw new Error("Ha ocurrido un error al eliminar el producto");
    }
    elemento.remove();
    alert("producto eliminado correctamente");
  });
}

function editarProducto(id, producto) {
  const { name, cost, sale, description, stock, image } = producto;
  const productToUpdate = document.getElementById(id);

  const imagenProducto = productToUpdate.querySelector(".imagen-producto");
  imagenProducto.src = image.value;
  imagenProducto.alt = name.value;

  const descripcionProducto = productToUpdate.querySelector(
    ".descripcion-producto h2"
  );
  descripcionProducto.textContent = name.value;

  const descripcionProducto2 = productToUpdate.querySelector(
    ".descripcion-producto2 p"
  );
  descripcionProducto2.textContent = description.value;

  const precioProducto = productToUpdate.querySelector(".precio-producto p");
  precioProducto.textContent = `Precio: ${sale.value}`;

  const costoProducto = productToUpdate.querySelector(".costo-producto p");
  costoProducto.textContent = `Costo: ${cost.value}`;

  const stockProducto = productToUpdate.querySelector(".stock-producto p");
  stockProducto.textContent = `Disponible: ${stock.value}`;

  const editForm = document.querySelector(".edit-form");
  editForm.style.display = "none";
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
      mostrarFormularioEdicion(e.target.elements);
      crearProducto(e.target.elements);
      alert(data.message);
    })
    .catch((error) => {
      console.log(error);
      alert("Error al crear el producto");
    });
});

editform.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`https://api-daox.2.us-1.fl0.io/products/${id}`, {
    method: "PUT",
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
      editarProducto;
      alert(data.message);
    })
    .catch((error) => {
      console.log(error);
      alert("Error al editar el producto");
    });
});
