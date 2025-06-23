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
                const card = document.createElement('a');
                card.href = poll.url;
                card.className = 'test-card';
                card.textContent = poll.title;
                testListContainer.appendChild(card);
            });
        } else {
            testListContainer.innerHTML = '<p>Nessun test disponibile.</p>';
        }
    };

    const filterTests = () => {
        const filter = searchInput.value.toLowerCase();
        const cards = testListContainer.getElementsByClassName('test-card');
        Array.from(cards).forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    if (searchInput) {
        searchInput.addEventListener('keyup', filterTests);
    }

    loadTests();
});