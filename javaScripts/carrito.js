var cartItems = [];

function toggleCart() {                               
  //metodo que permite la aparicion del carrito
  var cart = document.getElementById("cart");
  cart.style.display = cart.style.display === "none" ? "block" : "none";
}

function addToCart(productName) {
  //metodo que agrega productos al carrito
  var product = {
    nombre: productName
  };
  cartItems.push(product);
  renderCartItems();
}

function removeFromCart(index) {
  //metodo que remueve productos del carrito
  cartItems.splice(index, 1);
  renderCartItems();
}

function renderCartItems() {
  //acomoda los productos del carrito cuando se agregan o se eliminan
  var cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  for (var i = 0; i < cartItems.length; i++) {    
    var item = document.createElement("div");
    item.className = "cart-item";

    var itemName = document.createElement("span");
    itemName.textContent = cartItems[i].nombre;
    itemName.className = "cart-item-name";

    var itemRemove = document.createElement("span");
    itemRemove.textContent = "X";
    itemRemove.className = "cart-item-remove";
    itemRemove.setAttribute("data-index", i);
    itemRemove.addEventListener("click", function() {
      var index = this.getAttribute("data-index");
      removeFromCart(index);
    });

    item.appendChild(itemName);
    item.appendChild(itemRemove);
    cartItemsElement.appendChild(item);
  }
}

function checkout() {
  var elementosCarrito = document.getElementById("cart-items");

  if (!elementosCarrito.hasChildNodes()){
    window.alert('No hay items en el carrito');
    return;
  } 
  // Logica para finalizar la compra (enviar los datos al servidor, procesar el pago, etc.)
  window.alert('Se procesó la compra');
  elementosCarrito.innerHTML = "";
  cartItems = [];
}

// Mostrar los productos en el DOM
var productListElement = document.getElementById("product-list");

products.forEach(function(product) {
  var productElement = document.createElement("div");
  productElement.className = `mix ${product.color} ${product.check} ${product.radio} ${product.option}`;    //esta parte permite el filtro
  productElement.innerHTML = `
    <img src="${product.imagen}">
    <style="display: inline-block;">
    <h3 class="newsHead">${product.nombre}</h3> 
    <p class="abstract"> Estrellas: ${product.estrellas}</p>
    <p class="abstract"> Ubicacion: ${product.ubicacion}</p>
    <p class="abstract"> Direccion: ${product.direccion}</p>
    <p class="abstract"> Telefono: ${product.telefono}</p>
    <p class="abstract"> ipo: ${product.tipo}</p>
    <p class="abstract"> Precio por noche: $${product.precio_por_noche}</p>
    <p class="abstract"> Descripción: ${product.descripcion}</p>
    <button onclick="addToCart('${product.nombre}')">Agregar al carrito</button>
  `;
  productListElement.appendChild(productElement);
});


