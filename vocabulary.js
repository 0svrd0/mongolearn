document.addEventListener('DOMContentLoaded', () => {
    const vocabularyData = [
        { mongolian: 'Сайн байна уу', english: 'Hello', pronunciation: 'Sain baina uu' },
        { mongolian: 'Баяртай', english: 'Goodbye', pronunciation: 'Bayartai' },
        { mongolian: 'Баярлалаа', english: 'Thank you', pronunciation: 'Bayarlalaa' },
        { mongolian: 'Тийм', english: 'Yes', pronunciation: 'Tiim' },
        { mongolian: 'Үгүй', english: 'No', pronunciation: 'Ugui' },
        // Add more vocabulary as needed
    ];

    let currentCardIndex = 0;
    const flashcard = document.querySelector('.flashcard');
    const prevButton = document.getElementById('prevCard');
    const nextButton = document.getElementById('nextCard');
    const flipButton = document.getElementById('flipCard');

    function updateCard() {
        const currentWord = vocabularyData[currentCardIndex];
        const mongolianText = document.querySelector('.mongolian');
        const englishText = document.querySelector('.english');
        const pronunciationText = document.querySelector('.pronunciation');

        mongolianText.textContent = currentWord.mongolian;
        englishText.textContent = currentWord.english;
        pronunciationText.textContent = currentWord.pronunciation;
        
        flashcard.classList.remove('flipped');
    }

    function populateWordGrid() {
        const wordGrid = document.querySelector('.word-grid');
        vocabularyData.forEach(word => {
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';
            wordCard.innerHTML = `
                <p class="mongolian">${word.mongolian}</p>
                <p class="english">${word.english}</p>
                <p class="pronunciation">${word.pronunciation}</p>
            `;
            wordGrid.appendChild(wordCard);
        });
    }

    // Event Listeners
    flipButton.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    prevButton.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + vocabularyData.length) % vocabularyData.length;
        updateCard();
    });

    nextButton.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % vocabularyData.length;
        updateCard();
    });

    // Initialize
    updateCard();
    populateWordGrid();
}); 