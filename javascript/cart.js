"use strict";

// Populate products from json - needs to be run on a server

fetch("javascript/products.json")
  .then(res => res.json())
  .then(data => {
    displayProducts(data);
  })
  .catch(err => console.error(err));

var database;

// Populate product list from external json

function displayProducts(data) {
  data.forEach(d => {
    const productList = document.querySelector("#products ul");
    const item = `
    <li>
      <p><strong>${d["name"]}</strong></p>
      <p>£${d["price"]}<i id="add-${d["name"]}" class="fas fa-plus-circle"></i></p>
      <figure>
        <img src="${d['img']}">
        <figcaption>${d["desc"]}</figcaption>
      </figure>
    </li>
    `;
    productList.insertAdjacentHTML('beforeend', item);
  });
  
  // When finished, enable cart functionality
  database = data;
  addButtons();
}

// Enable add buttons

function addButtons() {
  const addItemButtons = document.querySelectorAll(".fa-plus-circle");
  addItemButtons.forEach(a => {
    a.addEventListener("click", () => {
      let curr = database.find(d => a.id.includes(d.name));
      shoppingCart.push(curr);
      updateCart();
    });
  });
}

// Get cart from localstorage if it exists

window.onload = () => {
  const currentStore = localStorage.getItem("shoppingCart");
  const store = JSON.parse(currentStore);
  if(store !== null && store !== "") {
    shoppingCart = store;
    updateCart();
  }
};

// SHOW shopping cart
let cartToggle = false;
const cartButton = document.querySelector(".fa-shopping-cart");
const cartSection = document.querySelector("#cartSection");
cartButton.addEventListener("click", () => {
  cartToggle = !cartToggle;
  if (cartToggle) { 
    cartSection.classList.remove("hide"); 
  } else {
    cartSection.classList.add("hide");
  }
});

// UPDATE shopping card
let shoppingCart = [];
function updateCart() {
  const cart = document.querySelector("#cart");
  const badge = document.querySelector("#badge");
  cart.innerHTML = "";
  let cnt = 0;
  shoppingCart.forEach(s => {
    cart.innerHTML += `
      <li>
        <img src="${s['img']}"> <strong>${s["name"]}</strong>: £${s["price"]}<i id="del-${s["name"]}-${cnt}" class="fas fa-minus-circle"></i>
      </li>
      `;
    cnt++;
  });
  badge.innerText = shoppingCart.length;
  updateDeleteButtons();
  if (shoppingCart != []) {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  } else {
    localStorage.removeItem("shoppingCart");
  }
  // total price of cart
  const totalPlaceholder = document.querySelector("#total");
  if(shoppingCart.length > 0) {
    const total = shoppingCart
      .map(s => parseFloat(s.price))
      .reduce((a,c) => a + c);
    totalPlaceholder.innerHTML = total.toFixed(2);
  } else {
    totalPlaceholder.innerHTML = "0.00";
  }
}

// REMOVE item from cart
function updateDeleteButtons() {
  const delItemButtons = document.querySelectorAll(".fa-minus-circle");
  delItemButtons.forEach(d => {
    d.addEventListener("click", () => {
      const idx = d.id[d.id.length -1];
      shoppingCart.splice(idx, 1);
      updateCart();
    });
  });
}
