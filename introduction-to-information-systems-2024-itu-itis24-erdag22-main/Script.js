const word = "PRISM"; 
let guessedWord = Array(word.length).fill(null);
let score = 0;
let lives = 3;

const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const heartsDisplay = document.getElementById("hearts");
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

function updateDisplay() {
    wordDisplay.innerHTML = ""; 
    guessedWord.forEach((char) => {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter-box");
        letterBox.textContent = char ? char : ""; 
        wordDisplay.appendChild(letterBox);
    });
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    updateHearts();
}

function updateHearts() {
    let hearts = "";
    for (let i = 0; i < lives; i++) {
        hearts += "❤️";
    }
    heartsDisplay.textContent = hearts;
}

guessInput.addEventListener("input", () => {
    submitBtn.disabled = guessInput.value.trim() === "";
});

submitBtn.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = "";

    if (word.includes(guess)) {
        word.split("").forEach((char, index) => {
            if (char === guess) guessedWord[index] = char;
        });
        score += 20;
    } else {
        lives--;
        if (lives <= 0) {
            alert("Kaybettiniz! Doğru kelime: " + word);
            resetGame();
            return;
        }
    }

    if (!guessedWord.includes(null)) {
        alert("Tebrikler, oyunu kazandınız!");
        resetGame();
    }

    updateDisplay();
});

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    guessedWord = Array(word.length).fill(null);
    score = 0;
    lives = 3;
    updateDisplay();
}

updateDisplay();
