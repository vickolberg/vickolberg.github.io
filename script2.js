let image = document.getElementById("image");
let button = document.getElementById("button");
let currentIndex = 0;
let secretWord = localStorage.getItem('secretWord');
let secretWordAuto = localStorage.getItem('secretWordAuto');

let secretWordArray = secretWord.split("");
console.log(secretWordArray);

// image files stored in an array
const imageFiles = [
    "/vickolberg.github.io/hangmanImages/image2.png",
    "/vickolberg.github.io/hangmanImages/image3.png",
    "/vickolberg.github.io/hangmanImages/image4.png",
    "/vickolberg.github.io/hangmanImages/image5.png",
    "/vickolberg.github.io/hangmanImages/image6.png",
    "/vickolberg.github.io/hangmanImages/image7.png",
    "/vickolberg.github.io/hangmanImages/image8.png",
    "/vickolberg.github.io/hangmanImages/image9.png",
    "/vickolberg.github.io/hangmanImages/image10.png"
];

// Function to change the image
//no touch. works well.
function changeImage() {
    image.setAttribute('src', imageFiles[currentIndex]);
    currentIndex = (currentIndex + 1) % imageFiles.length; // Increment index, loop back if exceeds array length
}

// Function to generate styled underlines 
// no touch. works well.
function generateStyledUnderlines(secretWord) {
    let underlines = '';
    for (let letter of secretWord) {
        if (letter.match(/[a-zA-Z]/)) {
            underlines += '<span class="underlined-letter">' + ' _ ' + '</span>';
        } else {
            underlines += letter;
        }
    }
    return underlines;
}

//no touch. works well
function revealLetter(element, letter) {
    element.textContent = letter;
}

// no touch. works well.
function revealLetterInSecretWord(clickedLetter) {
    let indices = [];
    for (let i = 0; i < secretWordArray.length; i++) {
        if (secretWordArray[i].toUpperCase() === clickedLetter.toUpperCase()) {
            indices.push(i);
        }
    }

    if (indices.length > 0) {
        let elements = document.getElementsByClassName('underlined-letter');
        for (let index of indices) {
            revealLetter(elements[index], secretWordArray[index]);
        }

        // Check if all letters have been revealed
        let allRevealed = true;
        for (let i = 0; i < secretWordArray.length; i++) {
            if (elements[i].textContent !== secretWordArray[i]) {
                allRevealed = false;
                break;
            }
        }
        if (allRevealed) {
            document.getElementById("result").innerText = "You won!";
            let alphabetLetters = document.getElementsByClassName("alphabetLetter");
            for (let i = 0; i < alphabetLetters.length; i++) {
                alphabetLetters[i].style.cursor = "not-allowed";
            }
            // Remove event listener from all buttons
            for (let i = 0; i < alphabetLetters.length; i++) {
                alphabetLetters[i].removeEventListener("click", handleButtonClick);
            }
            resetButton = document.getElementById("resetButton");
            resetButton.style.display = "inline";
            anchor = document.getElementById("anchor");
            anchor.style.display = "inline";
            document.body.appendChild(resetButton, anchor);
        }
    }
}

// Function to handle button click
function handleButtonClick() {
    clickedLetter = this.innerText;
    // Change style after button has been clicked
    this.style.backgroundColor = "#4f473f";
    this.style.textDecoration = "line-through";
    console.log(clickedLetter); // For debugging it will display the letter clicked
    revealLetterInSecretWord(clickedLetter);

    // Check if clicked letter is not in the secret word
    if (!secretWordArray.includes(clickedLetter.toLowerCase()) && 
        !secretWordArray.includes(clickedLetter.toUpperCase())) {
        changeImage();
    }
}

// Create div element with id
// no touch. works well
const buttonsDiv = document.createElement('div');
buttonsDiv.id = 'buttonsDiv';

// Create button group inside buttonsDiv with 26 buttons
// no touch. works well.
for (let i = 0; i < 26; i++) {
    const button = document.createElement('button'); // Create a button element
    button.className = 'alphabetLetter'; // Assign button class
    // Set the inner text of the button to a letter of the alphabet
    button.innerText = String.fromCharCode(65 + i); // ASCII code for 'A' is 65
    // Append the button to the buttonsDiv
    buttonsDiv.appendChild(button);
    // Add event listener to each button
    button.addEventListener("click", handleButtonClick);
}
// Append the buttonsDiv to the document body
// no touch. works well.
document.body.appendChild(buttonsDiv);

// Generate and display underlines for secretWord
//no touch. works well.
let styledUnderlines = generateStyledUnderlines(secretWord);
// Append underlines to an existing element with id "blanks"
//no touch. works well.
document.getElementById("blanks").innerHTML = styledUnderlines;
