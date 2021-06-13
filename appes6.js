/* Implementing same functionality
   as in app.js but using ES6  */

// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create a div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#book-form");
    // Insert alert before the form
    container.insertBefore(div, form);
    // Timeout after 3s
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {}

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook() {}
}

// Instantiate UI
const ui = new UI();

// Event listeners - add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiating a book object
  const book = new Book(title, author, isbn);

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage. No neen to instantiate as it is using a static method
    Store.addBook(book);

    // Show success alert
    ui.showAlert("Book successfully added to the list", "success");

    // Clear input fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener - delete book
document.querySelector("#book-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    // Delete book
    ui.deleteBook(e.target);
    // Show alert
    ui.showAlert("Book Removed", "success");
  }
});
