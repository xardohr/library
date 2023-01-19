const addBtn = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const booksContainer = document.querySelector(".books-container");
const readBtn = document.querySelector(".did-read");

// form
let title = document.querySelector(".title");
let author = document.querySelector(".author");
let pages = document.querySelector(".pages");
let checkbox = document.querySelector(".checkbox");
const submitBtn = document.querySelector(".submit");

// show modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// close modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBtn.addEventListener("click", function () {
  title.value = "";
  author.value = "";
  pages.value = "";
  openModal();
});
overlay.addEventListener("click", closeModal);
submitBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// core
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const read = checkbox.checked;
  const book = new Book(titleValue, authorValue, pagesValue, read);
  myLibrary.push(book);
  console.log(myLibrary);
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addBookToLibrary();
  displayLibrary();
});

const removeFromArray = function (myArray, index) {
  myArray.splice(index, 1);
};

function displayLibrary() {
  booksContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    // container of each book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-btn");
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("data-index", myLibrary.indexOf(book));
    deleteBtn.addEventListener("click", function (e) {
      let index = e.target.getAttribute("data-index");
      removeFromArray(myLibrary, index);
      displayLibrary();
      console.log(myLibrary);
    });
    // container of title
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    const titleP = document.createElement("p");
    titleP.classList.add("content-title");
    titleP.textContent = `Title:`;
    const titleContent = document.createElement("p");
    titleContent.classList.add("title-content");
    titleContent.textContent = book.title;
    // container of author
    const authorContainer = document.createElement("div");
    authorContainer.classList.add("author-container");
    const authorP = document.createElement("p");
    authorP.classList.add("content-title");
    authorP.textContent = `Author:`;
    const authorContent = document.createElement("p");
    authorContent.classList.add("author-content");
    authorContent.textContent = book.author;
    // container of pages
    const pagesContainer = document.createElement("div");
    pagesContainer.classList.add("pages-container");
    const pagesP = document.createElement("p");
    pagesP.classList.add("content-title");
    pagesP.textContent = `Pages:`;
    const pagesContent = document.createElement("p");
    pagesContent.classList.add("pages-content");
    pagesContent.textContent = book.pages;
    //read button
    let creatReadBtn = document.createElement("button");
    creatReadBtn.classList.add("did-read");
    if (book.read) {
      creatReadBtn.textContent = "Read";
      creatReadBtn.classList.add("read-yes");
    } else {
      creatReadBtn.textContent = "Not read yet";
      creatReadBtn.classList.add("read-no");
    }

    creatReadBtn.addEventListener("click", function () {
      if (creatReadBtn.classList.contains("read-yes")) {
        creatReadBtn.classList.remove("read-yes");
        creatReadBtn.classList.add("read-no");
        creatReadBtn.textContent = "Not read yet";
      } else if (creatReadBtn.classList.contains("read-no")) {
        creatReadBtn.classList.remove("read-no");
        creatReadBtn.classList.add("read-yes");
        creatReadBtn.textContent = "Read ";
      }
    });

    titleContainer.appendChild(titleP);
    titleContainer.appendChild(titleContent);

    authorContainer.appendChild(authorP);
    authorContainer.appendChild(authorContent);

    pagesContainer.appendChild(pagesP);
    pagesContainer.appendChild(pagesContent);

    bookDiv.appendChild(deleteBtn);
    bookDiv.appendChild(titleContainer);
    bookDiv.appendChild(authorContainer);
    bookDiv.appendChild(pagesContainer);
    bookDiv.appendChild(creatReadBtn);
    booksContainer.appendChild(bookDiv);
  });
}
