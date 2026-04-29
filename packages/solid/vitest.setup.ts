/** jsdom does not provide ResizeObserver; Ark positioning uses it asynchronously after unmount. */
class ResizeObserverStub {
	observe(): void {}
	unobserve(): void {}
	disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

import "@testing-library/jest-dom/vitest";
