const mainPage = document.querySelector(".main-content");
const deleteBtns = document.querySelectorAll(".delete");
const addBtn = document.querySelector(".add");
const card = document.querySelector(".card-one");
const allTheCards = document.querySelectorAll(".card-one");
const deleteBtnSection = document.querySelector(".delete-button");
const dialog = document.querySelector("dialog");
const removeBtn = document.getElementById("close");
const cardsSpace = document.querySelector(".cards");
const readBook = document.querySelector(".read-button");
const isRead = document.getElementById("status");

//delete book
function deleteBook() {
  if (allTheCards) {
    for (var i = 0; i < allTheCards.length; i++) {
      allTheCards[i].addEventListener("click", function () {
        allTheCards.remove();
      });
    }

    localStorage.setItem("card", "true");
  }
}
window.addEventListener("load", () => {
  if (localStorage.getItem("allTheCards") == "true") {
    deleteBook();
  }
});

//deletebutton function

for (var i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener("click", function (e) {
    let parentCard = e.target.parentElement.parentElement;
    parentCard.remove();
  });
}

//Add the form
addBtn.addEventListener("click", () => {
  // OpenPopUp.style.display = "block";

  dialog.showModal();
  localStorage.setItem("dialogShown", "true");
});

//Remove the form
removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
  if (localStorage.getItem("dialogShown") === "true") {
    // Prevent dialog from showing
  }

  // On dialog close
  localStorage.removeItem("dialogShown");
});

//prevent modal from appearing on page reload
if (localStorage.getItem("modalClosed") !== "true") {
  document.querySelector("dialog").close();
}
document.getElementById("close").addEventListener("click", function () {
  document.querySelector("dialog").close();
});

//The library functions
const myLibrary = [];

function addBooktoLibrary(book) {
  myLibrary.push(book);
  generateCard(book);
}

function generateCard(book) {
  const newDiv = document.createElement("div");
  const newDiv2 = document.createElement("div");

  //Creating a new book card
  newDiv.classList.add("card-one");
  // //adding new Delete Button Div and Delete Button
  newDiv2.classList.add("delete-button");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "X";
  deleteButton.classList.add("delete");

  newDiv2.appendChild(deleteButton);
  newDiv.appendChild(newDiv2);
  //adding delete functionatlity to newly generated deletebuttons
  deleteButton.addEventListener("click", function () {
    newDiv.remove();
  });
  //Adding new Card Info div
  const newCardInfo = document.createElement("div");
  newCardInfo.classList.add("card-info");
  newDiv.appendChild(newCardInfo);

  // //add new paragraph content elements

  newCardInfo.innerHTML = `<h3>Title: ${book.title} </h3>
  <p>Author: ${book.author}</p>
  <p>Pages: ${book.pages}</p>
  <p>Read: ${book.status}</p>;`;

  cardsSpace.appendChild(newDiv);
  //adding read button
  const readButton = document.createElement("button");
  readButton.innerHTML = "Change Status";
  readButton.classList.add("read-button");
  readButton.classList.add("read-button:hover");
  newCardInfo.appendChild(readButton);
}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");

//Submitting the form and acquring data
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#status");

  const book = new Book(title, author, pages, status);
  addBooktoLibrary(book);
  form.reset();
  dialog.close();
  let index = myLibrary.indexOf(book);
  let bookStatus = myLibrary[index].status;
});
