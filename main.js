document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add-product-button");
    const productForm = document.querySelector(".product-form");
    const submitButton = document.querySelector(".submit-button");
    const productList = document.querySelector(".main");
  
    
    addButton.addEventListener("click", function () {
      productForm.style.display = "block";
    });
  
    submitButton.addEventListener("click", function () {
      
      const productName = document.getElementById("product-name").value;
      const productCost = document.getElementById("product-cost").value;
      const productSale = document.getElementById("product-sale").value;
      const productDescription = document.getElementById("product-descrption").value;
      const productStock = document.getElementById("product-stock").value;
  
      
      const newProduct = document.createElement("div");
      newProduct.classList.add("producto");
      
        
      newProduct.innerHTML = `
        <div class="imagen-container">
            <img class="imagen-producto" src="public/gorra.webp" alt="${productName}">
        </div>
        <div class="descripcion-precio">
            <div class="descripcion-producto">
                <h2>${productName}</h2>
                <p>${productDescription}</p>
            </div>
            <div class="precio-producto">
                <p>Precio: $${productSale}</p>
            </div>
            <div class="costo-producto">
                <p>Costo: $${productCost}</p>
                <p>Disponibles: ${productStock}</p>
            </div>
            <div class="eliminar-producto">
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            </div>
        </div>
      `;

      newProduct.querySelector(".delete-button").addEventListener("click", function () {
        productList.removeChild(newProduct);
    });

      productList.appendChild(newProduct);  
  
      productForm.style.display = "none";
      document.getElementById("product-name").value = "";
      document.getElementById("product-cost").value = "";
      document.getElementById("product-sale").value = "";
      document.getElementById("product-descrption").value = "";
      document.getElementById("product-stock").value = "";
    });
  });

const deleteButtons = document.querySelectorAll(".delete-button");

deleteButtons.forEach(function (deleteButton) {
   deleteButton.addEventListener("click", function () {
       const product = deleteButton.closest(".producto");
       product.remove();
   });
});