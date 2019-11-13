"use strict";


const [...productList] = document.querySelectorAll("#products ul li");
const products = productList.map(p => p.innerText);

console.log(products);

// localStorage.setItem("shoppingCart", products);

const addItemButtons = document.querySelectorAll(".fa-plus-circle");
console.log(addItemButtons);

addItemButtons.forEach(a => {
  a.addEventListener("click", updateCart(a.previousSibling.textContent));
});

function updateCart(productName) {
  const currentStore = localStorage.getItem("shoppingCart");
  if (currentStore && !currentStore.includes(productName)) {
    const newStore = `${currentStore},${productName}`;
    localStorage.setItem("shoppingCart", newStore);
  }
}
