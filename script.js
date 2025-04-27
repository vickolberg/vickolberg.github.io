
document.getElementById("startbtnWord").addEventListener("click", (event) => {
    // get text input
    let secretWord = document.getElementById("secretWord").value; 
    //console.log(secretWord);

    //get dropdown list input
    let secretWordAuto = document.querySelector(".wordListHelp").value; 
    //console.log(secretWordAuto);

    if (secretWord && secretWordAuto){ //checks if both have input
        alert("Error. You can only pick one word");
        event.preventDefault();
    }
    if (secretWord) { 
        localStorage.setItem('secretWord', secretWord);

    }
    else if (secretWordAuto){
        localStorage.setItem('secretWord', secretWordAuto);

    } else { 
        alert("Error. No Word has been chosen");
        event.preventDefault();
    }
});