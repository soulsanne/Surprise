const correctPin = "1712";
let currentPin = "";

const pinDisplay = document.getElementById("pinDisplay");
const pinPage = document.getElementById("pinPage");
const greetingPage = document.getElementById("greetingPage");
const typingText = document.getElementById("typingText");
const clickSound = document.getElementById("clickSound");
const typingSound = document.getElementById("typingSound");

const triviaPage = document.getElementById("triviaPage");
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

const myQuestions = [
  {
    question: "Siapa penemu bola lampu?",
    answers: {
      a: "Nikola Tesla",
      b: "Alexander Graham Bell",
      c: "Thomas Edison"
    },
    correctAnswer: "c"
  },
  {
    question: "Apa ibukota Australia?",
    answers: {
      a: "Sydney",
      b: "Melbourne",
      c: "Canberra"
    },
    correctAnswer: "c"
  },
  {
    question: "Berapa hasil dari 12 x 12?",
    answers: {
      a: "144",
      b: "121",
      c: "132"
    },
    correctAnswer: "a"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((q, i) => {
    const answers = [];
    for (let letter in q.answers) {
      answers.push(`
        <label>
          <input type="radio" name="question${i}" value="${letter}">
          ${letter}: ${q.answers[letter]}
        </label>
      `);
    }
    output.push(`<div class="question">${q.question}</div><div class="answers">${answers.join("")}</div>`);
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  myQuestions.forEach((q, i) => {
    const container = answerContainers[i];
    const selector = `input[name=question${i}]:checked`;
    const userAnswer = (container.querySelector(selector) || {}).value;
    if (userAnswer === q.correctAnswer) {
      numCorrect++;
      container.style.color = "green";
    } else {
      container.style.color = "red";
    }
  });

  resultsContainer.innerHTML = `${numCorrect} dari ${myQuestions.length} jawaban benar.`;

  if (numCorrect === myQuestions.length) {
    triviaPage.classList.remove("active");
    pinPage.classList.add("active");
  } else {
    alert("Jawaban belum semua benar. Coba lagi!");
  }
}

buildQuiz();
submitButton.addEventListener("click", showResults);

function appendPin(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    pinDisplay.textContent = currentPin.padEnd(4, "_");
    clickSound.currentTime = 0;
    clickSound.play();

    const buttons = document.querySelectorAll('.keypad button');
    buttons.forEach(btn => {
      if (btn.textContent === num) {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 150);
      }
    });
  }
}

function clearPin() {
  currentPin = "";
  pinDisplay.textContent = "____";
}

function submitPin() {
  if (currentPin === correctPin) {
    pinPage.classList.remove("active");
    greetingPage.classList.add("active");
    setTimeout(startTyping, 300);
  } else {
    alert("PIN salah!");
    clearPin();
  }
}

const message = `Selamat bertambah usia, bayikk gede kesayangan aku! 👶🏻🎂🩷🎉

Semoga kamu sentiasa menjadi insan yang pemurah, rajin beribadat, dan diberkahi umur sepanjang hidupmu. 💞✨

Semoga segala kesulitanmu dilapangkan, rezekimu dilimpahkan, dan perjalanan hidupmu dipermudahkan hingga ke akhir hayat. 💘🌈

Semoga kamu—dan kita—direzekikan jodoh yang baik, bertanggungjawab dan bertolak ansur. Yang mampu menjaga dan memimpin rumahtangga ke jalan yang benar dan penuh keberkatan. 💝🏡

Semoga setiap doa, impian dan harapan yang kamu impikan dan dambakan… dimakbulkan, satu demi satu. 🙏🏻🌟`;

let i = 0;
function startTyping() {
  if (i < message.length) {
    typingText.textContent += message.charAt(i);
    if (!typingSound.paused) {
      typingSound.pause();
    }
    typingSound.currentTime = 0;
    typingSound.play();
    i++;
    setTimeout(startTyping, 50);
  }
}
