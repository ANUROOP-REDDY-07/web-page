const productsSection = document.getElementById('products-section');
const cartItems = document.getElementById('cart-items');
let cart = [];
let totalMRP = 0;

// Fetch products from the API
fetch('https://fakestoreapi.com/products')
  .then((response) => response.json())
  .then((data) => displayProducts(data))
  .catch((error) => console.error('Error fetching products:', error));

// Display products in the product section
function displayProducts(products) {
  productsSection.innerHTML = '';
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Rating: ${product.rating.rate} ★</p>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
    `;

    productsSection.appendChild(productCard);
  });
}

// Add product to the cart
function addToCart(productId, productName, productPrice) {
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }

  totalMRP += productPrice;
  updateCart();
}

// Update cart items and price details
function updateCart() {
  cartItems.innerHTML = '';
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <p>${item.name} - ₹${item.price} x ${item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartItems.appendChild(cartItem);
  });

  document.getElementById('total-mrp').textContent = `₹${totalMRP}`;
  const totalAmount = totalMRP - 50 + 10 + 20; // Apply discounts and fees
  document.getElementById('total-amount').textContent = `₹${totalAmount}`;
}

// Remove product from the cart
function removeFromCart(productId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    totalMRP -= cartItem.price * cartItem.quantity;
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }
}

// Place order function
function placeOrder() {
  if (cart.length > 0) {
    alert('Order placed successfully!');
    cart = [];
    totalMRP = 0;
    updateCart();
  } else {
    alert('Your cart is empty!');
  }
}
