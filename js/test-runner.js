// test-runner.js

document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll-title');
    const pollQuestions = document.getElementById('poll-questions');

    let currentQuestionIndex = 0;
    let userAnswers = [];
    let pollData;

    const loadTestData = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const pollId = urlParams.get('poll');
            if (!pollId) {
                pollQuestions.innerHTML = '<p class="text-danger">Sondaggio non specificato.</p>';
                return;
            }

            const response = await fetch(`polls/${pollId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            pollData = await response.json();

            const pageVersionMatch = window.location.pathname.match(/poll-(v\d+)\.html/);
            const pageVersion = pageVersionMatch ? pageVersionMatch[1] : null;

            if (pageVersion !== pollData.version) {
                pollQuestions.innerHTML = `<p class="text-danger">Versione del sondaggio non corrispondente. Pagina richiesta: ${pageVersion}, versione sondaggio: ${pollData.version}.</p>`;
                return;
            }

            pollTitle.textContent = pollData.title;
            displayQuestion();
        } catch (error) {
            console.error('Errore durante il caricamento del test:', error);
            pollQuestions.innerHTML = '<p class="text-danger">Impossibile caricare il test.</p>';
        }
    };

    const displayQuestion = () => {
        if (pollData && currentQuestionIndex < pollData.questions.length) {
            const question = pollData.questions[currentQuestionIndex];

            const questionHtml = `
                <div class="question-card">
                    <h5 class="card-title">${question.question}</h5>
                    <div class="options-container">
                        ${question.options.map(option => `
                            <div class="option-card" data-points="${option.points}">
                                ${option.text}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            pollQuestions.innerHTML = questionHtml;

            document.querySelectorAll('.option-card').forEach(card => {
                card.addEventListener('click', () => {
                    const points = parseInt(card.dataset.points, 10);
                    userAnswers.push(points);
                    currentQuestionIndex++;
                    displayQuestion();
                });
            });
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        const totalScore = userAnswers.reduce((sum, points) => sum + points, 0);
        const result = pollData.results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore);

        pollTitle.textContent = 'Risultato del Test';
        if (result) {
            pollQuestions.innerHTML = `
                <div class="result-card">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text">${result.text}</p>
                    <a href="index.html" class="btn btn-primary mt-3">Torna alla Home</a>
                </div>
            `;
        } else {
            pollQuestions.innerHTML = `<div class="result-card"><p>Non è stato possibile calcolare il risultato.</p></div>`;
        }
    };

    loadTestData();
});