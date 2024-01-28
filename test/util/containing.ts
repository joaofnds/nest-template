import "test/assert-not-prod";

export function containing(obj: unknown) {
	if (Array.isArray(obj)) {
		return expect.arrayContaining(obj.map((o) => containing(o)));
	}

	if (typeof obj === "object" && obj !== null) {
		return expect.objectContaining(
			Object.fromEntries(
				Object.entries(obj).map(([key, value]) => [key, containing(value)]),
			),
		);
	}

	return obj;
}
