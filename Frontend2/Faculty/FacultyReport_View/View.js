document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabName) {
        // Hide all tabs
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Remove active class from all buttons
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Show the clicked tab's content
        const activeTab = document.getElementById(tabName);
        activeTab.classList.add('active');
        
        // Add active class to the clicked button
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        activeButton.classList.add('active');

        // Scroll to the active tab
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            openTab(tabName);
        });
    });

    // Open the first tab by default
    openTab('teaching');

    // Recommendation tab functionality
    const recommendationTabs = document.querySelectorAll('.recommendation-tabs button');
    recommendationTabs.forEach(button => {
        button.addEventListener('click', function() {
            const parentTabs = this.closest('.recommendation-tabs');
            parentTabs.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Action buttons functionality (placeholder)
    const actionButtons = document.querySelectorAll('.actions button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`${this.textContent} button clicked`);
            // Add actual functionality here
        });
    });

    // View and Edit button functionality (placeholder)
    const viewButtons = document.querySelectorAll('.view-button');
    const editButtons = document.querySelectorAll('.edit-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('View button clicked');
            // Add actual view functionality here
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Edit button clicked');
            // Add actual edit functionality here
        });
    });
});

