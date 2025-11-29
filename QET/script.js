// Daily Quotes App - Vanilla JavaScript

// Quotes data (embedded to avoid fetch issues with local files)
const quotes = [
  {
    "quote": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
  },
  {
    "quote": "Believe you can and you're halfway there.",
    "author": "Theodore Roosevelt"
  },
  {
    "quote": "The future belongs to those who believe in the beauty of their dreams.",
    "author": "Eleanor Roosevelt"
  },
  {
    "quote": "You miss 100% of the shots you don't take.",
    "author": "Wayne Gretzky"
  },
  {
    "quote": "The best way to predict the future is to create it.",
    "author": "Peter Drucker"
  },
  {
    "quote": "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "author": "Walt Whitman"
  },
  {
    "quote": "The only limit to our realization of tomorrow will be our doubts of today.",
    "author": "Franklin D. Roosevelt"
  },
  {
    "quote": "Life is what happens to you while you're busy making other plans.",
    "author": "John Lennon"
  },
  {
    "quote": "The purpose of life is a life of purpose.",
    "author": "Robert Byrne"
  },
  {
    "quote": "In the middle of difficulty lies opportunity.",
    "author": "Albert Einstein"
  },
  {
    "quote": "The mind is everything. What you think you become.",
    "author": "Buddha"
  },
  {
    "quote": "The best revenge is massive success.",
    "author": "Frank Sinatra"
  },
  {
    "quote": "You can't build a reputation on what you are going to do.",
    "author": "Henry Ford"
  },
  {
    "quote": "The way to get started is to quit talking and begin doing.",
    "author": "Walt Disney"
  },
  {
    "quote": "Your time is limited, so don't waste it living someone else's life.",
    "author": "Steve Jobs"
  },
  {
    "quote": "The only impossible journey is the one you never begin.",
    "author": "Tony Robbins"
  },
  {
    "quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "author": "Ralph Waldo Emerson"
  },
  {
    "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "author": "Nelson Mandela"
  },
  {
    "quote": "The secret of getting ahead is getting started.",
    "author": "Mark Twain"
  },
  {
    "quote": "Don't watch the clock; do what it does. Keep going.",
    "author": "Sam Levenson"
  }
];

// DOM elements
const homeBtn = document.getElementById('home-btn');
const favoritesBtn = document.getElementById('favorites-btn');
const homeScreen = document.getElementById('home-screen');
const favoritesScreen = document.getElementById('favorites-screen');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const copyBtn = document.getElementById('copy-btn');
const favoritesList = document.getElementById('favorites-list');
const noFavorites = document.getElementById('no-favorites');

// Global variables
let currentQuote = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Load quotes (now embedded, no fetch needed)
function loadQuotes() {
    showRandomQuote();
}

// Show random quote with fade animation
function showRandomQuote() {
    if (quotes.length === 0) return;

    // Add fade-out class
    quoteText.classList.add('fade-out');
    quoteAuthor.classList.add('fade-out');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentQuote = quotes[randomIndex];

        quoteText.textContent = `"${currentQuote.quote}"`;
        quoteAuthor.textContent = `- ${currentQuote.author}`;

        // Remove fade-out and add fade-in
        quoteText.classList.remove('fade-out');
        quoteAuthor.classList.remove('fade-out');
        quoteText.classList.add('fade-in');
        quoteAuthor.classList.add('fade-in');

        // Update favorite button state
        updateFavoriteButton();
    }, 300);
}

// Update favorite button text based on current quote status
function updateFavoriteButton() {
    if (currentQuote && isFavorite(currentQuote)) {
        favoriteBtn.textContent = 'Unfavorite';
        favoriteBtn.classList.remove('secondary');
        favoriteBtn.classList.add('primary');
    } else {
        favoriteBtn.textContent = 'Favorite';
        favoriteBtn.classList.remove('primary');
        favoriteBtn.classList.add('secondary');
    }
}

// Check if a quote is in favorites
function isFavorite(quote) {
    return favorites.some(fav => fav.quote === quote.quote && fav.author === quote.author);
}

// Toggle favorite status
function toggleFavorite() {
    if (!currentQuote) return;

    if (isFavorite(currentQuote)) {
        favorites = favorites.filter(fav => !(fav.quote === currentQuote.quote && fav.author === currentQuote.author));
    } else {
        favorites.push(currentQuote);
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update button and favorites list
    updateFavoriteButton();
    renderFavorites();
}

// Copy quote to clipboard
async function copyQuote() {
    if (!currentQuote) return;

    const textToCopy = `"${currentQuote.quote}" - ${currentQuote.author}`;

    try {
        await navigator.clipboard.writeText(textToCopy);
        // Visual feedback
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
}

// Render favorites list
function renderFavorites() {
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        noFavorites.style.display = 'block';
        return;
    }

    noFavorites.style.display = 'none';

    favorites.forEach((quote, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';

        favoriteItem.innerHTML = `
            <div class="quote-text">"${quote.quote}"</div>
            <div class="quote-author">- ${quote.author}</div>
            <button class="remove-btn" data-index="${index}">×</button>
        `;

        favoritesList.appendChild(favoriteItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
        });
    });
}

// Switch between screens
function switchScreen(screen) {
    homeScreen.classList.remove('active');
    favoritesScreen.classList.remove('active');
    homeBtn.classList.remove('active');
    favoritesBtn.classList.remove('active');

    if (screen === 'home') {
        homeScreen.classList.add('active');
        homeBtn.classList.add('active');
    } else if (screen === 'favorites') {
        favoritesScreen.classList.add('active');
        favoritesBtn.classList.add('active');
        renderFavorites();
    }
}

// Event listeners
homeBtn.addEventListener('click', () => switchScreen('home'));
favoritesBtn.addEventListener('click', () => switchScreen('favorites'));
newQuoteBtn.addEventListener('click', showRandomQuote);
favoriteBtn.addEventListener('click', toggleFavorite);
copyBtn.addEventListener('click', copyQuote);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    renderFavorites();
});
