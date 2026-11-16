var rows = 5;
var cols = 5;

var current;
var other;

window.onload = function() {
    // 1. Create the 5x5 game board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.png";

            // Drag & drop listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Click listener to return piece to tray
            tile.addEventListener("click", returnPiece);

            document.getElementById("board").append(tile);
        }
    }

    // 2. Create and shuffle the 25 puzzle pieces
    let pieces = [];
    for (let i = 1; i <= rows * cols; i++) {
        pieces.push(i.toString());
    }
    pieces.sort(() => Math.random() - 0.5);

    // 3. Add pieces to the bottom container
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".png";

        // Drag & drop listeners
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

// 4. Drag-and-Drop Handler Functions
function dragStart() {
    current = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    other = this;
}

function dragEnd() {
    if (!other || current.src.includes("blank")) {
        return;
    }

    let currentImg = current.src;
    let otherImg = other.src;
    current.src = otherImg;
    other.src = currentImg;
    
    other = null;
}

// 5. Click Handler to Return Piece to Tray
function returnPiece() {
    // Do nothing if the clicked board space is already blank
    if (this.src.includes("blank")) {
        return;
    }

    // Find all slots in the bottom #pieces container
    let trayTiles = document.getElementById("pieces").getElementsByTagName("img");

    // Look for the first empty "blank.png" slot in the tray
    for (let i = 0; i < trayTiles.length; i++) {
        if (trayTiles[i].src.includes("blank")) {
            trayTiles[i].src = this.src;       // Put the piece back in the tray
            this.src = "./images/blank.png";   // Reset the board tile to blank
            break;                             // Stop looking once placed
        }
    }
}
