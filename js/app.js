document.addEventListener('DOMContentLoaded', () => {
    const testList = document.getElementById('test-list');
    const searchInput = document.getElementById('search-input');

    const loadTests = async () => {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            displayTests(config.polls);
        } catch (error) {
            console.error('Error loading tests:', error);
            testList.innerHTML = '<li class="list-group-item text-danger">Errore nel caricamento dei test.</li>';
        }
    };

    const displayTests = (polls) => {
        testList.innerHTML = '';
        if (polls && polls.length > 0) {
            polls.forEach(poll => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `<a href="${poll.url}">${poll.title}</a>`;
                testList.appendChild(listItem);
            });
        } else {
            testList.innerHTML = '<li class="list-group-item">Nessun test disponibile.</li>';
        }
    };

    const filterTests = () => {
        const filter = searchInput.value.toLowerCase();
        const items = testList.getElementsByTagName('li');
        Array.from(items).forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('keyup', filterTests);

    loadTests();
});