import questions from "./questions.js";

// Other global variables
let currentQuestionIndex = 0;
let timeLeft = 60; // time limit

// Function to start the quiz
function startQuiz() {
  // Display the questions section
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  // Display the first question
  displayQuestion();
  
  // Start the timer
  startTimer();
}

// Function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = currentQuestion.question;
  
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  // Create and display answer choices
  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => handleAnswer(choice));
    choicesContainer.appendChild(button);
  });
}

// Function to handle user's answer
function handleAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    // Provide feedback (you can customize this part)
    document.getElementById("feedback").textContent = "Correct!";
  } else {
    // Penalize time for incorrect answer
    timeLeft -= 10;
    // Provide feedback (you can customize this part)
    document.getElementById("feedback").textContent = "Incorrect!";
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    // Display the next question
    displayQuestion();
  } else {
    // End the quiz if there are no more questions
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  const timerInterval = setInterval(() => {
    document.getElementById("time").textContent = timeLeft;
    timeLeft--;

    // Check if time has run out
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Display the end screen
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");

  // Display the final score
  document.getElementById("final-score").textContent = timeLeft;

  // You can add additional logic for submitting scores, etc.
}

// Export the startQuiz function for use in HTML
export { startQuiz };
