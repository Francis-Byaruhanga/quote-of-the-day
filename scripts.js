// Get references to DOM elements
const q = document.getElementById('quote-text'); // Quote text paragraph
const btn = document.getElementById('new-quote-btn'); // Button to get a new quote
const img = document.getElementById('bg-image'); // Background image element

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

// Helper: pick a random item
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Load quotes from the local JSON file
let quotes = [];

async function loadQuotes() {
  try {
    const response = await fetch('../model/quotes.json'); 
    if (!response.ok) throw new Error('Failed to load quotes');
    quotes = await response.json();
    showRandom(); // Show a random one on page load
  } catch (error) {
    console.error('Error loading quotes:', error);
    q.textContent = 'Could not load quotes.';
  }
}

// Show random quote + background
function showRandom() {
  if (!quotes.length) return;
  const item = rand(quotes);
  const color = rand(colors);

  document.body.style.background = color;
  if (img) img.src = 'images/' + rand(localImages);

  q.textContent = `"${item.quote}" — ${item.author}`;
  q.classList.add('show');
}

// Button click → show new quote
if (btn) btn.addEventListener('click', showRandom);

// Load quotes on startup
loadQuotes();
