// Content data structure - EASY TO UPDATE
const contentData = {
    'did-you-know': {
        title: 'Did You Know?',
        description: 'Daily health questions to improve your knowledge',
        items: [
            {
                id: 1,
                title: 'Did You Know - Vitamin D',
                type: 'pictures',
                image: 'assets/images/did-you-know-1.jpg',
                downloadUrl: 'assets/downloads/did-you-know-1.pdf'
            },
            {
                id: 2,
                title: 'Did You Know - Sleep Benefits',
                type: 'videos',
                image: 'assets/images/did-you-know-2.jpg',
                downloadUrl: 'assets/downloads/did-you-know-2.mp4'
            },
            {
                id: 3,
                title: 'Did You Know - Water Intake',
                type: 'documents',
                image: 'assets/images/did-you-know-3.jpg',
                downloadUrl: 'assets/downloads/did-you-know-3.pdf'
            },
            // Add more items as needed
        ]
    },
    'health-challenge': {
        title: 'Tuesday Health Challenge!',
        description: 'Weekly health riddles and challenges',
        items: [
            {
                id: 1,
                title: 'Challenge Week 1',
                type: 'articles',
                image: 'assets/images/challenge-1.jpg',
                downloadUrl: 'assets/downloads/challenge-1.pdf'
            },
            {
                id: 2,
                title: 'Challenge Week 2',
                type: 'documents',
                image: 'assets/images/challenge-2.jpg',
                downloadUrl: 'assets/downloads/challenge-2.docx'
            },
            // Add more items
        ]
    },
    '5-health-facts': {
        title: 'Wednesday 5-Health-Facts!',
        description: '5 easy-to-remember health facts',
        items: [
            {
                id: 1,
                title: '5 Facts about Nutrition',
                type: 'pictures',
                image: 'assets/images/5facts-nutrition.jpg',
                downloadUrl: 'assets/downloads/5facts-nutrition.pdf'
            },
            {
                id: 2,
                title: '5 Facts about Exercise',
                type: 'videos',
                image: 'assets/images/5facts-exercise.jpg',
                downloadUrl: 'assets/downloads/5facts-exercise.mp4'
            },
            // Add more items
        ]
    },
    'true-or-false': {
        title: 'Thursday True or False?',
        description: 'Dismantle health myths with evidence',
        items: [
            {
                id: 1,
                title: 'Myth Busting #1',
                type: 'pictures',
                image: 'assets/images/myth1.jpg',
                downloadUrl: 'assets/downloads/myth1.pdf'
            },
            // Add more items
        ]
    },
    'health-storytelling': {
        title: 'Friday Health Storytelling!',
        description: 'Real-life stories on global health',
        items: [
            {
                id: 1,
                title: 'Story 1: Fighting Malaria',
                type: 'videos',
                image: 'assets/images/story1.jpg',
                downloadUrl: 'assets/downloads/story1.mp4'
            },
            // Add more items
        ]
    },
    'myth-fact': {
        title: 'Weekend Health Myth-Fact!',
        description: 'Identify and dismantle health myths',
        items: [
            {
                id: 1,
                title: 'Myth-Fact: Detox Drinks',
                type: 'documents',
                image: 'assets/images/mythfact1.jpg',
                downloadUrl: 'assets/downloads/mythfact1.pdf'
            },
            // Add more items
        ]
    },
    'breaking-news': {
        title: 'Health Breaking News!',
        description: 'Latest health news and events',
        items: [
            {
                id: 1,
                title: 'News: New Vaccine Development',
                type: 'articles',
                image: 'assets/images/news1.jpg',
                downloadUrl: 'assets/downloads/news1.pdf'
            },
            // Add more items
        ]
    }
};

// Get URL parameter
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

// Load content based on category
function loadContent() {
    const category = getUrlParameter('category') || 'did-you-know';
    const data = contentData[category];

    if (!data) {
        document.getElementById('content-grid').innerHTML = '<p>Category not found</p>';
        return;
    }

    // Update page title and description
    document.getElementById('page-title').textContent = data.title;
    document.getElementById('page-description').textContent = data.description;

    // Display content
    displayContent(data.items);
}

// Display content items
function displayContent(items, filterType = 'all') {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';

    const filtered = filterType === 'all' 
        ? items 
        : items.filter(item => item.type === filterType);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = `content-card ${item.type}`;
        card.innerHTML = `
            <div class="content-card-image">
                <img src="${item.image}" alt="${item.title}">
                <span class="content-type-badge">${item.type}</span>
            </div>
            <div class="content-card-info">
                <h3>${item.title}</h3>
                <a href="${item.downloadUrl}" class="download-btn" download>
                    ⬇️ Download
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    loadContent();

    // Filter button listeners
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = getUrlParameter('category') || 'did-you-know';
            const filterType = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Display filtered content
            displayContent(contentData[category].items, filterType);
        });
    });
});
