// Define array and Select Objects

// Get local storage
let library = JSON.parse(localStorage.getItem("library"));

const bookName = document.querySelector("#book");
const bookAuthor = document.querySelector("#author");
const bookStatus = document.querySelector("#status");
const addBook = document.querySelector(".btn");
const form = document.querySelector(".form")
const cardStatus = document.querySelectorAll(".bookStatus");
const removeButton = document.querySelectorAll(".remove");
const cardSection = document.querySelector("#cards");

// If there is no storage make it else render storage
const startApp = () => {
    if(!library){
        library = localStorage.setItem("library", JSON.stringify([]));
    }
    else{
        library = JSON.parse(localStorage.getItem("library"));
        renderBooks();
    }
}

// Start app
startApp();


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
    library = JSON.parse(localStorage.getItem("library"));
    library.push(newBook)
    localStorage.setItem("library", JSON.stringify(library));
}

// Function for clear form.
function clearForm() {
    bookName.value = "";
    bookAuthor.value = "";
}


//Render
function renderBooks() {
    cardSection.innerHTML = "";
    for (let i = 0; i < library.length; i++) {
        const div = document.createElement('div');
        div.classList.add("bookCard");
        cardSection.appendChild(div);

        const title = document.createElement('h1');
        title.classList.add("bookTitle");
        div.appendChild(title);

        const para = document.createElement('p');
        para.classList.add("bookAuthor");
        div.appendChild(para);

        const statusButton = document.createElement('button');
        statusButton.classList.add("bookStatus");
        statusButton.dataset.id = `${i}`;
        div.appendChild(statusButton);

        statusButton.addEventListener("click", changeStatus);
        function changeStatus(){
            let statusToChange = statusButton.dataset.id;
            if (library[parseInt(statusToChange)].status === "Read") {
                library[parseInt(statusToChange)].status = "Not Read";
                localStorage.setItem("library", JSON.stringify(library));
                statusButton.innerHTML = "Not Read";
                statusButton.style.backgroundColor = "red";
                div.style.borderLeft = "10px solid red";
            }
            else {
                library[parseInt(statusToChange)].status = "Read";
                localStorage.setItem("library", JSON.stringify(library));
                statusButton.innerHTML = "Read";
                statusButton.style.backgroundColor = "green";
                div.style.borderLeft = "10px solid green";
            }
        }

        const rmvButton = document.createElement('button');
        rmvButton.classList.add("remove");
        rmvButton.dataset.id = `${i}`;
        div.appendChild(rmvButton);

        rmvButton.addEventListener("click", removeBook);
        function removeBook(){
            let bookToRemove = rmvButton.dataset.id;
            if (confirm(`Are you sure to delete ${title.innerHTML} ?`)) {
                library.splice(parseInt(bookToRemove), 1);
                localStorage.setItem("library", JSON.stringify(library));
                renderBooks();
            }
        }

        title.innerHTML = `Book Name: ${library[i].name}`;
        para.innerHTML = `Author Name: ${library[i].author}`;
        statusButton.innerHTML = library[i].status;
        rmvButton.innerHTML = "Remove"

        if (statusButton.innerHTML == "Not Read") {
            statusButton.classList.add("redButton")
            div.classList.add("redBookCard");
        }
        else {
            statusButton.classList.add("greenButton")
            div.classList.add("greenBookCard");
        }
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookLibrary();
    renderBooks();
    clearForm();
});