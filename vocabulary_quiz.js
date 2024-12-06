document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentTheme = urlParams.get('theme') || 'greetings';
    
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let incorrectAnswers = [];
    let isRetrying = false;

    const themeTitle = document.getElementById('theme-title');
    const questionContainer = document.querySelector('.question-container');
    const mongolianWord = document.querySelector('.mongolian-word');
    const pronunciation = document.querySelector('.pronunciation');
    const answerInput = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-answer');
    const feedback = document.getElementById('feedback');
    const feedbackText = document.querySelector('.feedback-text');
    const nextButton = document.getElementById('next-question');
    const quizResults = document.getElementById('quiz-results');
    const retryButton = document.getElementById('retry-incorrect');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');

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

    // Initialize quiz
    function initializeQuiz() {
        // Get theme data and shuffle it
        currentQuestions = [...vocabularyData[currentTheme]].sort(() => Math.random() - 0.5);
        themeTitle.textContent = themeTitles[currentTheme];
        totalQuestionsSpan.textContent = currentQuestions.length;
        showQuestion();
    }

    function showQuestion() {
        const currentWord = currentQuestions[currentQuestionIndex];
        mongolianWord.textContent = currentWord.mongolian;
        pronunciation.textContent = currentWord.pronunciation;
        answerInput.value = '';
        feedback.classList.add('hidden');
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        answerInput.focus();
    }

    function checkAnswer() {
        const currentWord = currentQuestions[currentQuestionIndex];
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = currentWord.english.toLowerCase();

        feedback.classList.remove('hidden');
        
        if (userAnswer === correctAnswer) {
            feedback.className = 'feedback correct';
            feedbackText.textContent = 'Correct! 🎉';
        } else {
            feedback.className = 'feedback incorrect';
            feedbackText.textContent = `Incorrect. The correct answer is "${currentWord.english}"`;
            incorrectAnswers.push(currentWord);
        }

        submitButton.disabled = true;
        answerInput.disabled = true;
        nextButton.focus();
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        submitButton.disabled = false;
        answerInput.disabled = false;

        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        questionContainer.classList.add('hidden');
        feedback.classList.add('hidden');
        quizResults.classList.remove('hidden');

        const score = currentQuestions.length - incorrectAnswers.length;
        document.getElementById('score').textContent = score;
        document.getElementById('total-score').textContent = currentQuestions.length;

        if (incorrectAnswers.length > 0) {
            const incorrectList = document.getElementById('incorrect-answers');
            incorrectList.innerHTML = incorrectAnswers.map(word => `
                <div class="incorrect-item">
                    <strong>${word.mongolian}</strong> (${word.pronunciation}) = ${word.english}
                </div>
            `).join('');
            retryButton.style.display = 'block';
        } else {
            retryButton.style.display = 'none';
        }
    }

    function retryIncorrect() {
        isRetrying = true;
        currentQuestions = [...incorrectAnswers].sort(() => Math.random() - 0.5);
        incorrectAnswers = [];
        currentQuestionIndex = 0;
        totalQuestionsSpan.textContent = currentQuestions.length;
        
        questionContainer.classList.remove('hidden');
        quizResults.classList.add('hidden');
        showQuestion();
    }

    // Event Listeners
    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', showNextQuestion);
    retryButton.addEventListener('click', retryIncorrect);
    
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitButton.disabled) {
            checkAnswer();
        }
    });

    // Initialize the quiz
    initializeQuiz();
}); 