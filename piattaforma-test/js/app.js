const app = (() => {
    const testContainer = document.getElementById('test-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const loadTests = async () => {
        try {
            const response = await fetch('polls/sei-sith-o-jedi.json');
            const tests = await response.json();
            displayTests(tests);
        } catch (error) {
            console.error('Error loading tests:', error);
        }
    };

    const displayTests = (tests) => {
        testContainer.innerHTML = '';
        tests.forEach(test => {
            const testElement = document.createElement('div');
            testElement.classList.add('test-item');
            testElement.innerHTML = `
                <h3>${test.title}</h3>
                <button class="btn btn-primary" onclick="startTest('${test.id}')">Inizia Test</button>
            `;
            testContainer.appendChild(testElement);
        });
    };

    const startTest = (testId) => {
        window.location.href = `poll-v1.html?id=${testId}`;
    };

    const searchTests = () => {
        const query = searchInput.value.toLowerCase();
        const testItems = document.querySelectorAll('.test-item');
        testItems.forEach(item => {
            const title = item.querySelector('h3').innerText.toLowerCase();
            item.style.display = title.includes(query) ? 'block' : 'none';
        });
    };

    searchButton.addEventListener('click', searchTests);
    window.onload = loadTests;

    return {
        loadTests,
        startTest,
        searchTests
    };
})();