// Sample JSON data for menu items (in a real app, you'd fetch this from an API)
const menuData = [
    { id: 1, name: 'Breakfast Set', description: 'Eggs, toast, and coffee', price: 5 },
    { id: 2, name: 'Lunch Set', description: 'Rice, chicken, and vegetables', price: 8 },
    { id: 3, name: 'Dinner Set', description: 'Pasta with sauce', price: 7 },
    { id: 4, name: 'Snacks', description: 'Samosa and juice', price: 3 },
  ];
  
  let cart = [];
  
  // Display Menu Items Dynamically
  function displayMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuData.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: $${item.price}</p>
        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
      `;
      menuContainer.appendChild(itemDiv);
    });
  }
  
  // Handle Add to Cart
  document.getElementById('menu-items').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart')) {
      const itemId = e.target.getAttribute('data-id');
      const selectedItem = menuData.find(item => item.id == itemId);
      cart.push(selectedItem);
      alert(`${selectedItem.name} added to your cart`);
      updateCartSummary();
    }
  });
  
  // Update Cart Summary
  function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = ''; // Clear current cart summary
  
    let total = 0;
    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `${item.name} - $${item.price}`;
      cartSummary.appendChild(itemDiv);
      total += item.price;
    });
  
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    cartSummary.appendChild(totalDiv);
  }
  
  // Finalize Order
  document.getElementById('finalize-order').addEventListener('click', function() {
    const order = {
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price, 0),
    };
  
    // Simulate sending the order using Fetch API (to a backend)
    fetch('https://your-backend-api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
      alert('Order placed successfully!');
      cart = [];  // Clear the cart
      updateCartSummary();  // Update cart summary
    })
    .catch(error => console.error('Error:', error));
  });
  
  // Call the function to display menu items when the page loads
  displayMenu();
  