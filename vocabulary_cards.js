// Make playAudio function global
function playAudio(audioSrc) {
    if (!audioSrc) return;
    
    // Create new audio instance
    const audio = new Audio(audioSrc);
    
    // Play audio with error handling
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        // Optionally show a user-friendly error message
        alert('Audio file not available');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Change the back button implementation
    const backButton = document.createElement('button');
    backButton.className = 'back-to-themes';
    backButton.innerHTML = '← Back to Themes';
    backButton.onclick = () => window.location.href = 'vocabulary_themes.html';
    
    // Insert the button after the header
    const header = document.querySelector('header');
    header.after(backButton);

    const urlParams = new URLSearchParams(window.location.search);
    const currentTheme = urlParams.get('theme') || 'greetings';
    
    // Add this line to make the quiz button work
    const quizButton = document.querySelector('.quiz-btn');
    quizButton.onclick = () => window.location.href = `vocabulary_quiz.html?theme=${currentTheme}`;

    let currentCardIndex = 0;
    let isFlipped = false;

    const cardsContainer = document.querySelector('.cards-container');
    const progressBar = document.querySelector('.progress-bar .progress');
    const progressText = document.querySelector('.progress-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const flipBtn = document.getElementById('flip-btn');

    // Update page title and heading based on theme
    const themeTitle = document.querySelector('#vocab-heading');
    const themeTitles = {
        greetings: "Greetings and Basics",
        numbers: "Numbers and Time",
        family: "Family",
        food: "Food and Drink",
        colors: "Colors",
        nature: "Nature",
        transport: "Transportation",
        shopping: "Shopping",
        weather: "Weather",
        activities: "Daily Activities",
        body: "Body Parts",
        emotions: "Emotions",
        occupations: "Occupations",
        clothing: "Clothing",
        animals: "Animals",
        technology: "Technology",
        hobbies: "Hobbies",
        travel: "Travel",
        shapes: "Shapes and Sizes",
        verbs: "Verbs"
    };
    themeTitle.textContent = themeTitles[currentTheme] || "Vocabulary Cards";

    const currentThemeData = vocabularyData[currentTheme] || [];

    function createCard(word) {
        return `
            <div class="vocab-card ${isFlipped ? 'flipped' : ''}">
                <div class="card-front">
                    <h2 class="mongolian-word">${word.mongolian}</h2>
                    <p class="pronunciation">${word.pronunciation}</p>
                    <button class="audio-btn" onclick="playAudio('${word.audio}')" style="background: none; border: none; cursor: pointer; font-size: 1.5rem;">
                        🔊
                    </button>
                </div>
                <div class="card-back">
                    <h2 class="english-word">${word.english}</h2>
                </div>
            </div>
        `;
    }

    function updateCard() {
        const word = currentThemeData[currentCardIndex];
        cardsContainer.innerHTML = createCard(word);
        updateProgress();
        updateNavigationButtons();
    }

    function updateProgress() {
        const progress = ((currentCardIndex + 1) / currentThemeData.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentCardIndex + 1} / ${currentThemeData.length}`;
    }

    function updateNavigationButtons() {
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === currentThemeData.length - 1;
    }

    function nextCard() {
        if (currentCardIndex < currentThemeData.length - 1) {
            currentCardIndex++;
            isFlipped = false;
            updateCard();
        }
    }

    function previousCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            isFlipped = false;
            updateCard();
        }
    }

    function flipCard() {
        isFlipped = !isFlipped;
        document.querySelector('.vocab-card').classList.toggle('flipped');
    }

    // Event Listeners
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') previousCard();
        if (e.key === ' ') {
            e.preventDefault(); // Prevent page scroll
            flipCard();
        }
    });

    prevBtn.addEventListener('click', previousCard);
    nextBtn.addEventListener('click', nextCard);
    flipBtn.addEventListener('click', flipCard);

    // Initialize
    updateCard();

    // Add click handler for quiz button
    document.getElementById('quiz-btn').addEventListener('click', function() {
        // Extract the current lesson number from the heading
        const heading = document.getElementById('vocab-heading').textContent;
        const lessonNumber = heading.match(/Lesson (\d+)/)[1];
        
        // Redirect to the quiz page with the lesson number as a parameter
        window.location.href = `quizzes.html?lesson=${lessonNumber}`;
    });
}); 