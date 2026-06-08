export function getSafeString(
	length: number,
	letterBank: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
): string {
	// Return empty string for invalid inputs
	if (length <= 0 || letterBank.length === 0) {
		return "";
	}

	let result = "";
	for (let i = 0; i < length; i++) {
		result += letterBank.charAt(Math.floor(Math.random() * letterBank.length));
	}
	return result;
}

export const getInitials = (name = "") =>
	name
		.split(" ")
		.filter((part) => part.length > 0)
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

export const testId = (testId?: string) => (str: string) =>
	testId ? `${testId}${str}` : undefined;
