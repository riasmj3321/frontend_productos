document.addEventListener("DOMContentLoaded", function () {
    const productList = document.querySelector(".main");
    const editButtons = document.querySelectorAll(".edit-button");
    const editForm = document.querySelector(".edit-form"); // Selecciona el formulario de edición
    const saveEditButton = document.getElementById("saveEdit"); // Selecciona el botón "Guardar"
    const editOverlay = document.querySelector(".edit-overlay");
    const closeButton = document.getElementById("closeButton"); // Selecciona el botón "Cerrar"
    let editedProduct = null;

    
 // Mostrar el formulario al hacer clic en "Editar" en un producto
 productList.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
        const product = target.closest(".producto");

        // Obtén los valores actuales del producto
        const descripcionProducto = product.querySelector(".descripcion-producto h2");
        const precioProducto = product.querySelector(".precio-producto p");
        const costoProducto = product.querySelector(".costo-producto p");

        // Llena el formulario con los valores actuales
        document.getElementById("editedName").value = descripcionProducto.textContent;
        document.getElementById("editedCost").value = parseFloat(precioProducto.textContent.replace("$", ""));
        document.getElementById("editedSale").value = parseFloat(costoProducto.textContent.replace("$", ""));

        // Mostrar el formulario de edición
        editForm.style.display = "block";
    }
});

editButtons.forEach(function (editButton) {
    editButton.addEventListener("click", function () {
        editedProduct = editButton.closest(".producto");
        const descripcionProducto = editedProduct.querySelector(".descripcion-producto h2");
        const descripcionProducto2 = editedProduct.querySelector(".descripcion-producto2 p");
        const precioProducto = editedProduct.querySelector(".precio-producto p");
        const stockProdcucto = editedProduct.querySelector(".stock-producto p");
        const costoProducto = editedProduct.querySelector(".costo-producto p");



        // Llena el formulario con los valores actuales
        document.getElementById("editedName").value = descripcionProducto.textContent;
        document.getElementById("editedProducto").value = descripcionProducto2.textContent;
        document.getElementById("editedCost").value = parseFloat(precioProducto.textContent.replace("$", ""));
        document.getElementById("editedSale").value = parseFloat(costoProducto.textContent.replace("$", ""));
        document.getElementById("editedStock").value = parseFloat(stockProdcucto.textContent.replace("", ""));
        // Mostrar el formulario de edición
        editForm.style.display = "block";
    });
});

saveEditButton.addEventListener("click", function () {
    if (editedProduct) {
        const editedName = document.getElementById("editedName").value;
        const editedCost = parseFloat(document.getElementById("editedCost").value);
        const editedSale = parseFloat(document.getElementById("editedSale").value);
        const editedDescription = document.getElementById("editedDescription").value;
        const editedStock = parseFloat(document.getElementById("editedStock").value);

        const descripcionProducto = editedProduct.querySelector(".descripcion-producto h2");
        const descripcionProducto2 = editedProduct.querySelector(".descripcion-producto2 p");
        const precioProducto = editedProduct.querySelector(".precio-producto p");
        const costoProducto = editedProduct.querySelector(".costo-producto p");
        const productostock = editedProduct.querySelector(".stock-producto p");

        // Actualiza la información del producto con los valores editados
        descripcionProducto.textContent = editedName;
        descripcionProducto2.textContent = editedDescription;
        precioProducto.textContent = `Precio: $${editedSale}`;
        costoProducto.textContent = `Costo: $${editedCost}`;
        productostock.textContent = `Costo: $${editedStock}`;


        // Oculta el formulario de edición
        editForm.style.display = "none";
    }
});

// Agregar evento para cerrar el formulario
closeButton.addEventListener("click", function () {
    editForm.style.display = "none";
});
});