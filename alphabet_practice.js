const alphabetData = [
    // Vowels
    { letter: 'Аа', pronunciation: "'", example: 'ах (brother)', audio: 'audio/alphabet/0001.mp3' },
    { letter: 'Ээ', pronunciation: "like 'e' in 'bed'", example: 'ээж (mother)', audio: 'audio/alphabet/0002.mp3' },
    { letter: 'Ии', pronunciation: "like 'ee' in 'see'", example: 'ир (come)', audio: 'audio/alphabet/0003.mp3' },
    { letter: 'Оо', pronunciation: "like 'o' in 'more'", example: 'ой (forest)', audio: 'audio/alphabet/0004.mp3' },
    { letter: 'Уу', pronunciation: "like 'oo' in 'moon'", example: 'ус (water)', audio: 'audio/alphabet/0005.mp3' },
    { letter: 'Өө', pronunciation: "like 'u' in 'burn'", example: 'өдөр (day)', audio: 'audio/alphabet/0006.mp3' },
    { letter: 'Үү', pronunciation: "like 'u' in 'tune'", example: 'үг (word)', audio: 'audio/alphabet/0007.mp3' },

    // Common Consonants
    { letter: 'Бб', pronunciation: "like 'b' in 'bed'", example: 'бар (tiger)', audio: 'audio/alphabet/0008.mp3' },
    { letter: 'Вв', pronunciation: "like 'v' in 'very'", example: 'вагон (wagon)', audio: 'audio/alphabet/0009.mp3' },
    { letter: 'Гг', pronunciation: "like 'g' in 'go'", example: 'гар (hand)', audio: 'audio/alphabet/0010.mp3' },
    { letter: 'Дд', pronunciation: "like 'd' in 'dog'", example: 'дэв (pillow)', audio: 'audio/alphabet/0011.mp3' },
    { letter: 'Жж', pronunciation: "like 'j' in 'jam'", example: 'жил (year)', audio: 'audio/alphabet/0012.mp3' },
    { letter: 'Зз', pronunciation: "like 'z' in 'zebra'", example: 'зам (road)', audio: 'audio/alphabet/0013.mp3' },
    { letter: 'Йй', pronunciation: "like 'y' in 'yes'", example: 'йог (yoga)', audio: 'audio/alphabet/0014.mp3' },
    { letter: 'Кк', pronunciation: "like 'k' in 'keep'", example: 'кино (movie)', audio: 'audio/alphabet/0015.mp3' },
    { letter: 'Лл', pronunciation: "like 'l' in 'love'", example: 'лам (lama)', audio: 'audio/alphabet/0016.mp3' },
    { letter: 'Мм', pronunciation: "like 'm' in 'mom'", example: 'мал (livestock)', audio: 'audio/alphabet/0017.mp3' },
    { letter: 'Нн', pronunciation: "like 'n' in 'no'", example: 'нар (sun)', audio: 'audio/alphabet/0018.mp3' },
    { letter: 'Пп', pronunciation: "like 'p' in 'pen'", example: 'пив (beer)', audio: 'audio/alphabet/0019.mp3' },
    { letter: 'Рр', pronunciation: "rolled 'r'", example: 'рад (happy)', audio: 'audio/alphabet/0020.mp3' },
    { letter: 'Сс', pronunciation: "like 's' in 'sun'", example: 'сар (moon)', audio: 'audio/alphabet/0021.mp3' },
    { letter: 'Тт', pronunciation: "like 't' in 'top'", example: 'тал (steppe)', audio: 'audio/alphabet/0022.mp3' },
    { letter: 'Фф', pronunciation: "like 'f' in 'fish'", example: 'фото (photo)', audio: 'audio/alphabet/0023.mp3' },
    { letter: 'Хх', pronunciation: "like 'h' in 'hot'", example: 'хот (city)', audio: 'audio/alphabet/0024.mp3' },
    { letter: 'Щщ', pronunciation: "like 'shch' in 'fresh cheese'", example: 'щётка (brush)', audio: 'audio/alphabet/0025.mp3' },
    { letter: 'Ыы', pronunciation: "like 'i' in 'bit' but deeper", example: 'ын (of)', audio: 'audio/alphabet/0026.mp3' },

    // Special Letters
    { letter: 'Цц', pronunciation: "like 'ts' in 'cats'", example: 'цай (tea)', audio: 'audio/alphabet/0027.mp3' },
    { letter: 'Чч', pronunciation: "like 'ch' in 'chair'", example: 'чоно (wolf)', audio: 'audio/alphabet/0028.mp3' },
    { letter: 'Шш', pronunciation: "like 'sh' in 'ship'", example: 'шар (yellow)', audio: 'audio/alphabet/0029.mp3' },
    { letter: 'Ъъ', pronunciation: "hard sign (separates sounds)", example: 'съезд (congress)', audio: 'noaudio' },
    { letter: 'Ьь', pronunciation: "soft sign (softens consonants)", example: 'нь (of)', audio: 'noaudio' },
    { letter: 'Ее', pronunciation: "like 'ye' in 'yes'", example: 'ерөө (blessing)', audio: 'audio/alphabet/0030.mp3' },
    { letter: 'Ёё', pronunciation: "like 'yo' in 'yolk'", example: 'ёлка (Christmas tree)', audio: 'audio/alphabet/0031.mp3' },
    { letter: 'Юю', pronunciation: "like 'yu' in 'youth'", example: 'юм (thing)', audio: 'audio/alphabet/0032.mp3' },
    { letter: 'Яя', pronunciation: "like 'ya' in 'yard'", example: 'ямар (what kind)', audio: 'audio/alphabet/0033.mp3' }
];

let currentCardIndex = 0;

function updateCard() {
    const card = document.querySelector('.card');
    const currentLetter = alphabetData[currentCardIndex];
    
    card.innerHTML = `
        <div class="cyrillic">${currentLetter.letter}</div>
        <button class="audio-btn" onclick="playAudio('${currentLetter.audio}')">
            🔊 Listen
        </button>
        <div class="pronunciation">${currentLetter.pronunciation}</div>
        <div class="example">${currentLetter.example}</div>
    `;
    
    updateProgress();
}

function nextCard() {
    if (currentCardIndex < alphabetData.length - 1) {
        currentCardIndex++;
        updateCard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCard();
    }
}

function updateProgress() {
    document.getElementById('current-card').textContent = currentCardIndex + 1;
    document.getElementById('total-cards').textContent = alphabetData.length;
    
    document.getElementById('prev-btn').disabled = currentCardIndex === 0;
    document.getElementById('next-btn').disabled = currentCardIndex === alphabetData.length - 1;
}

function playAudio(audioSrc) {
    const audio = new Audio(audioSrc);
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        alert('Audio file not available');
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') previousCard();
    if (e.key === 'ArrowRight') nextCard();
});

// Initialize
document.addEventListener('DOMContentLoaded', updateCard); 
