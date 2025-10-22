// views/scripts.js

// Lists for background color and images
const colors = ['#2980b9', '#8e44ad', '#16a085', '#e67e22', '#c0392b'];
const localImages = [
  'ashutosh-saraswat-CXyz3qljaH8-unsplash.jpg',
  'blake-verdoorn-cssvEZacHvQ-unsplash.jpg',
  'daoudi-aissa-absT1BNRDAI-unsplash.jpg',
  'jeffrey-workman-YvkH8R1zoQM-unsplash.jpg',
  'john-o-nelio-8iq2fLo0KXc-unsplash.jpg',
  'julien-di-majo-cwL_DmFQTMI-unsplash.jpg',
  'mike-lewis-headsmart-media-waAAaeC9hns-unsplash.jpg',
  'rajiv-bajaj-i4QIqfcTkN8-unsplash.jpg',
  'ryan-loughlin-f1Kbt5NC8-I-unsplash.jpg',
  'saiph-muhammad-CSs8aiN_LkI-unsplash.jpg',
  'zany-jadraque-ZCRtfop2hZY-unsplash (1).jpg',
  'zany-jadraque-ZCRtfop2hZY-unsplash.jpg'
];

// Helper: pick a random item from array
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Quotes array
let quotes = [];

// Show random quote + background
function showRandom() {
  const q = document.getElementById('quote-text');
  const img = document.getElementById('bg-image');

  if (!q) return;

  if (!quotes.length) {
    q.textContent = 'Loading quote...';
    return;
  }

  const item = rand(quotes);
  const color = rand(colors);
  const image = rand(localImages);

  document.body.style.background = color;
  if (img) img.src = 'images/' + image;

  q.textContent = `"${item.quote}" — ${item.author}`;
  q.classList.add('show');
}

// Load quotes from local JSON file
async function loadQuotes() {
  const q = document.getElementById('quote-text');
  try {
    const response = await fetch('../model/quotes.json');
    if (!response.ok) throw new Error('Failed to load quotes');
    quotes = await response.json();
    showRandom(); // Show a random quote after loading
  } catch (error) {
    console.error('Error loading quotes:', error);
    if (q) q.textContent = 'Could not load quotes.';
  }
}

// Setup button click after DOM is ready
function setupButton() {
  const btn = document.getElementById('new-quote-btn');
  if (btn) btn.addEventListener('click', showRandom);
}

// Initialize app
function init() {
  setupButton();
  if (process.env.NODE_ENV !== 'test') {
    loadQuotes();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for Jest testing
if (typeof module !== 'undefined') {
  module.exports = { loadQuotes, showRandom, rand, quotes };
}
