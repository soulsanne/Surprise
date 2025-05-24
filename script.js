const correctPin = "1712";
let currentPin = "";

const triviaPage = document.getElementById("triviaPage");
const pinPage = document.getElementById("pinPage");
const greetingPage = document.getElementById("greetingPage");
const pinDisplay = document.getElementById("pinDisplay");
const clickSound = document.getElementById("clickSound");
const backsound = document.getElementById("backsound");
const typingText = document.getElementById("typingText");

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "Apa ibukota dari negara Thailand?",
    answers: {
      a: "Bangkok",
      b: "Chiang Mai",
      c: "Phuket"
    },
    correctAnswer: "a"
  },
  {
    question: "Berapakah hasil dari 15 x 3?",
    answers: {
      a: "45",
      b: "30",
      c: "60"
    },
    correctAnswer: "a"
  },
  {
    question: "Siapa ilmuwan teori relativitas?",
    answers: {
      a: "Isaac Newton",
      b: "Albert Einstein",
      c: "Galileo Galilei"
    },
    correctAnswer: "b"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((q, i) => {
    const answers = Object.entries(q.answers).map(([letter, text]) =>
      `<label><input type="radio" name="question${i}" value="${letter}"> ${letter}: ${text}</label>`
    ).join("");
    output.push(`<div class="question">${q.question}</div><div class="answers">${answers}</div>`);
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  myQuestions.forEach((q, i) => {
    const selector = `input[name=question${i}]:checked`;
    const userAnswer = (quizContainer.querySelector(selector) || {}).value;
    if (userAnswer === q.correctAnswer) {
      numCorrect++;
      answerContainers[i].style.color = "lightgreen";
    } else {
      answerContainers[i].style.color = "salmon";
    }
  });

  resultsContainer.textContent = `${numCorrect} dari ${myQuestions.length} benar`;

  if (numCorrect === myQuestions.length) {
    transitionToPin();
  } else {
    alert("Masih ada yang salah, coba lagi yaa!");
  }
}

function transitionToPin() {
  triviaPage.classList.add("hidden");
  pinPage.classList.remove("hidden");
  document.body.style.backgroundImage = "url('images/pin-bg.jpg')";
}

function appendPin(num) {
  clickSound.currentTime = 0;
  clickSound.play();
  if (currentPin.length < 4) {
    currentPin += num;
    pinDisplay.textContent = currentPin.padEnd(4, "_");
  }
}

function clearPin() {
  currentPin = "";
  pinDisplay.textContent = "____";
}

function submitPin() {
  if (currentPin === correctPin) {
    playGreeting();
  } else {
    alert("PIN salah!");
    clearPin();
  }
}

function playGreeting() {
  pinPage.classList.add("hidden");
  greetingPage.classList.remove("hidden");
  document.body.style.backgroundImage = "url('images/greeting-bg.jpg')";
  backsound.play();
  startTyping();
}

const message = `Selamat ulang tahun, sayang! 🎂💖

Semoga hari-harimu dipenuhi cinta, rezeki, dan kebahagiaan.
Semoga kita selalu bersama dalam suka dan duka. 💑✨

Aku sayang kamu, selalu. 💕`;

let i = 0;
function startTyping() {
  if (i < message.length) {
    typingText.textContent += message.charAt(i);
    i++;
    setTimeout(startTyping, 50);
  }
}

buildQuiz();
submitButton.addEventListener("click", showResults);
