const board = document.querySelector(".board");

const sizeInput = document.querySelector(".size-input");
const resize = document.querySelector(".resize");

const colorInput = document.querySelector(".color-input");
const selectColor = document.querySelector(".select");

const rainbow = document.querySelector(".rainbow");

const clear = document.querySelector(".clear");

let currentColor;
let currentSize;
let currentMode;
let isDrawing = false;

// Initiate drawing logic for the entire board
function initBoard(){
    board.addEventListener("mousedown", () => { isDrawing = true; });
    board.addEventListener("mouseup", () => { isDrawing = false; });
    board.addEventListener("mouseleave", () => { isDrawing = false; });
}
initBoard();

// Resizing board
function resizeBoard(size){
    board.innerHTML = "";

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 1; i <= size * size; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
    }

    const tiles = document.querySelectorAll(".tile");
    colorTiles(tiles);

    currentSize = size;
}

// Coloring tiles
function colorTiles(tiles){
    tiles.forEach((tile) => {
        tile.addEventListener("mousedown", () => {
            applyColor(tile);
        });
        tile.addEventListener("mouseover", () => {
            if (isDrawing){
                applyColor(tile);
            }
        });
    });
}

function applyColor(tile){
    if (currentMode == "single"){
        tile.style.backgroundColor = currentColor;
    }
    else if (currentMode == "rainbow"){
        tile.style.backgroundColor = getRandomColor();
    }
}

function getRandomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Buttons logic
resize.addEventListener("click", () => {
    const size = parseInt(sizeInput.value);
    if (size <= 0 || size >= 100){
        alert("Board size is either too small or too large!");
        return;
    }
    resizeBoard(size);
});

selectColor.addEventListener("click", () => {
    currentColor = colorInput.value;
    currentMode = "single";
});

rainbow.addEventListener("click", () => {
    currentMode = "rainbow";
});

clear.addEventListener("click", () => {
    board.innerHTML = "";
    resizeBoard(currentSize);
});