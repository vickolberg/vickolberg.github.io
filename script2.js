let image = document.getElementById("image");
let button = document.getElementById("button");
let currentIndex = 0;
let secretWord = localStorage.getItem('secretWord');

let secretWordArray = secretWord.split("");

console.log(secretWordArray);

// image files stored in an array - drew them on the ipad
const imageFiles = [
    "/hangmanImages/image2.png",
    "/hangmanImages/image3.png",
    "/hangmanImages/image4.png",
    "/hangmanImages/image5.png",
    "/hangmanImages/image6.png",
    "/hangmanImages/image7.png",
    "/hangmanImages/image8.png",
    "/hangmanImages/image9.png",
    "/hangmanImages/image10.png"
];

function changeImage() {
    image.setAttribute('src', imageFiles[currentIndex]);
    currentIndex++;

    if (currentIndex > 8) {
        console.log(currentIndex);
        document.getElementById("result").innerText = "You lost!";
        giveAway = document.createElement("h4");
        giveAway.id = "giveAway";
        giveAway.textContent = `The word was: ${secretWord}`;
        document.body.appendChild(giveAway);

        document.querySelectorAll('.alphabetLetter').forEach(button => {
            button.removeEventListener("click", handleButtonClick);
        });
    }
}

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

function revealLetter(element, letter) {
    element.textContent = letter;
}

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

function handleButtonClick() {
    clickedLetter = this.innerText;
    this.style.backgroundColor = "#4f473f";
    this.style.textDecoration = "line-through";
    console.log(clickedLetter); 
    revealLetterInSecretWord(clickedLetter);

    if (!secretWordArray.includes(clickedLetter.toLowerCase()) && 
        !secretWordArray.includes(clickedLetter.toUpperCase())) {
        changeImage();
    }
}


const buttonsDiv = document.createElement('div');
buttonsDiv.id = 'buttonsDiv';

for (let i = 0; i < 26; i++) {
    const button = document.createElement('button'); 
    button.className = 'alphabetLetter'; 
    button.innerText = String.fromCharCode(65 + i); // ASCII code for 'A' is 65
    buttonsDiv.appendChild(button);
    button.addEventListener("click", handleButtonClick);
}

document.body.appendChild(buttonsDiv);


let styledUnderlines = generateStyledUnderlines(secretWord);

document.getElementById("blanks").innerHTML = styledUnderlines;
