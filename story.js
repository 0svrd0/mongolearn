document.addEventListener('DOMContentLoaded', () => {
    const stories = {
        story1: {
            title: 'Хөх тэнгэр (The Blue Sky)',
            paragraphs: [
                {
                    mongolian: 'Монгол орны хөх тэнгэр маш үзэсгэлэнтэй.',
                    pronunciation: 'Mongol orny höh tenger mash üzesgelentei.',
                    english: 'The blue sky of Mongolia is very beautiful.'
                },
                {
                    mongolian: 'Өглөө бүр наран мандах үед би гадаа гарч явдаг.',
                    pronunciation: 'Öglöö bür naran mandah üed bi gadaa garch yavdag.',
                    english: 'Every morning when the sun rises, I go outside.'
                }
            ],
            vocabulary: [
                { mongolian: 'тэнгэр', pronunciation: 'tenger', english: 'sky' },
                { mongolian: 'хөх', pronunciation: 'höh', english: 'blue' },
                { mongolian: 'үзэсгэлэнтэй', pronunciation: 'üzesgelentei', english: 'beautiful' }
            ]
        },
        // Add more stories here
    };

    const storySelector = document.getElementById('story-selector');
    const toggleTranslation = document.getElementById('toggle-translation');
    const togglePronunciation = document.getElementById('toggle-pronunciation');
    const storyContent = document.querySelector('.story-content');
    const vocabularyGrid = document.querySelector('.vocabulary-grid');

    function loadStory(storyId) {
        const story = stories[storyId];
        if (!story) return;

        // Update story title
        document.querySelector('.story-title').textContent = story.title;

        // Clear existing content
        storyContent.innerHTML = `<h2 class="story-title">${story.title}</h2>`;

        // Add paragraphs
        story.paragraphs.forEach(paragraph => {
            const div = document.createElement('div');
            div.className = 'paragraph-container';
            div.innerHTML = `
                <p class="mongolian-text">${paragraph.mongolian}</p>
                <p class="pronunciation hidden">${paragraph.pronunciation}</p>
                <p class="english-text hidden">${paragraph.english}</p>
            `;
            storyContent.appendChild(div);
        });

        // Update vocabulary
        vocabularyGrid.innerHTML = '';
        story.vocabulary.forEach(word => {
            const div = document.createElement('div');
            div.className = 'vocabulary-item';
            div.innerHTML = `
                <p class="mongolian">${word.mongolian}</p>
                <p class="pronunciation">${word.pronunciation}</p>
                <p class="english">${word.english}</p>
            `;
            vocabularyGrid.appendChild(div);
        });
    }

    // Event Listeners
    storySelector.addEventListener('change', (e) => {
        loadStory(e.target.value);
    });

    toggleTranslation.addEventListener('click', () => {
        const isShowing = toggleTranslation.getAttribute('aria-pressed') === 'true';
        toggleTranslation.setAttribute('aria-pressed', !isShowing);
        document.querySelectorAll('.english-text').forEach(el => {
            el.classList.toggle('hidden');
        });
    });

    togglePronunciation.addEventListener('click', () => {
        const isShowing = togglePronunciation.getAttribute('aria-pressed') === 'true';
        togglePronunciation.setAttribute('aria-pressed', !isShowing);
        document.querySelectorAll('.pronunciation').forEach(el => {
            el.classList.toggle('hidden');
        });
    });

    // Initialize first story
    loadStory('story1');
}); 