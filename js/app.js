document.addEventListener('DOMContentLoaded', () => {
    const testListContainer = document.getElementById('test-list-container');
    const searchInput = document.getElementById('search-input');

    const loadTests = async () => {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            displayTests(config.polls);
        } catch (error) {
            console.error('Error loading tests:', error);
            if (testListContainer) {
                testListContainer.innerHTML = '<p class="text-danger">Errore nel caricamento dei test.</p>';
            }
        }
    };

    const displayTests = (polls) => {
        if (!testListContainer) return;
        testListContainer.innerHTML = '';
        if (polls && polls.length > 0) {
            polls.forEach(poll => {
                const cardCol = document.createElement('div');
                cardCol.className = 'col-lg-4 col-md-6 mb-4';

                const versionBadge = poll.version === 2 ?
                    '<span class="badge bg-success">v2</span>' :
                    '<span class="badge bg-primary">v1</span>';

                const description = poll.description ?
                    `<p class="card-text text-muted">${poll.description}</p>` : '';

                cardCol.innerHTML = `
                    <div class="card h-100 test-card-container" style="transition: transform 0.2s;">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title mb-0 flex-grow-1">${poll.title}</h5>
                                ${versionBadge}
                            </div>
                            ${description}
                            <div class="mt-auto">
                                <a href="${poll.url}" class="btn btn-outline-primary w-100">
                                    Inizia Test
                                </a>
                            </div>
                        </div>
                    </div>
                `;

                // Aggiungi effetto hover
                const card = cardCol.querySelector('.test-card-container');
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-5px)';
                    card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = '';
                });

                testListContainer.appendChild(cardCol);
            });
        } else {
            testListContainer.innerHTML = '<p>Nessun test disponibile.</p>';
        }
    };

    const filterTests = () => {
        const filter = searchInput.value.toLowerCase();
        const cardCols = testListContainer.getElementsByClassName('col-lg-4');
        Array.from(cardCols).forEach(cardCol => {
            const cardTitle = cardCol.querySelector('.card-title');
            const cardText = cardCol.querySelector('.card-text');
            const titleText = cardTitle ? cardTitle.textContent.toLowerCase() : '';
            const descText = cardText ? cardText.textContent.toLowerCase() : '';

            if (titleText.includes(filter) || descText.includes(filter)) {
                cardCol.style.display = 'block';
            } else {
                cardCol.style.display = 'none';
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('keyup', filterTests);
    }

    loadTests();
});