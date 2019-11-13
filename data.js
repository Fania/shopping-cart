"use strict";


// POPULATE PRODUCTS FROM JSON
// NEEDS TO BE RUN ON SERVER

console.log("get products");

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    displayProducts(data);
    console.log(data);
  })
  // .then(data => {
  //   console.log(data);
  //   handleStuff(data);
  // })
  .catch(err => console.error(err));



function displayProducts(data) {
  data.forEach(d => {
    const productList = document.querySelector("#products ul");
    const item = `
    <li>
      <p><strong>${d["name"]}</strong></p>
      <p>£${d["price"]}<i id="${d["name"]}" class="fas fa-plus-circle"></i></p>
      <figure>
        <img src="${d['img']}">
        <figcaption>${d["desc"]}</figcaption>
      </figure>
    </li>
    `;
    productList.insertAdjacentHTML('beforeend', item);
  });
  // var allData = data;
  // return data;
  handleStuff(data);
}


// console.log(allData);

function handleStuff(data) {

  console.log(data);
// document.addEventListener('readystatechange', () => {
    
  console.log("do other stuff");

  const [...productListItems] = document.querySelectorAll("#products ul li");
  console.log(productListItems);
  const productNames = productListItems.map(p => p.innerText);
  const addItemButtons = document.querySelectorAll(".fa-plus-circle");
  console.log(addItemButtons);
  const cartButton = document.querySelector(".fa-shopping-cart");
  const cartSection = document.querySelector("#cartSection");
  const cart = document.querySelector("#cart");
  const badge = document.querySelector("#badge");

  let shoppingCart = [];
  // {
  //   "name": "Cat Toy",
  //   "img": "cat.jpg",
  //   "price": 4.99,
  //   "desc": "A fun toy to roll around."
  // }


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
      // console.log(data[a.id]);
      let curr = data.find((e) => {
        return e.name == a.id;
      });
      console.log(curr);
      // shoppingCart.push(a.previousSibling.textContent);
      shoppingCart.push(curr);
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
      // cart.innerHTML += `<li>${s}<i class="fas fa-minus-circle"></i></li>`;
      cart.innerHTML += `
        <li>
          <img src="${s['img']}"> <strong>${s["name"]}</strong>: £${s["price"]}<i class="fas fa-minus-circle"></i>
        </li>
        `;
    });
    badge.innerText = shoppingCart.length;
    updateDeleteButtons();
    localStorage.setItem("shoppingCart", shoppingCart);
  }

// });

}
