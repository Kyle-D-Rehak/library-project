const mainDiv = document.getElementById("main");
const addCard = document.getElementById('addCard');
const addButton = document.getElementById('addButton');
const cancelButton = document.getElementById('cancelButton');
const form = document.getElementById('form');
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    book.index = myLibrary.length - 1;
    createCard(book);
}

function changeStatus(e) {
    const index = e.target.parentNode.id;
    const thisButton = e.target;

    if (myLibrary[index].read === 'true') {
        thisButton.innerHTML = 'Not read';
        myLibrary[index].read = 'false';
        thisButton.classList.remove('true');
        thisButton.classList.add('false');
    } else if (myLibrary[index].read === 'false') {
        thisButton.innerHTML = 'Read!';
        myLibrary[index].read = 'true';
        thisButton.classList.remove('false');
        thisButton.classList.add('true');
    }
}

function createCard (book) {
    let factory = document.createElement;
    book.card = factory.call(document, 'div');
    book.card.classList.add("card");
    book.card.classList.add("book");
    book.card.setAttribute('id', `${book.index}`);
    if (book.read === 'true') {
        book.card.innerHTML = 
        `<h2>${book.title}</h2>
        <p>By ${book.author}</p>
        <p>${book.pages} pages</p>
        <button class="button status ${book.read}">Read!</button>
        <button class="button remove">Remove</button>`;
    } else {
    book.card.innerHTML = 
        `<h2>${book.title}</h2>
        <p>By ${book.author}</p>
        <p>${book.pages} pages</p>
        <button class="button status ${book.read}">Not read</button>
        <button class="button remove">Remove</button>`;
    }
    main.insertBefore(book.card, addCard);
    book.card.querySelector(`button.remove`).addEventListener('click', function() {book.card.remove();});
    book.card.querySelector(`button.status`).addEventListener('click', function(e) {changeStatus(e);});
}

function bookFactory(e) {
    let title = document.getElementById('title').value.trim();
    let author = document.getElementById('author').value.trim();
    let pages = document.getElementById('pages').value.trim();
    let read = document.querySelector('input[name="read"]:checked').value;

    if (title !== "" && author !== "" && pages !== "") {
    addBookToLibrary(title, author, pages, read);
    form.classList.remove('visible');
    form.reset();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    bookFactory(e);
});

addButton.addEventListener('click', () => {form.classList.add('visible')});

cancelButton.addEventListener('click', () => {
    form.classList.remove('visible');
    form.reset();});

