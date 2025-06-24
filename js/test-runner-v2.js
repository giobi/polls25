// test-runner-v2.js

document.addEventListener('DOMContentLoaded', () => {
    const pollTitle = document.getElementById('poll-title');
    const pollDescription = document.getElementById('poll-description');
    const pollQuestions = document.getElementById('poll-questions');
    const pollResult = document.getElementById('poll-result');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const skillsDisplay = document.getElementById('skills-display');
    const skillsBars = document.getElementById('skills-bars');

    let currentQuestionIndex = 0;
    let userSkills = {};
    let pollData;

    const loadTestData = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const pollId = urlParams.get('poll');
            if (!pollId) {
                pollQuestions.innerHTML = '<div class="alert alert-danger">Sondaggio non specificato.</div>';
                return;
            }

            const response = await fetch(`polls/${pollId}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            pollData = await response.json();

            // Verifica versione
            if (pollData.version !== 2) {
                pollQuestions.innerHTML = `<div class="alert alert-danger">Questo test richiede la versione 2. Versione trovata: ${pollData.version}</div>`;
                return;
            }

            // Inizializza skills dell'utente
            Object.keys(pollData.skills).forEach(skill => {
                userSkills[skill] = 0;
            });

            pollTitle.textContent = pollData.title;
            pollDescription.textContent = pollData.description;
            updateProgress();
            displayQuestion();
        } catch (error) {
            console.error('Errore durante il caricamento del test:', error);
            pollQuestions.innerHTML = '<div class="alert alert-danger">Impossibile caricare il test.</div>';
        }
    };

    const updateProgress = () => {
        const progress = (currentQuestionIndex / pollData.questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Domanda ${currentQuestionIndex + 1} di ${pollData.questions.length}`;
    };

    const displayQuestion = () => {
        if (pollData && currentQuestionIndex < pollData.questions.length) {
            const question = pollData.questions[currentQuestionIndex];

            const questionHtml = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title mb-4">${question.text}</h5>
                        <div class="row">
                            ${question.answers.map((answer, index) => `
                                <div class="col-md-6 mb-3">
                                    <div class="card answer-card h-100" data-answer-index="${index}" style="cursor: pointer; transition: all 0.2s;">
                                        <div class="card-body text-center">
                                            <h6 class="card-title">${answer.text}</h6>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            pollQuestions.innerHTML = questionHtml;

            // Aggiungi event listeners alle risposte
            document.querySelectorAll('.answer-card').forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-2px)';
                    card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '';
                });

                card.addEventListener('click', () => {
                    const answerIndex = parseInt(card.dataset.answerIndex);
                    selectAnswer(answerIndex);
                });
            });

            updateProgress();
        } else {
            calculateResult();
        }
    };

    const selectAnswer = (answerIndex) => {
        const question = pollData.questions[currentQuestionIndex];
        const selectedAnswer = question.answers[answerIndex];

        // Aggiungi i valori alle skills dell'utente
        Object.entries(selectedAnswer.values).forEach(([skill, value]) => {
            userSkills[skill] += value;
        });

        // Mostra feedback visivo
        const selectedCard = document.querySelector(`[data-answer-index="${answerIndex}"]`);
        selectedCard.style.backgroundColor = '#d4edda';
        selectedCard.style.borderColor = '#c3e6cb';

        // Aspetta un momento per il feedback visivo, poi passa alla prossima domanda
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 600);

        // Mostra skills durante il test (opzionale)
        updateSkillsDisplay();
    };

    const updateSkillsDisplay = () => {
        if (currentQuestionIndex > 0) {
            skillsDisplay.style.display = 'block';

            const maxValue = Math.max(...Object.values(userSkills));

            skillsBars.innerHTML = Object.entries(userSkills).map(([skill, value]) => `
                <div class="col-md-2 mb-2">
                    <div class="text-center">
                        <small class="text-muted">${pollData.skills[skill]}</small>
                        <div class="progress mt-1" style="height: 20px;">
                            <div class="progress-bar bg-info" style="width: ${maxValue > 0 ? (value / maxValue) * 100 : 0}%">
                                ${value}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };

    const calculateResult = () => {
        // Nascondi la barra di progresso
        document.getElementById('progress-container').style.display = 'none';
        skillsDisplay.style.display = 'none';

        pollTitle.textContent = 'Il tuo risultato';

        // Trova il profilo corrispondente
        let matchedProfile = null;

        for (const profile of pollData.profiles) {
            let matches = true;

            for (const [skill, requirements] of Object.entries(profile.requirements)) {
                const userValue = userSkills[skill] || 0;

                if (requirements.min !== undefined && userValue < requirements.min) {
                    matches = false;
                    break;
                }

                if (requirements.max !== undefined && userValue > requirements.max) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                matchedProfile = profile;
                break;
            }
        }

        if (matchedProfile) {
            displayResult(matchedProfile);
        } else {
            pollQuestions.innerHTML = `
                <div class="alert alert-warning">
                    <h5>Risultato non determinato</h5>
                    <p>Non è stato possibile determinare un profilo specifico per i tuoi risultati.</p>
                </div>
            `;
        }
    };

    const displayResult = (profile) => {
        const resultHtml = `
            <div class="card shadow-lg">
                <div class="card-body text-center">
                    <h2 class="card-title text-primary mb-4">${profile.name}</h2>
                    <p class="card-text lead mb-4">${profile.description}</p>
                    
                    <div class="row mb-4">
                        <div class="col-12">
                            <h5>I tuoi valori finali:</h5>
                            <div class="row">
                                ${Object.entries(userSkills).map(([skill, value]) => `
                                    <div class="col-md-2 mb-3">
                                        <div class="card bg-light">
                                            <div class="card-body text-center py-2">
                                                <h6 class="card-title mb-1">${pollData.skills[skill]}</h6>
                                                <span class="badge bg-primary">${value}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <a href="index.html" class="btn btn-primary btn-lg">Torna alla Home</a>
                        <button class="btn btn-outline-secondary btn-lg" onclick="location.reload()">Rifai il Test</button>
                    </div>
                </div>
            </div>
        `;

        pollQuestions.innerHTML = resultHtml;
    };

    // Avvia il caricamento del test
    loadTestData();
});
