document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search themes...';
    searchInput.className = 'theme-search';
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-difficulty="all">All Levels</button>
            <button class="filter-btn" data-difficulty="beginner">Beginner</button>
            <button class="filter-btn" data-difficulty="intermediate">Intermediate</button>
            <button class="filter-btn" data-difficulty="advanced">Advanced</button>
        </div>
        <div class="sort-options">
            <select id="sort-select">
                <option value="alphabetical">A-Z</option>
                <option value="wordCount">Word Count</option>
                <option value="difficulty">Difficulty</option>
            </select>
        </div>
    `;

    const heroSection = document.querySelector('.hero');
    heroSection.appendChild(searchInput);
    heroSection.appendChild(filterContainer);

    // Add search and filter functionality
    const themeCards = document.querySelectorAll('.theme-card');
    
    searchInput.addEventListener('input', filterThemes);
    document.querySelectorAll('.filter-btn').forEach(btn => 
        btn.addEventListener('click', filterThemes));
    document.getElementById('sort-select').addEventListener('change', sortThemes);

    function filterThemes() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDifficulty = document.querySelector('.filter-btn.active').dataset.difficulty;

        themeCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const difficulty = card.dataset.difficulty;
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesDifficulty = selectedDifficulty === 'all' || difficulty === selectedDifficulty;
            
            card.style.display = matchesSearch && matchesDifficulty ? 'block' : 'none';
        });
    }

    function sortThemes() {
        const sortBy = document.getElementById('sort-select').value;
        const cardsArray = Array.from(themeCards);
        const container = document.querySelector('.themes-grid');

        cardsArray.sort((a, b) => {
            switch(sortBy) {
                case 'alphabetical':
                    return a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent);
                case 'wordCount':
                    return parseInt(b.querySelector('.word-count').textContent) - 
                           parseInt(a.querySelector('.word-count').textContent);
                case 'difficulty':
                    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
                    return difficultyOrder[a.dataset.difficulty] - difficultyOrder[b.dataset.difficulty];
            }
        });

        cardsArray.forEach(card => container.appendChild(card));
    }
}); 