document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // DATA SOAL
  // =======================
  const questions = [
    {
      question: "Ibukota Indonesia?",
      answers: ["Bandung", "Jakarta", "Medan", "Surabaya"],
      correct: 1
    },
    {
      question: "5 + 3 = ?",
      answers: ["6", "7", "8", "9"],
      correct: 2
    },
    {
      question: "Warna bendera Indonesia?",
      answers: ["Merah Putih", "Biru Putih", "Hijau Kuning", "Hitam Merah"],
      correct: 0
    },
    {
      question: "Planet terbesar?",
      answers: ["Mars", "Bumi", "Jupiter", "Venus"],
      correct: 2
    },
    {
      question: "HTML itu?",
      answers: [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyper Tool Multi Language",
        "Hyper Transfer Level"
      ],
      correct: 0
    },
    {
      question: "CSS digunakan untuk?",
      answers: ["Database", "Styling", "Server", "Logic"],
      correct: 1
    },
    {
      question: "JS itu singkatan dari?",
      answers: ["Java Source", "JavaScript", "Just Script", "Json Script"],
      correct: 1
    },
    {
      question: "2 x 6 = ?",
      answers: ["10", "11", "12", "13"],
      correct: 2
    },
    {
      question: "Air mendidih pada suhu?",
      answers: ["90°C", "100°C", "80°C", "70°C"],
      correct: 1
    },
    {
      question: "Bumi itu?",
      answers: ["Planet", "Bintang", "Satelit", "Asteroid"],
      correct: 0
    }
  ];

  let current = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const scoreEl = document.getElementById("score");
  const backBtn = document.getElementById("backBtn");

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadQuestion() {
    const q = questions[current];
    questionEl.innerText = q.question;
    answersEl.innerHTML = "";

    let shuffledAnswers = [...q.answers];
    shuffle(shuffledAnswers);

    shuffledAnswers.forEach((answer) => {
      const btn = document.createElement("button");
      btn.innerText = answer;

      btn.onclick = () => {
        if (answer === q.answers[q.correct]) {
          score++;
          btn.style.background = "#22c55e";
        } else {
          btn.style.background = "#ef4444";

          document.querySelectorAll("#answers button").forEach(b => {
            if (b.innerText === q.answers[q.correct]) {
              b.style.background = "#22c55e";
            }
          });
        }

        document.querySelectorAll("#answers button")
          .forEach(b => b.disabled = true);
      };

      answersEl.appendChild(btn);
    });

    backBtn.style.display = current === 0 ? "none" : "inline-block";
  }

  nextBtn.onclick = () => {
    current++;

    if (current < questions.length) {
      loadQuestion();
    } else {
      questionEl.innerText = "Kuis Selesai!";
      answersEl.innerHTML = "";
      scoreEl.innerText = "Skor kamu: " + score;

      nextBtn.style.display = "none";
      restartBtn.style.display = "block";
      backBtn.style.display = "none";
    }
  };

  backBtn.onclick = () => {
    if (current > 0) {
      current--;
      loadQuestion();
    }
  };

  restartBtn.onclick = () => {
    current = 0;
    score = 0;
  
    scoreEl.innerText = "";
  
    // tampilkan start screen lagi
    document.getElementById("startScreen").style.display = "block";
    document.getElementById("quizBox").style.display = "none";
  
    // reset tombol
    nextBtn.style.display = "block";
    restartBtn.style.display = "none";
    backBtn.style.display = "none";
  };

  // 🔥 BIAR HTML BISA AKSES
  window.startQuiz = function () {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizBox").style.display = "block";

    current = 0;
    score = 0;

    shuffle(questions);
    loadQuestion();
  };

});