const questions = [
    {
        question: "Which of the following is used in React.js to increase performance?",
        answers: [
            { text: "Original DOM", correct: false },
            { text: "Virtual DOM", correct: true },
            { text: "Both A and B", correct: false },
            { text: "None of the above", correct: false },
        ],
    },
    {
        question: "Which type of JavaScript language is ___?",
        answers: [
            { text: "Object-Oriented", correct: false },
            { text: "Assembly-language", correct: false },
            { text: "High-level", correct: false },
            { text: "Object-Based", correct: true },
        ],
    },
    {
        question: "A class is a type of function, but instead of using the keyword function to initiate it, which keyword do we use?",
        answers: [
            { text: "Constructor", correct: false },
            { text: "Object", correct: false },
            { text: "Class", correct: true },
            { text: "DataObject", correct: false },
        ],
    },
    {
        question: "What is the full form of SQL?",
        answers: [
            { text: "Structure Query Language", correct: true },
            { text: "Structured Query List", correct: false },
            { text: "Sample Query Language", correct: false },
            { text: "None of these", correct: false },
        ],
    },
    {
        question: "Which of the following options leads to the portability and security of Java?",
        answers: [
            { text: "The applet makes the Java code secure and portable", correct: false },
            { text: "Use of exception handling", correct: false },
            { text: "Bytecode is executed by JVM", correct: true },
            { text: "Dynamic binding between objects", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
