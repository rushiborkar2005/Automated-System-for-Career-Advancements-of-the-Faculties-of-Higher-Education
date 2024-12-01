document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchForm = document.querySelector('.search-container');
    const searchInput = document.getElementById('search');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            // Implement search functionality here
        }
    });

    // News items click handler
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            console.log('Clicked news item:', title);
            // Implement news item click functionality here
        });
    });

    // Get Started button click handler
    const getStartedBtn = document.querySelector('.get-started');
    getStartedBtn.addEventListener('click', () => {
        console.log('Get Started clicked');
        // Implement Get Started functionality here
    });
});