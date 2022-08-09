// Define array and Select Objects

let library = [];

const bookName = document.querySelector("#book");
const bookAuthor = document.querySelector("#author");
const bookStatus = document.querySelector("#status");
const addBook = document.querySelector(".btn");
const form = document.querySelector(".form")
const cardStatus = document.querySelectorAll(".bookStatus");
const removeButton = document.querySelectorAll(".remove");
const cardSection = document.getElementById("cards");

// Add Event Listener
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookLibrary();
    renderBooks();
    clearForm();
});

// Add Functions
// Constructor
class Book {
    constructor(name, author, status) {
        this.name = name.toUpperCase();
        this.author = author.toUpperCase();
        this.status = status;
    }
}

// Add book to library
function addBookLibrary() {
    if (bookName.value.length === 0 || bookAuthor.value.length === 0) {
        alert("Please fill all the fields.");
        return;
    }
    
    const newBook = new Book(bookName.value, bookAuthor.value, bookStatus.value)
    library.push(newBook);
}

// Function for clear form.
function clearForm() {
    bookName.value = "";
    bookAuthor.value = "";
}

// Function for change status.


//Render
function renderBooks() {
    for (let i = 0; i < library.length; i++) {
        const insertHTML = 
        `<div class="bookCard">
            <h1 class="bookTitle">Book Name: ${library[i].name}</h1>
            <p class="bookAuthor">Author Name: ${library[i].author}</p>
            <button class="bookStatus">Status: ${library[i].status}</button>
            <button class="remove">Remove</button>`;
        cardSection.insertAdjacentHTML("afterbegin", insertHTML);
    }
}

renderBooks();