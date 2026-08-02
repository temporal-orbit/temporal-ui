/** jsdom does not provide ResizeObserver; Ark positioning uses it asynchronously after unmount. */
class ResizeObserverStub {
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

/** jsdom does not implement Element.scrollTo; zag select scrolls the content element on open. */
if (!Element.prototype.scrollTo) {
	Element.prototype.scrollTo = () => {};
}

import "@testing-library/jest-dom/vitest";
