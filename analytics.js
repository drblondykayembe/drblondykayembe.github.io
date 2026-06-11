// Analytics Manager
const Analytics = {
    enabled: true,
    batchSize: 10,
    queue: JSON.parse(localStorage.getItem('analyticsQueue')) || [],

    init() {
        // Send queued events periodically
        setInterval(() => this.flushQueue(), 30000); // Every 30 seconds
        window.addEventListener('beforeunload', () => this.flushQueue());
    },

    trackPageView(page) {
        this.track('PageView', {
            page: page,
            url: window.location.href,
            timestamp: new Date().toISOString()
        });
    },

    trackEvent(category, action, label = '') {
        this.track('Event', {
            category: category,
            action: action,
            label: label,
            timestamp: new Date().toISOString()
        });
    },

    trackUserBehavior(behavior, data = {}) {
        this.track('Behavior', {
            behavior: behavior,
            ...data,
            timestamp: new Date().toISOString()
        });
    },

    track(type, data) {
        if (!this.enabled) return;

        const event = {
            type: type,
            data: data,
            userAgent: navigator.userAgent,
            screenResolution: `${window.innerWidth}x${window.innerHeight}`,
            sessionId: this.getSessionId()
        };

        this.queue.push(event);
        this.saveQueue();

        if (this.queue.length >= this.batchSize) {
            this.flushQueue();
        }
    },

    flushQueue() {
        if (this.queue.length === 0) return;

        const batch = this.queue.splice(0, this.batchSize);
        this.saveQueue();

        // Log analytics (you can replace this with a real backend)
        console.log('Analytics Batch:', batch);

        // In production, send to your analytics server:
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(batch)
        // });
    },

    getSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    },

    saveQueue() {
        localStorage.setItem('analyticsQueue', JSON.stringify(this.queue));
    },

    getReport() {
        const allEvents = this.queue;
        return {
            total: allEvents.length,
            pageViews: allEvents.filter(e => e.type === 'PageView').length,
            events: allEvents.filter(e => e.type === 'Event').length,
            behaviors: allEvents.filter(e => e.type === 'Behavior').length
        };
    }
};

// Initialize analytics
Analytics.init();

// Global tracking functions
function trackPageView(page) {
    Analytics.trackPageView(page);
}

function trackEvent(category, action, label = '') {
    Analytics.trackEvent(category, action, label);
}

function trackUserBehavior(behavior, data = {}) {
    Analytics.trackUserBehavior(behavior, data);
}

// Track user engagement
document.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 50) {
        trackUserBehavior('Scroll', { percent: scrollPercent });
    }
});

document.addEventListener('mousemove', () => {
    trackUserBehavior('User Active');
});

// Track time spent on page
let pageLoadTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = (Date.now() - pageLoadTime) / 1000; // in seconds
    trackUserBehavior('Page Duration', { seconds: timeSpent });
});
