// ==UserScript==
// @name         Messages for Web - Foreground Focus
// @namespace    http://yo1.dog
// @version      1.1.0
// @description  Messages for Web: Focus the text input on window foreground.
// @author       Mike "yo1dog" Moore
// @homepageURL  https://github.com/yo1dog/messages-for-web-fixes#readme
// @icon         https://github.com/yo1dog/messages-for-web-fixes/raw/master/icon.png
// @match        https://messages.google.com/web/*
// @grant        none
// @run-at       document-end
// @sandbox      raw
// @unwrap
// ==/UserScript==

let isPending = false;
function focusInput() {
  if (isPending) return;
  isPending = true;
  setTimeout(() => {
    isPending = false;
    
    // At the time of writing, Google has both a textarea and a contenteditable div, one of which is
    // hidden. Perhaps A/B testing?
    // We use the `data-e2e-message-input-box` attribute selector as the naming suggests this is
    // used by Google's end-to-end testing, which indiciates it may be stable across updates.
    const inputElem = document.querySelector('mws-message-compose [data-e2e-message-input-box]:not([hidden])');
    if (!inputElem) return;
    
    const wasAlreadyFocused = document.activeElement === inputElem;
    inputElem.focus();
    
    // contenteditable elements don't remember the caret/selection position like standard input
    // elements do. Thus we must manually set the selection to move the caret to the end after focus.
    // This mostly matches what Google does when switching conversations.
    if (
      !wasAlreadyFocused &&
      inputElem.localName !== 'textarea' &&
      inputElem.localName !== 'input'
    ) {
      const range = document.createRange();
      range.selectNodeContents(inputElem);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, 100);
}

console.log('Messages for Web - Foreground Focus v1.1.0');
window.addEventListener('focus', () => focusInput());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') focusInput();
});
