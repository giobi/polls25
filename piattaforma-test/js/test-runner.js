// test-runner.js

document.addEventListener('DOMContentLoaded', function() {
    const testContainer = document.getElementById('test-container');
    const scoreDisplay = document.getElementById('score-display');
    let score = 0;
    let currentQuestionIndex = 0;
    let questions = [];

    function loadTest(testFile) {
        fetch(testFile)
            .then(response => response.json())
            .then(data => {
                questions = data.questions;
                displayQuestion();
            })
            .catch(error => console.error('Error loading test:', error));
    }

    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            testContainer.innerHTML = `
                <h2>${question.question}</h2>
                ${question.answers.map((answer, index) => `
                    <div>
                        <input type="radio" name="answer" id="answer${index}" value="${answer.points}">
                        <label for="answer${index}">${answer.text}</label>
                    </div>
                `).join('')}
                <button id="next-button">Next</button>
            `;
            document.getElementById('next-button').addEventListener('click', handleNext);
        } else {
            displayScore();
        }
    }

    function handleNext() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            score += parseInt(selectedAnswer.value);
            currentQuestionIndex++;
            displayQuestion();
        } else {
            alert('Please select an answer before proceeding.');
        }
    }

    function displayScore() {
        testContainer.innerHTML = `<h2>Your score: ${score}</h2>`;
        scoreDisplay.innerHTML = `Total Score: ${score}`;
    }

    // Load the test file (example: polls/sei-sith-o-jedi.json)
    loadTest('polls/sei-sith-o-jedi.json');
});