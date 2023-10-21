const productList = document.querySelector(".productos");
const addProductForm = document.querySelector(".product-form");
const editProductForm = document.querySelector(".edit-form");

function pintarProductoDOM(producto) {
  const newProduct = document.createElement("div");
  newProduct.id = producto.id;
  newProduct.dataset.name = producto.name;
  newProduct.dataset.cost = producto.cost;
  newProduct.dataset.sale = producto.sale;
  newProduct.dataset.description = producto.description;
  newProduct.dataset.stock = producto.stock;
  newProduct.dataset.image = producto.image;
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
}

function obtenerProductos(api) {
  fetch(api)
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al cargar los productos");
      }
      return respuesta.json();
    })
    .then((productos) => {
      productos.forEach((producto) => {
        pintarProductoDOM(producto);
      });
    })
    .catch((err) => {
      console.log(err.message);
      alerta(err.message);
    });
}

function crearProducto(producto) {
  fetch("https://api-daox.2.us-1.fl0.io/products/", {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al crear el producto");
      }
      return respuesta.json();
    })
    .then((data) => {
      const mensaje = data.message;
      const producto = data.body;
      pintarProductoDOM(producto);
      alerta(mensaje);
      addProductForm.reset();
      toggleFormulario();
    })
    .catch((error) => {
      console.log(error);
      alerta("Error al crear el producto");
    });
}

function toggleFormulario() {
  addProductForm.classList.toggle("open");
}

function alerta(message) {
  const alertContainer = document.getElementById("alertContainer");

  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.textContent = message;
  alertContainer.appendChild(alertElement);

  alertElement.style.display = "block";

  setTimeout(function () {
    alertElement.style.display = "none";
    alertElement.remove();
  }, 3000);
}

function eliminarProducto(id) {
  fetch(`https://api-daox.2.us-1.fl0.io/products/${id}`, {
    method: "DELETE",
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al eliminar el producto");
      }
      if (respuesta.status === 204) {
        const productoElminiar = document.getElementById(id);
        productoElminiar.remove();
        alerta("Producto eliminado");
      }
    })
    .catch((error) => {
      console.log(error);
      alerta("Error al eliminar el producto");
    });
}

function configurarFormulario(producto) {
  editProductForm.dataset.id = producto.id;
  editProductForm.elements.name.value = producto.name;
  editProductForm.elements.cost.value = producto.cost;
  editProductForm.elements.sale.value = producto.sale;
  editProductForm.elements.description.value = producto.description;
  editProductForm.elements.stock.value = producto.stock;
  editProductForm.elements.image.value = producto.image;
}

function editarProducto(producto) {
  fetch(`https://api-daox.2.us-1.fl0.io/products/${producto.id}`, {
    method: "PUT",
    body: JSON.stringify(producto),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error al editar el producto");
      }
      return respuesta.json();
    })
    .then((data) => {
      const mensaje = data.message;
      const producto = data.body;
      editarProductoDOM(producto);
      alerta(mensaje);
      toggleFormularioEditar();
    })
    .catch((error) => {
      console.log(error);
      alerta("Error al editar el producto");
    });
}

function editarProductoDOM(producto) {
  const productoHTML = document.getElementById(producto.id);
  productoHTML.dataset.name = producto.name;
  productoHTML.dataset.cost = producto.cost;
  productoHTML.dataset.sale = producto.sale;
  productoHTML.dataset.description = producto.description;
  productoHTML.dataset.stock = producto.stock;
  productoHTML.dataset.image = producto.image;

  const imagen = productoHTML.querySelector(".imagen-producto");
  imagen.src = producto.image;
  imagen.alt = producto.name;

  const nombre = productoHTML.querySelector("h2");
  nombre.textContent = producto.name;

  const descripcion = productoHTML.querySelector("p");
  descripcion.textContent = producto.description;

  const precio = productoHTML.querySelector(".precio-producto");
  precio.textContent = `Precio: ${producto.sale}`;

  const costo = productoHTML.querySelector(".costo-producto");
  costo.textContent = `Costo: ${producto.cost}`;

  const stock = productoHTML.querySelector(".stock-producto");
  stock.textContent = `Disponible: ${producto.stock}`;
}

function toggleFormularioEditar() {
  editProductForm.classList.toggle("close");
}

// DELEGACIÓN DE EVENTOS
// EVENTO DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {
  obtenerProductos("https://api-daox.2.us-1.fl0.io/products/");
});

// EVENTO CLICK
document.addEventListener("click", (e) => {
  if (e.target.matches(".open-form") || e.target.matches(".close-button")) {
    toggleFormulario();
  }

  if (e.target.matches(".delete-button")) {
    const id = e.target.parentElement.parentElement.parentElement.id;
    eliminarProducto(id);
  }

  if (e.target.matches(".edit-button") || e.target.matches("#closeButton")) {
    toggleFormularioEditar();
    const id = e.target.parentElement.parentElement.parentElement.id;
    const productoHTML = document.getElementById(id);

    if (productoHTML) {
      const producto = {
        id: productoHTML.id,
        name: productoHTML.dataset.name,
        cost: productoHTML.dataset.cost,
        sale: productoHTML.dataset.sale,
        description: productoHTML.dataset.description,
        stock: productoHTML.dataset.stock,
        image: productoHTML.dataset.image,
      };
      configurarFormulario(producto);
    }
  }
});

// EVENTO SUBMIT
document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.matches(".product-form")) {
    crearProducto({
      name: e.target.elements.name.value,
      cost: Number(e.target.elements.cost.value),
      sale: Number(e.target.elements.sale.value),
      description: e.target.elements.description.value,
      stock: Number(e.target.elements.stock.value),
      image: e.target.elements.image.value,
    });
  }

  if (e.target.matches(".edit-form")) {
    const id = e.target.dataset.id;
    editarProducto({
      id: id,
      name: e.target.elements.name.value,
      cost: Number(e.target.elements.cost.value),
      sale: Number(e.target.elements.sale.value),
      description: e.target.elements.description.value,
      stock: Number(e.target.elements.stock.value),
      image: e.target.elements.image.value,
    });
  }
});