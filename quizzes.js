document.addEventListener('DOMContentLoaded', () => {
    const quizData = {
        basic: [
            {
                question: 'What does "Сайн байна уу" mean?',
                options: ['Hello', 'Goodbye', 'Thank you', 'Yes'],
                correct: 'Hello',
                explanation: '"Сайн байна уу" is the standard Mongolian greeting'
            },
            {
                question: 'What does "Баяртай" mean?',
                options: ['Hello', 'Goodbye', 'Thank you', 'Yes'],
                correct: 'Goodbye',
                explanation: '"Баяртай" is used when saying goodbye'
            },
            {
                question: 'What does "Баярлалаа" mean?',
                options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
                correct: 'Thank you',
                explanation: '"Баярлалаа" is used to say thank you'
            },
            {
                question: 'What does "Тийм" mean?',
                options: ['Yes', 'No', 'Maybe', 'Please'],
                correct: 'Yes',
                explanation: '"Тийм" means yes in Mongolian'
            },
            {
                question: 'What does "Үгүй" mean?',
                options: ['Yes', 'No', 'Maybe', 'Please'],
                correct: 'No',
                explanation: '"Үгүй" means no in Mongolian'
            }
        ],
        numbers: [
            {
                question: 'What is "нэг" in English?',
                options: ['One', 'Two', 'Three', 'Four'],
                correct: 'One',
                explanation: '"нэг" is the number one in Mongolian'
            },
            {
                question: 'What is "хоёр" in English?',
                options: ['One', 'Two', 'Three', 'Four'],
                correct: 'Two',
                explanation: '"хоёр" is the number two in Mongolian'
            },
            {
                question: 'What is "гурав" in English?',
                options: ['One', 'Two', 'Three', 'Four'],
                correct: 'Three',
                explanation: '"гурав" is the number three in Mongolian'
            },
            {
                question: 'What is "дөрөв" in English?',
                options: ['One', 'Two', 'Three', 'Four'],
                correct: 'Four',
                explanation: '"дөрөв" is the number four in Mongolian'
            },
            {
                question: 'What is "тав" in English?',
                options: ['Three', 'Four', 'Five', 'Six'],
                correct: 'Five',
                explanation: '"тав" is the number five in Mongolian'
            }
        ],
        family: [
            {
                question: 'What does "ээж" mean?',
                options: ['Mother', 'Father', 'Sister', 'Brother'],
                correct: 'Mother',
                explanation: '"ээж" means mother in Mongolian'
            },
            {
                question: 'What does "аав" mean?',
                options: ['Mother', 'Father', 'Sister', 'Brother'],
                correct: 'Father',
                explanation: '"аав" means father in Mongolian'
            },
            {
                question: 'What does "ах" mean?',
                options: ['Mother', 'Father', 'Sister', 'Elder brother'],
                correct: 'Elder brother',
                explanation: '"ах" means elder brother in Mongolian'
            },
            {
                question: 'What does "эгч" mean?',
                options: ['Mother', 'Elder sister', 'Younger sister', 'Brother'],
                correct: 'Elder sister',
                explanation: '"эгч" means elder sister in Mongolian'
            },
            {
                question: 'What does "дүү" mean?',
                options: ['Elder sibling', 'Younger sibling', 'Parent', 'Child'],
                correct: 'Younger sibling',
                explanation: '"дүү" means younger sibling in Mongolian'
            }
        ]
    };

    let currentQuiz = null;
    let currentQuestion = 0;
    let score = 0;
    let isAnswered = false;

    const questionCard = document.querySelector('.question-card');
    const feedback = document.querySelector('.feedback');
    const feedbackText = document.querySelector('.feedback-text');
    const nextButton = document.querySelector('.next-question');
    const scoreDisplay = document.getElementById('score');
    const currentNumberDisplay = document.getElementById('current-number');
    const totalQuestionsDisplay = document.getElementById('total-questions');

    // Initialize category buttons
    document.querySelectorAll('.start-quiz').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            if (quizData[category]) {
                startQuiz(category);
                // Hide categories and show quiz
                document.querySelector('.quiz-categories').style.display = 'none';
                document.querySelector('.quiz-container').style.display = 'block';
            }
        });
    });

    function startQuiz(category) {
        currentQuiz = quizData[category];
        currentQuestion = 0;
        score = 0;
        isAnswered = false;
        updateQuestion();
        updateScore();
    }

    function updateQuestion() {
        if (!currentQuiz || currentQuestion >= currentQuiz.length) {
            showFinalScore();
            return;
        }

        isAnswered = false;
        const question = currentQuiz[currentQuestion];
        
        questionCard.querySelector('h2').textContent = question.question;
        
        const optionsContainer = questionCard.querySelector('.options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        feedback.classList.add('hidden');
        currentNumberDisplay.textContent = currentQuestion + 1;
        totalQuestionsDisplay.textContent = currentQuiz.length;
    }

    function checkAnswer(selected) {
        if (isAnswered) return;
        isAnswered = true;

        const question = currentQuiz[currentQuestion];
        const options = document.querySelectorAll('.option');
        
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === question.correct) {
                option.classList.add('correct');
            } else if (option.textContent === selected) {
                option.classList.add('incorrect');
            }
        });

        if (selected === question.correct) {
            score++;
            feedbackText.textContent = `Correct! ${question.explanation}`;
        } else {
            feedbackText.textContent = `Incorrect. ${question.explanation}`;
        }

        feedback.classList.remove('hidden');
        updateScore();
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function showFinalScore() {
        const percentage = (score / currentQuiz.length) * 100;
        let message = '';

        if (percentage === 100) {
            message = 'Perfect! You\'re a master!';
        } else if (percentage >= 80) {
            message = 'Great job! Keep it up!';
        } else if (percentage >= 60) {
            message = 'Good work! Practice more to improve!';
        } else {
            message = 'Keep practicing! You\'ll get better!';
        }

        questionCard.innerHTML = `
            <h2>Quiz Complete!</h2>
            <p class="final-score">Your final score: ${score} out of ${currentQuiz.length}</p>
            <p class="score-message">${message}</p>
            <div class="quiz-buttons">
                <button class="retry-quiz">Try Again</button>
                <button class="new-category">Choose New Category</button>
            </div>
        `;

        // Add event listeners to the new buttons
        questionCard.querySelector('.retry-quiz').addEventListener('click', () => {
            startQuiz(currentQuiz);
        });

        questionCard.querySelector('.new-category').addEventListener('click', () => {
            document.querySelector('.quiz-categories').style.display = 'block';
            document.querySelector('.quiz-container').style.display = 'none';
        });
    }

    nextButton.addEventListener('click', () => {
        if (!isAnswered) return;
        currentQuestion++;
        updateQuestion();
    });

    // Hide quiz container initially
    document.querySelector('.quiz-container').style.display = 'none';
}); 