// document.addEventListener("DOMContentLoaded", function () {
//   const productList = document.querySelector(".main");
//   const editButtons = document.querySelectorAll(".edit-button");
//   const editForm = document.querySelector(".edit-form");
//   const saveEditButton = document.getElementById("saveEdit");
//   const closeButton = document.getElementById("closeButton");
//   let editedProduct = null;
//   productForm
//     .addEventListener("submit", (e) => {
//       e.preventDefault();
//       fetch("https://api-daox.2.us-1.fl0.io/products", {
//         method: "POST",
//         body: JSON.stringify({
//           name: e.target.elements.name.value,
//           cost: parseInt(e.target.elements.cost.value),
//           sale: parseInt(e.target.elements.sale.value),
//           description: e.target.elements.description.value,
//           stock: parseInt(e.target.elements.stock.value),
//           image: e.target.elements.image.value,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           productList.addEventListener("click", function (event) {
//             const target = event.target;
//             if (target.classList.contains("edit-button")) {
//               const product = target.closest(".producto");

//               const descripcionProducto = product.querySelector(
//                 ".descripcion-producto h2"
//               );
//               const precioProducto =
//                 product.querySelector(".precio-producto p");
//               const costoProducto = product.querySelector(".costo-producto p");

//               document.getElementById("editedName").value =
//                 descripcionProducto.textContent;
//               document.getElementById("editedCost").value = parseFloat(
//                 precioProducto.textContent.replace("$", "")
//               );
//               document.getElementById("editedSale").value = parseFloat(
//                 costoProducto.textContent.replace("$", "")
//               );

//               editForm.style.display = "block";
//             }
//           });
//         });

//       editButtons.forEach(function (editButton) {
//         editButton.addEventListener("click", function () {
//           editedProduct = editButton.closest(".producto");
//           const descripcionProducto = editedProduct.querySelector(
//             ".descripcion-producto h2"
//           );
//           const descripcionProducto2 = editedProduct.querySelector(
//             ".descripcion-producto2 p"
//           );
//           const precioProducto =
//             editedProduct.querySelector(".precio-producto p");
//           const stockProdcucto =
//             editedProduct.querySelector(".stock-producto p");
//           const costoProducto =
//             editedProduct.querySelector(".costo-producto p");

//           document.getElementById("editedName").value =
//             descripcionProducto.textContent;
//           document.getElementById("editedProducto").value =
//             descripcionProducto2.textContent;
//           document.getElementById("editedCost").value = parseFloat(
//             precioProducto.textContent.replace("$", "")
//           );
//           document.getElementById("editedSale").value = parseFloat(
//             costoProducto.textContent.replace("$", "")
//           );
//           document.getElementById("editedStock").value = parseFloat(
//             stockProdcucto.textContent.replace("", "")
//           );

//           editForm.style.display = "block";

//           editedProduct = product;
//         });
//       });

//       saveEditButton.addEventListener("click", function () {
//         if (editedProduct) {
//           const editedName = document.getElementById("editedName").value;
//           const editedCost = parseFloat(
//             document.getElementById("editedCost").value
//           );
//           const editedSale = parseFloat(
//             document.getElementById("editedSale").value
//           );
//           const editedDescription =
//             document.getElementById("editedDescription").value;
//           const editedStock = parseFloat(
//             document.getElementById("editedStock").value
//           );

//           const descripcionProducto = editedProduct.querySelector(
//             ".descripcion-producto h2"
//           );
//           const descripcionProducto2 = editedProduct.querySelector(
//             ".descripcion-producto2 p"
//           );
//           const precioProducto =
//             editedProduct.querySelector(".precio-producto p");
//           const costoProducto =
//             editedProduct.querySelector(".costo-producto p");
//           const productostock =
//             editedProduct.querySelector(".stock-producto p");

//           descripcionProducto.textContent = editedName;
//           descripcionProducto2.textContent = editedDescription;
//           precioProducto.textContent = `Precio: $${editedSale}`;
//           costoProducto.textContent = `Costo: $${editedCost}`;
//           productostock.textContent = `Costo: $${editedStock}`;

//           editForm.style.display = "none";

//           editedProduct = null;
//         }
//       });
//       saveEditButton.addEventListener("click", function () {
//         editForm.style.display = "none";
//       });

//       closeButton.addEventListener("click", function () {
//         editForm.style.display = "none";
//       });

//       alert(data.message);
//     })
//     .catch((error) => {
//       console.log(error);
//       alert("Error al crear el producto");
//     });
// });
