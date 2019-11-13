"use strict";

const [...productListItems] = document.querySelectorAll("#products ul li");
const productNames = productListItems.map(p => p.innerText);
const addItemButtons = document.querySelectorAll(".fa-plus-circle");
const cartButton = document.querySelector(".fa-shopping-cart");
const cartSection = document.querySelector("#cartSection");
const cart = document.querySelector("#cart");
const badge = document.querySelector("#badge");

let shoppingCart = [];


// GET CART FROM LOCALSTORAGE IF IT EXISTS
window.onload = () => {
  const currentStore = localStorage.getItem("shoppingCart");
  if(currentStore !== null && currentStore !== "") {
    shoppingCart = currentStore.split(",");
    updateCart();
  }
};

// ADD ITEM TO CART
addItemButtons.forEach(a => {
  a.addEventListener("click", () => {
    // console.log(a.parentElement);
    shoppingCart.push(a.previousSibling.textContent);
    updateCart();
  });
});

// REMOVE ITEM FROM CART
function updateDeleteButtons() {
  const delItemButtons = document.querySelectorAll(".fa-minus-circle");
  delItemButtons.forEach(d => {
    d.addEventListener("click", () => {
      const idx = shoppingCart.indexOf(d.previousSibling.textContent);
      shoppingCart.splice(idx, 1);
      updateCart();
    });
  });
}

// SHOW SHOPPING CART
let cartToggle = false;
cartButton.addEventListener("click", () => {
  cartToggle = !cartToggle;
  if (cartToggle) { 
    cartSection.classList.remove("hide"); 
  } else {
    cartSection.classList.add("hide");
  }
});

// UPDATE SHOPPING CARD
function updateCart() {
  cart.innerHTML = "";
  shoppingCart.forEach(s => {
    cart.innerHTML += `<li>${s}<i class="fas fa-minus-circle"></i></li>`;
  });
  badge.innerText = shoppingCart.length;
  updateDeleteButtons();
  localStorage.setItem("shoppingCart", shoppingCart);
}
