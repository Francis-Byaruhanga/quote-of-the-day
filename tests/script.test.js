/**
 * @jest-environment jsdom
 */

const path = require('path');

// Mock fetch before importing scripts.js
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { quote: 'Test Quote 1', author: 'Tester 1' },
        { quote: 'Test Quote 2', author: 'Tester 2' },
      ]),
  })
);

// Import scripts.js after defining fetch
const { rand, showRandom, loadQuotes, quotes } = require(path.resolve(__dirname, '../views/scripts.js'));

// Mock DOM
document.body.innerHTML = `
  <div>
    <p id="quote-text">Loading quote...</p>
    <button id="new-quote-btn">New Quote</button>
    <img id="bg-image" />
  </div>
`;

describe('Quote of the Day App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.getElementById('quote-text').textContent = 'Loading quote...';
    document.getElementById('bg-image').src = '';
    quotes.splice(0, quotes.length);
  });

  test('rand() returns a random element from an array', () => {
    const arr = [1, 2, 3, 4];
    const result = rand(arr);
    expect(arr).toContain(result);
  });

  test('loadQuotes() fetches from the correct path', async () => {
    await loadQuotes();
    expect(global.fetch).toHaveBeenCalledWith('../model/quotes.json');
  });

  test('showRandom() updates DOM with a new quote and author', () => {
    quotes.push(
      { quote: 'Sample Quote', author: 'Author Name' },
      { quote: 'Another Quote', author: 'Someone Else' }
    );

    const quoteEl = document.getElementById('quote-text');
    showRandom();

    expect(quoteEl.textContent).toMatch(/—/);
    expect(quoteEl.textContent).toContain('Quote');
  });

  test('showRandom() changes background image', () => {
    const img = document.getElementById('bg-image');
    const oldSrc = img.src;

    quotes.push({ quote: 'Testing', author: 'Someone' });
    showRandom();

    expect(img.src).not.toBe(oldSrc);
  });

  test('loadQuotes() handles fetch errors gracefully', async () => {
    global.fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await loadQuotes();

    const quoteEl = document.getElementById('quote-text');
    expect(quoteEl.textContent).toBe('Could not load quotes.');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
