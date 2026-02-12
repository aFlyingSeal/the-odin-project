const createNewBtn = document.getElementById("create-new-btn");
const cancelBtn = document.getElementById("cancel-btn");
const removeBtns = document.querySelectorAll(".remove-btn");

const bookContainer = document.querySelector(".card-container");
const modal = document.querySelector(".modal-container");
const form = document.querySelector(".book-form");

const books = [];

class Book{
    constructor(title, author){
        this.title = title;
        this.author = author;
        this.isRead = false;
        this.id = crypto.randomUUID();
    }
};

// function Book(title, author){
//     this.title = title;
//     this.author = author;
//     this.isRead = false;
//     this.id = crypto.randomUUID(); //future use?
// }

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

bookContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card)
        return;
    
    const title = card.querySelector(".title");
    const titleText = title ? title.textContent.trim() : "";

    // removing book
    if (e.target.classList.contains("remove-btn")){
        card.remove();
        const idx = books.findIndex(book => book.title === titleText);
        if (idx !== -1)
            books.splice(idx, 1);
    }

    // marking read/unread for a book
    if (e.target.classList.contains("mark-btn")){
        const book = books.find(book => book.title === titleText);
        const markBtn = card.querySelector(".mark-btn");

        if (book && book.isRead === false){
            card.style.borderLeft = "8px solid hsl(103, 54%, 52%)";
            book.isRead = true;
            markBtn.textContent = "Mark As Unread";
        }
        else if (book){
            card.style.borderLeft = "8px solid hsl(19, 31%, 68%)";
            book.isRead = false;
            markBtn.textContent = "Mark As Read";
        }
    }
});