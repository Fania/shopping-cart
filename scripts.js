"use strict";


// SET

const names = ['salimah','dave','fania'];
// before setting, you could check the items exist in locaStorage:
// if (!localStorage.getItem("localStorageNames")){ --line 17 here-- }
localStorage.setItem("localStorageNames", names);
let getFirstNames = localStorage.getItem("localStorageNames").split(',');
console.log(getFirstNames);
console.log(getFirstNames[1]);


const fullNames = [
  {salimah: 'Salimah Mohamed'},
  {dave: 'Dave Everitt'},
  {fania: 'Fania Raczinski'}
]
localStorage.setItem("localStoragefullNames", JSON.stringify(fullNames));
let getFullNames = JSON.parse(localStorage.getItem("localStoragefullNames"));

console.log(getFullNames);
console.log(getFullNames[0].salimah);



console.log('\n\nJSON format: an array of nested objects--------');
      
const contacts = [
  {
    firstName: 'Fania',
    secondName: 'Raczinski',
    email: 'fania.raczinski@dmu.ac.uk'
  },
  {
    firstName: 'Salimah',
    secondName: 'Mohamed',
    email: 'salimah.mohamed@dmu.ac.uk'
  },
  {
    firstName: 'Dave',
    secondName: 'Everitt',
    email: 'deveritt@dmu.ac.uk'
  }
]
localStorage.setItem("localStoragecontacts", JSON.stringify(contacts));
let getcontacts = JSON.parse(localStorage.getItem("localStoragecontacts"));

console.log(getcontacts);
let firstContact = getcontacts[0];
console.log(`${firstContact.firstName} ${firstContact.secondName}, email: ${firstContact.email}`);

/*
  JSON.stringify takes a JavaScript data object and turns it into a string:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  JSON.parse does the reverse:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
*/





// GET



// let getFullNames = JSON.parse(localStorage.getItem("localStoragefullNames"));
// print(getFullNames);
// print(`getFullNames[0].salimah gets: ${getFullNames[0].salimah}`);



// print('\n\nJSON format, an array of nested objects: --------');
      
// const contactDetails = document.getElementById("contacts");
// let getContacts = JSON.parse(localStorage.getItem("localStoragecontacts"));
// print(getContacts);
// let firstContact = getContacts[0];
// // check in the console that we have the data we requested above:
// print(
//   `${firstContact.firstName} ${firstContact.secondName}, email: ${firstContact.email}`
// );


// let counter = 0;
// // this function wraps the value of each key-value pair in an HTML 'li' tag
// // the counter (lines 45-46) just shows how many times the function is called
// function parseContact(item) {
//   let contact = `<li>${item.firstName} ${item.secondName}, email: ${item.email}</li>`;
//   counter +=1;
//   print(`\n\nlocalStoragecontacts ${counter}:`);
//   print(contact);
//   return contact;
// }
// // iterates through the data, calling the function above each time
// contactDetails.innerHTML = getContacts.map(parseContact).join('');

/*
  You can use `map` to iterate through key-value pairs without counting, doing something 
  with each key-value pair.
  
  On line 53, we pass each contact object pair to the 'parseContact()' function.
  map() on MDN:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  
  join() gets the character between the nested objects (a comma).
  join('') sets the character between the nested objects to nothing.
  
  join() on MDN:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join -->
*/
