// ==UserScript==
// @name         Messages for Web - Foreground Focus
// @namespace    http://yo1.dog
// @version      1.0.1
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

console.log('Messages for Web - Foreground Focus v1.0.1');
window.addEventListener('focus', () => {
  setTimeout(
    () => document.querySelector('textarea.input')?.focus(),
    100
  );
});
