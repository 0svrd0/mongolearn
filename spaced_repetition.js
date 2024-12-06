const SpacedRepetition = {
    intervals: [1, 3, 7, 14, 30, 90, 180], // Days between reviews

    init() {
        this.reviewQueue = JSON.parse(localStorage.getItem('review_queue')) || {};
    },

    scheduleReview(word, level = 0) {
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + this.intervals[level]);
        
        this.reviewQueue[word] = {
            nextReview: nextReview.toISOString(),
            level: Math.min(level + 1, this.intervals.length - 1)
        };
        
        this.saveQueue();
    },

    getDueReviews() {
        const now = new Date();
        return Object.entries(this.reviewQueue)
            .filter(([_, data]) => new Date(data.nextReview) <= now)
            .map(([word]) => word);
    },

    saveQueue() {
        localStorage.setItem('review_queue', JSON.stringify(this.reviewQueue));
    }
}; 