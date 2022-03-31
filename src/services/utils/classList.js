export const addClassName = (selector, className) => document.querySelector(selector).classList.add(className);

export const removeClassName = (selector, className) => document.querySelector(selector).classList.remove(className);

export const toggleClassName = (selector, className) => document.querySelector(selector).classList.toggle(className);