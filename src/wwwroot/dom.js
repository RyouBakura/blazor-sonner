function nextFrame() {
    // A hidden document never paints, so its animation frames never run. Callers would park
    // here until the page is brought back into view - long enough for the DOM they meant to
    // touch to have gone. Nothing is being animated while hidden, so resolve immediately.
    if (document.hidden) return Promise.resolve();

    return new Promise(requestAnimationFrame);
}

function getBoundingClientRect(element) {
    // An element reference whose element has left the DOM arrives here as null rather than
    // throwing, so measuring it blindly would take the caller down with it.
    if (!element) return null;

    return element.getBoundingClientRect();
}

function getDocumentDirection() {
    if (typeof window === undefined) return "ltr";
    if (typeof document === undefined) return "ltr";

    const dir = document.documentElement.getAttribute("dir");

    if (dir === "auto" || !dir) {
        return window.getComputedStyle(document.documentElement).direction;
    }

    return dir;
}

export const DOM = {
    nextFrame,
    getBoundingClientRect,
    getDocumentDirection
}