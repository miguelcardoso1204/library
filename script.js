let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  };
}

let form = document.querySelector("#form");

form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
  e.preventDefault();

  let submitedTitle = document.getElementById("title").value;
  let submitedAuthor = document.getElementById("author").value;
  let submitedPages = document.getElementById("pages").value;
  let submitedRead = document.getElementById("read").checked;

  let newBook = new Book(
    submitedTitle,
    submitedAuthor,
    submitedPages,
    submitedRead
  );
  myLibrary.push(newBook);
  libraryToGrid(myLibrary);
}

const grid = document.querySelector(".grid");

function libraryToGrid(myLibrary) {
  grid.innerHTML = "";
  myLibrary.forEach((element) => {
    let book = document.createElement("div");
    let title = document.createElement("h4");
    let author = document.createElement("h5");
    let pages = document.createElement("p");
    let read = document.createElement("button");
    let remove = document.createElement("button");
    remove.textContent = "Remove";

    title.textContent = element.title;
    author.textContent = element.author;
    pages.textContent = `${element.pages} pages`;
    read.textContent = checkIfRead(element.read);
    read.className = changeReadButtonClass(element.read);
    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(remove);

    remove.addEventListener("click", () => {
      delete myLibrary[myLibrary.indexOf(element)];
      libraryToGrid(myLibrary);
    });

    read.addEventListener("click", () => {
      switchReadState(element);
      libraryToGrid(myLibrary);
    });

    function checkIfRead(read) {
      if (read === true) {
        return "Read";
      } else {
        return "Not Read";
      }
    }

    function changeReadButtonClass(read) {
      if (read === true) {
        return "read";
      } else {
        return "notRead";
      }
    }

    function switchReadState(element) {
      if (element.read === true) {
        element.read = false;
        changeReadButtonClass(element.read);
      } else {
        element.read = true;
        changeReadButtonClass(element.read);
      }
    }

    grid.appendChild(book);
  });
}

let addBookDiv = document.getElementById("div-form");

let addBookButton = document.getElementById("add-book-button");

addBookButton.addEventListener("click", () => showAddBookDiv());

console.log(addBookDiv);

function showAddBookDiv() {
  if (addBookDiv.style.display === "none") {
    addBookDiv.style.display = "flex";
  } else {
    addBookDiv.style.display = "none";
  }
}

libraryToGrid(myLibrary);
