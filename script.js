// Application Data
const toolsData = [
    {
        id: 'upwork-utils',
        title: 'Upwork Proposal Tool',
        description: 'Write proposals quickly with Upwork Mode, featuring bold text formatting, auto-copy to clipboard, and custom themes.',
        url: 'https://upworkutils.netlify.app/',
        category: 'Upwork Tools',
        icon: 'fa-solid fa-file-signature'
    },
    {
        id: 'pwd-gen',
        title: 'Password Generator',
        description: 'Generate secure, random passwords with customizable parameters to keep your accounts safe.',
        url: 'https://example-password-gen.netlify.app',
        category: 'Utility',
        icon: 'fa-solid fa-key'
    },
    {
        id: 'text-fmt',
        title: 'Text Fomatter',
        description: 'Format, standardize, and convert text cases easily online with this handy productivity tool.',
        url: 'https://example-text-formatter.netlify.app',
        category: 'Productivity',
        icon: 'fa-solid fa-font'
    },
    {
        id: 'color-pick',
        title: 'Color Palette Picker',
        description: 'Extract and build beautiful color palettes for your web designs in seconds.',
        url: 'https://example-color-picker.netlify.app',
        category: 'Development',
        icon: 'fa-solid fa-palette'
    },
    {
        id: 'json-val',
        title: 'JSON Validator',
        description: 'Quickly format and validate your JSON strings to find syntax errors and maintain clean data.',
        url: 'https://example-json-validator.netlify.app',
        category: 'Development',
        icon: 'fa-solid fa-code'
    },
    {
        id: 'regex-test',
        title: 'Regex Tester',
        description: 'Test and debug complex regular expressions in real-time before adding them to your codebase.',
        url: 'https://example-regex-tester.netlify.app',
        category: 'Development',
        icon: 'fa-solid fa-asterisk'
    },
    {
        id: 'img-crop',
        title: 'Profile Cropper',
        description: 'Crop and stylize profile pictures for Upwork and other platforms with custom borders.',
        url: 'https://example-profile-cropper.netlify.app',
        category: 'Utility',
        icon: 'fa-solid fa-crop-simple'
    }
];

// DOM Elements
const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilters = document.getElementById('categoryFilters');

// Application State
let currentFilter = 'All';
let searchQuery = '';

// Extract unique categories from data dynamically
const categories = ['All', ...new Set([...toolsData.map(tool => tool.category), 'Upwork Tools'])];

/**
 * Initialize the application
 */
function init() {
    renderFilters();
    renderTools();
    setupEventListeners();
}

/**
 * Render Category Filter Buttons
 */
function renderFilters() {
    categoryFilters.innerHTML = categories.map(category => `
        <button class="filter-btn ${currentFilter === category ? 'active' : ''}" data-category="${category}">
            ${category}
        </button>
    `).join('');
}

/**
 * Render Tool Cards based on current state (search & filters)
 */
function renderTools() {
    const filteredTools = toolsData.filter(tool => {
        // Check Category Match
        const matchesCategory = currentFilter === 'All' || tool.category === currentFilter;

        // Check Search Query Match (checks title and description)
        const lowerSearchQuery = searchQuery.toLowerCase();
        const matchesSearch = tool.title.toLowerCase().includes(lowerSearchQuery) ||
            tool.description.toLowerCase().includes(lowerSearchQuery);

        return matchesCategory && matchesSearch;
    });

    // Handle Empty State
    if (filteredTools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-ghost fa-3x" style="margin-bottom: 20px;"></i>
                <h2>No tools found</h2>
                <p>Try adjusting your search query or category filter.</p>
            </div>
        `;
        return;
    }

    // Render Cards
    toolsGrid.innerHTML = filteredTools.map(tool => `
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-card">
            <div class="tool-header">
                <div class="tool-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="tool-info">
                    <h3 class="tool-title">${tool.title}</h3>
                    <span class="tool-category">${tool.category}</span>
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="open-btn">
                <span>Open App</span> <i class="fa-solid fa-arrow-right"></i>
            </div>
        </a>
    `).join('');
}

/**
 * Setup Event Listeners for interactive elements
 */
function setupEventListeners() {
    // Category filtering
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            currentFilter = e.target.dataset.category;
            renderFilters(); // Re-render filters to update the 'active' class styling
            renderTools();   // Re-render tools grid based on new filter
        }
    });

    // Real-time Search functionality
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderTools(); // Re-render tools grid dynamically as user types
    });
}

// Run initialization on load
init();
