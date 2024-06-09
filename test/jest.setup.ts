import { Effect } from "effect";

declare global {
	namespace jest {
		interface It {
			effect: (desc: string, fn: Parameters<typeof Effect.gen>["1"]) => void;
		}
	}
}

global.it.effect = (name, fn) => {
	global.it(name, () =>
		Effect.runPromise(Effect.gen(fn) as Effect.Effect<unknown, unknown, never>),
	);
};
