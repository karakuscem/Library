/* eslint-disable no-restricted-globals */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-loop-func */
// Define array and Select Objects

// Get local storage
let library = JSON.parse(localStorage.getItem('library'));

const bookName = document.querySelector('#book');
const bookAuthor = document.querySelector('#author');
const bookStatus = document.querySelector('#status');
const form = document.querySelector('.form');
const cardSection = document.querySelector('#cards');

// If there is no storage make it else render storage

// Start app

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
  if (bookName.value !== '' || bookAuthor.value !== '' || bookStatus.value !== '') {
    const newBook = new Book(bookName.value, bookAuthor.value, bookStatus.value);
    library = JSON.parse(localStorage.getItem('library'));
    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
  }
}

// Function for clear form.
function clearForm() {
  bookName.value = '';
  bookAuthor.value = '';
}

// Render
function renderBooks() {
  cardSection.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    const div = document.createElement('div');
    div.classList.add('bookCard');
    cardSection.appendChild(div);

    const title = document.createElement('h1');
    title.classList.add('bookTitle');
    div.appendChild(title);

    const para = document.createElement('p');
    para.classList.add('bookAuthor');
    div.appendChild(para);

    const statusButton = document.createElement('button');
    statusButton.classList.add('bookStatus');
    statusButton.dataset.id = `${i}`;
    div.appendChild(statusButton);

    function changeStatus() {
      const statusToChange = statusButton.dataset.id;
      if (library[parseInt(statusToChange, 10)].status === 'Read') {
        library[parseInt(statusToChange, 10)].status = 'Not Read';
        localStorage.setItem('library', JSON.stringify(library));
        statusButton.innerHTML = 'Not Read';
        statusButton.style.backgroundColor = 'red';
        div.style.borderLeft = '10px solid red';
      } else {
        library[parseInt(statusToChange, 10)].status = 'Read';
        localStorage.setItem('library', JSON.stringify(library));
        statusButton.innerHTML = 'Read';
        statusButton.style.backgroundColor = 'green';
        div.style.borderLeft = '10px solid green';
      }
    }

    statusButton.addEventListener('click', changeStatus);

    const rmvButton = document.createElement('button');
    rmvButton.classList.add('remove');
    rmvButton.dataset.id = `${i}`;
    div.appendChild(rmvButton);

    function removeBook() {
      const bookToRemove = rmvButton.dataset.id;
      // eslint-disable-next-line no-alert
      if (confirm(`Are you sure to delete ${title.innerHTML} ?`)) {
        library.splice(parseInt(bookToRemove, 10), 1);
        localStorage.setItem('library', JSON.stringify(library));
        renderBooks();
      }
    }
    rmvButton.addEventListener('click', removeBook);

    title.innerHTML = `Book Name: ${library[i].name}`;
    para.innerHTML = `Author Name: ${library[i].author}`;
    statusButton.innerHTML = library[i].status;
    rmvButton.innerHTML = 'Remove';

    if (statusButton.innerHTML === 'Not Read') {
      statusButton.classList.add('redButton');
      div.classList.add('redBookCard');
    } else {
      statusButton.classList.add('greenButton');
      div.classList.add('greenBookCard');
    }
  }
}

const startApp = () => {
  if (!library) {
    library = localStorage.setItem('library', JSON.stringify([]));
  } else {
    library = JSON.parse(localStorage.getItem('library'));
    renderBooks();
  }
};

// eslint-disable-next-line no-unused-vars
function formValidate() {
  if (!bookName.checkValidity()) {
    bookName.placeholder = bookName.validationMessage;
  } else if (!bookAuthor.checkValidity()) {
    bookAuthor.placeholder = bookAuthor.validationMessage;
  } else if (!bookStatus.checkValidity()) {
    bookStatus.options[0].innerHTML = bookStatus.validationMessage;
  } else {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addBookLibrary();
      renderBooks();
      clearForm();
      bookName.placeholder = '';
      bookAuthor.placeholder = '';
      bookStatus.options[0].innerHTML = 'Select Status';
      bookStatus.selectedIndex = '0';
    });
  }
}

startApp();
