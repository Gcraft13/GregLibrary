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
const myLibrary = [
  (book1 = {
    title: "The Hobbit",
    author: "J.R.R. Tolkein",
    pages: 265,
    read: "Yes",
  }),
];

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

  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  p1.innerHTML = "Title: " + book.title;
  p2.innerHTML = "Author: " + book.author;
  p3.innerHTML = "Pages: " + book.pages;
  p4.innerHTML = "Read: " + book.status;

  newCardInfo.appendChild(p1);
  newCardInfo.appendChild(p2);
  newCardInfo.appendChild(p3);
  newCardInfo.appendChild(p4);
  cardsSpace.appendChild(newDiv);
  //adding read button
  const readButton = document.createElement("button");
  readButton.innerHTML = "Change Status";
  readButton.classList.add("read-button");
  readButton.classList.add("read-button:hover");
  newCardInfo.appendChild(readButton);
}

function Book(bookTitle, author, pages, status) {
  this.title = bookTitle;
  this.author = author;
  this.pages = pages;
  this.status = status;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;
  };
}

const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");

//Submitting the form and acquring data
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookTitle = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#status");

  const book = new Book(bookTitle, author, pages, status);
  addBooktoLibrary(book);
  form.reset();
  dialog.close();
  let index = myLibrary.indexOf(book);
  let bookStatus = myLibrary[index].status;

  document.querySelectorAll(".read-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      const BookIndex = e.currentTarget.getAttribute("status");
      console.log(BookIndex);
      if (BookIndex !== null) {
        myLibrary[BookIndex].status =
          myLibrary[BookIndex].status === "true" ? "false" : "true";
      }
    });
  });
});

// function isChecked() {
//   const checkBox = document.getElementById("status");
//   if (checkBox.isChecked) {
//     book.status = "No";
//   }
// }
