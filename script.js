let currentPin = "";
const correctPin = "1712";

const pinDisplay = document.getElementById("pinDisplay");
const pinPage = document.getElementById("pinPage");
const greetingPage = document.getElementById("greetingPage");
const typingText = document.getElementById("typingText");
const clickSound = document.getElementById("clickSound");
const typingSound = document.getElementById("typingSound");

let typingInterval; // untuk kontrol suara ketikan
let i = 0;

const message = `Selamat bertambah usia, bayikk gede kesayangan aku! 👶🏻🎂🩷🎉

Semoga kamu sentiasa menjadi insan yang pemurah, rajin beribadat, dan diberkahi umur sepanjang hidupmu. 💞✨

Semoga segala kesulitanmu dilapangkan, rezekimu dilimpahkan, dan perjalanan hidupmu dipermudahkan hingga ke akhir hayat. 💘🌈

Semoga kamu—dan kita—direzekikan jodoh yang baik, bertanggungjawab dan bertolak ansur. Yang mampu menjaga dan memimpin rumahtangga ke jalan yang benar dan penuh keberkatan. 💝🏡

Semoga setiap doa, impian dan harapan yang kamu impikan dan dambakan… dimakbulkan, satu demi satu. 🙏🏻🌟`;

function appendPin(num) {
  if (currentPin.length < 4) {
    currentPin += num;
    pinDisplay.textContent = currentPin.padEnd(4, "_");

    // Suara klik hanya sekali
    clickSound.currentTime = 0;
    clickSound.play();

    // Efek tombol aktif
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
    startTyping();
  } else {
    alert("PIN salah!");
    clearPin();
  }
}

function startTyping() {
  i = 0;
  typingText.textContent = "";

  typingInterval = setInterval(() => {
    if (i < message.length) {
      typingText.textContent += message.charAt(i);

      // Suara hanya setiap 2 huruf untuk menghindari spam
      if (i % 2 === 0) {
        if (!typingSound.paused) {
          typingSound.pause();
          typingSound.currentTime = 0;
        }
        typingSound.play();
      }

      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}
