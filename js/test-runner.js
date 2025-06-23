// test-runner.js

document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll-title');
    const pollQuestions = document.getElementById('poll-questions');
    const submitButton = document.getElementById('submit-button');
    const pollResult = document.getElementById('poll-result');

    let currentQuestionIndex = 0;
    let score = 0;
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
                submitButton.style.display = 'none';
                return;
            }

            pollTitle.textContent = pollData.title;
            displayQuestion();
        } catch (error) {
            console.error('Errore durante il caricamento del test:', error);
            pollQuestions.innerHTML = '<p class="text-danger">Impossibile caricare il test.</p>';
            submitButton.style.display = 'none';
        }
    };

    const displayQuestion = () => {
        if (currentQuestionIndex < pollData.questions.length) {
            const question = pollData.questions[currentQuestionIndex];
            let optionsHtml = '';
            question.options.forEach((option, index) => {
                optionsHtml += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="option" id="option${index}" value="${option.points}">
                        <label class="form-check-label" for="option${index}">
                            ${option.text}
                        </label>
                    </div>
                `;
            });

            pollQuestions.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${question.question}</h5>
                        ${optionsHtml}
                    </div>
                </div>
            `;
            submitButton.textContent = 'Prossima Domanda';
        } else {
            calculateResult();
        }
    };

    const calculateResult = () => {
        const result = pollData.results.find(r => score >= r.minScore && score <= r.maxScore);
        pollTitle.textContent = 'Risultato del Test';
        if (result) {
            pollQuestions.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${result.title}</h5>
                        <p class="card-text">${result.text}</p>
                    </div>
                </div>
            `;
        } else {
            pollQuestions.innerHTML = `<p>Non è stato possibile calcolare il risultato per il punteggio: ${score}.</p>`;
        }
        submitButton.style.display = 'none';
    };

    const handleSubmit = () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (!selectedOption) {
            if (!document.getElementById('no-answer-alert')) {
                const alertDiv = document.createElement('div');
                alertDiv.id = 'no-answer-alert';
                alertDiv.className = 'alert alert-warning mt-2';
                alertDiv.textContent = 'Per favore, seleziona una risposta.';
                pollQuestions.querySelector('.card-body').appendChild(alertDiv);
            }
            return;
        }

        score += parseInt(selectedOption.value, 10);
        currentQuestionIndex++;
        displayQuestion();
    };

    submitButton.addEventListener('click', handleSubmit);

    loadTestData();
});