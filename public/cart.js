// cart.js

// Function to add a product to the cart
function addToCart(productName, price, image) {
  // Check if localStorage already has a 'cart' key
  if (!localStorage.getItem('cart')) {
    // If not, create an empty array and store it in localStorage
    localStorage.setItem('cart', JSON.stringify([]));
  }

  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cart'));

  // Add the new product to the cart
  const newProduct = {
    name: productName,
    price: price,
    quantity: 1, // You can modify this if you have quantity input
    image: image, // Add the image property
  };

  cartItems.push(newProduct);

  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Optionally, you can display a confirmation message or update the UI
  alert('Product added to cart!');
}

// Function to update quantity in the cart
function updateQuantity(productName, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem('cart'));

  // Find the item with the specified name in the cart
  const itemToUpdate = cartItems.find(item => item.name === productName);

  if (itemToUpdate) {
    // Update the quantity
    itemToUpdate.quantity = newQuantity;
    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    // Display the updated cart
    displayCart();
  }
}

// cart.js

// Function to display the items in the cart
function displayCart() {
  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cart'));

  // Check if there are items in the cart
  if (cartItems && cartItems.length > 0) {
    // Select the tbody element where you want to display the cart items
    const cartTableBody = document.querySelector('#cart-table tbody');

    // Clear the existing content in the tbody
    cartTableBody.innerHTML = '';

    // Iterate through each item in the cart and append it to the table
    // Inside the displayCart function
    cartItems.forEach(item => {
      const row = document.createElement('tr');

      // Add columns for each item property (name, price, quantity, subtotal)
      row.innerHTML = `
      <td><a href="#" onclick="removeFromCart('${item.name}')"><i class="fa-solid fa-trash"></i></a></td>
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)"></td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
  `;

      // Append the row to the tbody
      cartTableBody.appendChild(row);
    });


    // Calculate and display the total
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.querySelector('#cart-total').innerText = `R${total.toFixed(2)}`;
  } else {
    // Display a message if the cart is empty
    document.querySelector('#cart-table tbody').innerHTML = '<tr><td colspan="6">Your cart is empty</td></tr>';
    document.querySelector('#cart-total').innerText = 'R0.00';
  }
}

// Function to remove a product from the cart
function removeFromCart(productName) {
  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cart'));

  // Remove the item with the specified name from the cart
  cartItems = cartItems.filter(item => item.name !== productName);

  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Display the updated cart
  displayCart();
}

// Function to update the cart count in the navbar
function updateCartCount() {
  let cartItems = JSON.parse(localStorage.getItem('cart'));

  // Get the total quantity of items in the cart
  const totalQuantity = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  // Update the cart count in the navbar
  document.getElementById('cart-count').innerText = totalQuantity.toString();
}

// Call the updateCartCount function when the page loads
window.onload = function () {
  updateCartCount();
};


// Call the displayCart function when the page loads
window.onload = displayCart;
