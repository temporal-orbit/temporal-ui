import { cx } from "./cx";

describe("cx utility", () => {
	it("should handle simple strings", () => {
		expect(cx("foo", "bar")).toBe("foo bar");
		expect(cx("foo bar", "baz")).toBe("foo bar baz");
	});

	it("should ignore falsy values", () => {
		expect(cx("foo", null, "bar", undefined, false, "", "baz", 0, "qux")).toBe("foo bar baz qux");
	});

	it("should handle arrays of class names", () => {
		expect(cx(["foo", "bar"])).toBe("foo bar");
		expect(cx("foo", ["bar", "baz"], "qux")).toBe("foo bar baz qux");
	});

	it("should handle nested arrays of class names", () => {
		expect(cx(["foo", ["bar", ["baz"]]])).toBe("foo bar baz");
		expect(cx("a", [["b", [null, "c", [undefined, "d"]]], "e"])).toBe("a b c d e");
	});

	it("should handle arrays with falsy values", () => {
		expect(cx(["foo", null, "bar", undefined, false, "baz"])).toBe("foo bar baz");
	});

	it("should handle objects with truthy/falsy values", () => {
		expect(cx({ foo: true, bar: false, baz: true })).toBe("foo baz");
		expect(cx("initial", { foo: true, "bar-baz": true, qux: false })).toBe("initial foo bar-baz");
	});

	it("should handle objects with non-boolean truthy values", () => {
		expect(cx({ foo: "not-empty", bar: 1, baz: {}, qux: [] })).toBe("foo bar baz qux");
	});

	it("should handle mixed arguments (strings, arrays, objects)", () => {
		const hasError = true;
		const isDisabled = false;
		const theme = "dark";
		const result = cx(
			"button",
			theme === "dark" && "button-dark",
			["p-4", "m-2"],
			{
				"button-error": hasError,
				"button-disabled": isDisabled,
				"another-class": true,
			},
			null,
			undefined,
		);
		// Order can vary due to Set, so we check for inclusion and length
		const expectedClasses = [
			"button",
			"button-dark",
			"p-4",
			"m-2",
			"button-error",
			"another-class",
		];
		const resultArray = result.split(" ");
		expect(resultArray.length).toBe(expectedClasses.length);
		expectedClasses.forEach((cls) => {
			expect(resultArray).toContain(cls);
		});
	});

	it("should handle numbers as class names", () => {
		expect(cx(10, "items")).toBe("10 items");
		expect(cx("item", 20, { prefix: 30 })).toBe("item 20 prefix");
		expect(cx(0, "items")).toBe("items"); // 0 is falsy
	});

	it("should deduplicate class names", () => {
		expect(cx("foo", "bar", "foo")).toBe("foo bar");
		expect(cx({ foo: true }, "foo", ["foo", "bar"])).toBe("foo bar");
		expect(cx("text-red-500", "bg-blue-500", "text-red-500")).toBe("text-red-500 bg-blue-500");
	});

	it("should handle classes with multiple spaces in strings or keys and trim them", () => {
		expect(cx("  foo   bar  ")).toBe("foo bar");
		expect(cx({ "  foo   bar  ": true, "  baz  ": true })).toBe("foo bar baz");
		expect(cx(["  one   two  ", "three"])).toBe("one two three");
		expect(cx(" leading", "trailing ", " both ")).toBe("leading trailing both");
	});

	it("should return an empty string if no valid classes are provided", () => {
		expect(cx(null, undefined, false, "", 0, {}, [])).toBe("");
		expect(cx({ a: false, b: null }, [null, undefined])).toBe("");
	});

	it("should handle complex nested structures", () => {
		const result = cx(
			"base",
			["p-2", { "m-4": true, "mx-auto": false }],
			null,
			{
				"text-lg": true,
				"font-bold": true,
				"bg-red-500": false,
			},
			["text-lg", "another"], // 'text-lg' is a duplicate here
		);
		const expectedClasses = ["base", "p-2", "m-4", "text-lg", "font-bold", "another"];
		const resultArray = result.split(" ");
		expect(resultArray.length).toBe(expectedClasses.length);
		expectedClasses.forEach((cls) => {
			expect(resultArray).toContain(cls);
		});
	});

	it("should correctly handle object keys that are numbers", () => {
		expect(cx({ 100: true, 200: false, "300": true })).toBe("100 300");
	});
});
