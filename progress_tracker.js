const ProgressTracker = {
    init() {
        this.progress = JSON.parse(localStorage.getItem('mongolearn_progress')) || {
            completedWords: {},
            themeProgress: {},
            totalProgress: 0,
            streakDays: 0,
            lastStudyDate: null
        };
        this.updateStreak();
    },

    markWordAsLearned(theme, word) {
        if (!this.progress.completedWords[theme]) {
            this.progress.completedWords[theme] = new Set();
        }
        this.progress.completedWords[theme].add(word);
        this.updateThemeProgress(theme);
        this.saveProgress();
    },

    updateThemeProgress(theme) {
        const themeWords = vocabularyData[theme].length;
        const completedWords = this.progress.completedWords[theme]?.size || 0;
        this.progress.themeProgress[theme] = (completedWords / themeWords) * 100;
        this.updateTotalProgress();
    },

    updateTotalProgress() {
        const themes = Object.keys(vocabularyData);
        const totalProgress = themes.reduce((acc, theme) => 
            acc + (this.progress.themeProgress[theme] || 0), 0) / themes.length;
        this.progress.totalProgress = totalProgress;
        this.saveProgress();
    },

    updateStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.progress.lastStudyDate;

        if (lastStudy === today) return;

        if (lastStudy === new Date(Date.now() - 86400000).toDateString()) {
            this.progress.streakDays++;
        } else if (lastStudy !== today) {
            this.progress.streakDays = 1;
        }

        this.progress.lastStudyDate = today;
        this.saveProgress();
    },

    saveProgress() {
        localStorage.setItem('mongolearn_progress', JSON.stringify(this.progress));
        this.updateUI();
    },

    updateUI() {
        // Update progress displays across the site
        document.querySelectorAll('.progress-display').forEach(el => {
            el.textContent = `${Math.round(this.progress.totalProgress)}%`;
        });

        document.querySelectorAll('.streak-display').forEach(el => {
            el.textContent = `${this.progress.streakDays} day${this.progress.streakDays !== 1 ? 's' : ''}`;
        });
    }
}; 