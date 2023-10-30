// Declare variables
let imgURL;
let myImage;
let img; 
let startButton;
let slider;
let originalImageURL;
let originalImage;
let apiKey = 'eec85815-ab2e-465c-acab-f168f2edfb1f'; 

// Tiles configuration
let tiles = [];
let cols = 4;
let rows = 4;
let w, h;

// Order of tiles
let board = [];

//loading Api data
function preload() {
  apiRequest();
}

function playAgain() {
   apiRequest().then(() => {
      start = true
      // resetPuzzle()
     tiles = []
     board = []
    playAgainButton.hide()
   }
   )


}

// Tile class to represent individual tiles
class Tile {
  constructor(i, img) {
    this.index = i;
    this.img = img;
  }
}


function setup() {
  createCanvas(600, 600);
  // Pixel dimensions of each tile
  w = width / cols;
  h = height / rows;
  //Creating Start Button 
  startButton = createButton('Start Game');
  startButton.position(250,280);
  startButton.size(120, 50);
  startButton.mousePressed(startPuzzle)
  //Play again Buttob
  playAgainButton = createButton('Play Again');
  playAgainButton.position(250, 280);
  playAgainButton.size(120, 50);
  playAgainButton.hide(); // Hide the play again button initially
  playAgainButton.mousePressed(playAgain)
  //Creating Slider  
  slider = createSlider(2,10,4,1)
  slider.position(0,600);
  slider.input(updateSlider);
 
}

// Fetch image data from an API
async function apiRequest() {
  // let request = await fetch("https://dog.ceo/api/breeds/image/random");
  let request = await fetch(`https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=50`);
  let data = await request.json();
  console.log(data.records)
  // artworks = data.records.filter(artwork => artwork.primaryimageurl);
  artworks = data.records.filter(artwork => artwork.primaryimageurl);
  if (artworks.length == 0){
    apiRequest()
  }
  let randomIndex = int(random(artworks.length-1))
  imgURL = artworks[randomIndex].primaryimageurl;
  // if 
    // let randomIndex = Math.floor(random(artworks.length));
    // let selectedArtwork = artworks[randomIndex];
    myImage = loadImage(imgURL, () => {
    myImage.resize(600,600)

    // Chop up myImage into tiles
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * w;
        let y = j * h;
        img = createImage(w, h);
        img.copy(myImage, x, y, w, h, 0, 0, w, h);
        let index = i + j * cols;
        board.push(index);
        let tile = new Tile(index, img);
        tiles.push(tile);
      }
    }
    originalImage = loadImage(imgURL)
    console.log(tiles)
    // Remove the last tile
    tiles.pop();
    board.pop();
    // -1 means empty spot
    board.push(-1);
    // Shuffle the board
    simpleShuffle(board);
  });
}

// Swap two elements of an array
function swap(i, j, arr) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Pick a random spot to attempt a move
function randomMove(arr) {
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1, r2, arr);
}


// Shuffle the board
function simpleShuffle(arr) {
  for (let i = 0; i < 10000; i++) {
    randomMove(arr);
  }
}

// Move based on click
function mousePressed() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / h);
  move(i, j, board);
}

let showOriginalImage = false
function showOriginalImageOnCanvas() {
  console.log("here. show org image was clicked", imgURL)
  // image(myImage, 800, 800)
  showOriginalImage = true
}
let start = false;
async function draw() {
  background(0);

  // Draw the current board
  if (start == true) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if (tileIndex > -1) {
        let img = tiles[tileIndex].img;
        image(img, x, y, w, h);
      }
    }
  }

  // Show it as grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }
  }

  // If it is solved
  if (isSolved() && start == true) {
    console.log("SOLVED");
   //Play again button when sloved 
    playAgainButton.show()

  }
  
    // If it is solved
  if (isSolved() == false) {
    // console.log("SOLVED");
   //Play again button when sloved 
    playAgainButton.hide()

  }


  //Creating buttons
  if (start == true) {
    startButton.hide()
  }
//show OrgImg 
 showOrgImgButton = createButton('Hold for Original Img');
 showOrgImgButton.position(462, 600);
 showOrgImgButton.mousePressed(showOriginalImageOnCanvas)
 showOrgImgButton.mouseReleased(hideOriginalImage)


 if(showOriginalImage == true) {
  originalImage.resize(600,600)
  image(originalImage, 0, 0)
 } else {
  if (originalImage != undefined) {
  // console.log("original image", originalImage)
  originalImage.resize(0,0)
  
  }
 }
}

function startPuzzle() {
  start = true;
}
function hideOriginalImage() {
  showOriginalImage = false
}
// Check if solved
function isSolved() {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== tiles[i].index) {
      return false;
    }
  }
  return true;
}

// Swap two pieces
function move(i, j, arr) {
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank / rows);

  // Double check valid move
  if (isNeighbor(i, j, blankCol, blankRow)) {
    swap(blank, i + j * cols, arr);
  }
}

// Check if neighbor
function isNeighbor(i, j, x, y) {
  if (i !== x && j !== y) {
    return false;
  }

  if (abs(i - x) == 1 || abs(j - y) == 1) {
    return true;
  }
  return false;
}


// Function to track blank spot
function findBlank() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == -1) return i;
  }
}

function updateSlider() {
  cols = slider.value(); // Update the number of columns with the slider value
  rows = slider.value(); // Update the number of rows with the slider value
  w = width / cols; // Update the width of each tile
  h = height / rows; // Update the height of each tile
  resetPuzzle(); // Reset the puzzle with the new configuration
}

function resetPuzzle() {
  tiles = [];
  board = [];

  // Chop up myImage into tiles with the new configuration
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      img = createImage(w, h);
      img.copy(myImage, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }

  // Remove the last tile
  tiles.pop();
  board.pop();
  // -1 means an empty spot
  board.push(-1);
  // Shuffle the board
  simpleShuffle(board);
}
