const createNewBtn = document.getElementById("create-new-btn");
const cancelBtn = document.getElementById("cancel-btn");
const removeBtns = document.querySelectorAll(".remove-btn");

const bookContainer = document.querySelector(".card-container");
const modal = document.querySelector(".modal-container");
const form = document.querySelector(".book-form");

const books = [];

function Book(title, author){
    this.title = title;
    this.author = author;
    this.isRead = false;
    this.id = crypto.randomUUID(); //future use?
}

function addBookToLibrary(title, author){
    const book = new Book(title, author);
    books.push(book);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <p class="title">${title}</p>
        <p class="author">${author}</p>
        <div class="btn-container">
            <button class="remove-btn">Remove</button>
            <button class="mark-btn">Mark As Read</button>
        </div>
    `;

    bookContainer.appendChild(card);
}

createNewBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    form.reset();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title-input').value;
    const author = document.getElementById('author-input').value;

    addBookToLibrary(title, author);

    form.reset();
    modal.style.display = 'none';
});
