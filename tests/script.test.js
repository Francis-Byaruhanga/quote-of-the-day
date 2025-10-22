/**
 * @jest-environment jsdom
 */
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../views/index.html"), "utf8");

describe("Quote of the Day App", () => {
  let document;
  let window;
  let quoteEl;
  let buttonEl;
  let imgEl;

  beforeEach(() => {
    // Load the HTML into JSDOM
    document = new DOMParser().parseFromString(html, "text/html");
    window = document.defaultView;

    // Mock DOM elements
    quoteEl = document.getElementById("quote-text");
    buttonEl = document.getElementById("new-quote-btn");
    imgEl = document.getElementById("bg-image");

    // Mock global fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { quote: "Test quote", author: "Tester" },
            { quote: "Another quote", author: "Someone" },
          ]),
      })
    );

    // Mock document body
    global.document = document;
    global.window = window;
    global.getComputedStyle = () => ({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loads and displays a random quote", async () => {
    const module = await import("../views/scripts.js");

    // Wait for async loadQuotes()
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(global.fetch).toHaveBeenCalledWith("../model/quotes.json");
    expect(quoteEl.textContent.length).toBeGreaterThan(0);
  });

  test("clicking the button changes the quote", async () => {
    const module = await import("../views/scripts.js");
    await new Promise((resolve) => setTimeout(resolve, 0));

    const firstQuote = quoteEl.textContent;
    buttonEl.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const newQuote = quoteEl.textContent;
    expect(newQuote).not.toEqual(firstQuote);
  });
});
