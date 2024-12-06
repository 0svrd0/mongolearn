const Achievements = {
    list: {
        firstWord: { title: 'First Step', description: 'Learn your first word', icon: '🎯' },
        tenWords: { title: 'Getting Started', description: 'Learn 10 words', icon: '🌟' },
        completeTheme: { title: 'Theme Master', description: 'Complete a theme', icon: '🏆' },
        weekStreak: { title: 'Dedicated Learner', description: '7-day streak', icon: '🔥' },
        allBasics: { title: 'Basics Champion', description: 'Complete all basic phrases', icon: '👑' },
        // Add more achievements
    },

    check(progress) {
        const earned = new Set(JSON.parse(localStorage.getItem('earned_achievements') || '[]'));
        const newAchievements = [];

        // Check for new achievements
        if (this.countTotalWords(progress) >= 1 && !earned.has('firstWord')) {
            newAchievements.push('firstWord');
        }
        // Add more achievement checks

        // Save and notify
        if (newAchievements.length > 0) {
            newAchievements.forEach(achievement => earned.add(achievement));
            localStorage.setItem('earned_achievements', JSON.stringify([...earned]));
            this.showNotification(newAchievements);
        }
    },

    showNotification(achievements) {
        achievements.forEach(achievement => {
            const { title, description, icon } = this.list[achievement];
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-icon">${icon}</div>
                <div class="achievement-text">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        });
    }
}; 