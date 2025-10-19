// Get references to DOM elements
const q = document.getElementById('quote-text'); // The quote text paragraph
const btn = document.getElementById('new-quote-btn'); // The button to get a new quote
const img = document.getElementById('bg-image'); // The background image element

// List of quotes to display
const quotes = [
  'Life is what happens when you\'re busy making other plans. — John Lennon',
  'The purpose of our lives is to be happy. — Dalai Lama',
  'Get busy living or get busy dying. — Stephen King',
  'You miss 100% of the shots you don\'t take. — Wayne Gretzky'
];

// List of background colors to randomly choose from
const colors = ['#2980b9', '#8e44ad', '#16a085', '#e67e22', '#c0392b'];

// List of local image filenames for background
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

// Helper function: pick a random item from an array
function rand(a) {
  return a[Math.floor(Math.random() * a.length)];
}

// Main function: update quote, background color, and image
function showRandom() {
  if (!q) return; // Safety check
  // Remove .show to trigger CSS fade-out (if any)
  q.classList.remove('show');
  // Pick a random quote
  const quote = rand(quotes);
  // Pick a random background color
  document.body.style.background = rand(colors);
  // Pick a random image and set as background
  if (img) {
    img.src = 'images/' + rand(localImages);
  }
  // Update the quote text and fade in
  q.textContent = '"' + quote + '"';
  q.classList.add('show');
}

// When the button is clicked, show a new random quote and background
if (btn) btn.addEventListener('click', showRandom);

// Show a random quote and background on page load
showRandom();
