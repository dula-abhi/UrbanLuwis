function addToCart(newItem) {
    const existingItemIndex = cartItems.findIndex(item =>
      item.id === newItem.id &&
      item.color === newItem.color &&
      item.size === newItem.size
    );
  
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      cartItems.push(newItem);
    }
  
    updateCartDisplay();
  }
  
  const cartPanel = document.getElementById("cartPanel");
  const cartContent = document.getElementById("cartContent");
  const cartTotal = document.getElementById("cartTotal");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const closeCart = document.getElementById("closeCart");
  
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
  function updateCartDisplay() {
    cartContent.innerHTML = "";
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
    let total = 0;
  
    cartItems.forEach((item, index) => {
      const itemPrice = parseInt(item.price.replace(/[^\d]/g, ''));
      const itemTotal = item.quantity * itemPrice;
      total += itemTotal;
  
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
          <div style="flex-grow: 1;">
            <p><strong>${item.name}</strong></p>
            <p>Color: ${item.color} | Size: ${item.size}</p>
            <p>Price: ${item.price}</p>
            <div style="display:flex; align-items:center; gap:5px;">
              <button class="qty-decrease" data-index="${index}">−</button>
              <span>${item.quantity}</span>
              <button class="qty-increase" data-index="${index}">+</button>
            </div>
            <p>Item Total: Rs. ${itemTotal}/=</p>
          </div>
          <button class="remove-btn" data-index="${index}" style="height:fit-content;">Remove</button>
        </div>
      `;
      cartContent.appendChild(div);
    });
  
    cartTotal.innerHTML = `<strong>Total: Rs. ${total}/=</strong>`;
  
    document.querySelectorAll(".qty-increase").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.target.dataset.index);
        cartItems[index].quantity++;
        updateCartDisplay();
      });
    });
  
    document.querySelectorAll(".qty-decrease").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.target.dataset.index);
        cartItems[index].quantity--;
        if (cartItems[index].quantity < 1) cartItems.splice(index, 1);
        updateCartDisplay();
      });
    });
  
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.target.dataset.index);
        cartItems.splice(index, 1);
        updateCartDisplay();
      });
    });
  }
  
  if (addToCartBtn && closeCart) {
    addToCartBtn.addEventListener("click", () => {
      cartPanel.classList.add("show");
      addToCartBtn.style.display = "none";
    });
  
    closeCart.addEventListener("click", () => {
      cartPanel.classList.remove("show");
      addToCartBtn.style.display = "block";
    });
  }
  
  updateCartDisplay();
  