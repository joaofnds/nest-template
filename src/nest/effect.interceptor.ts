import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Effect, Exit, Match, identity, pipe, unsafeCoerce } from "effect";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class EffectInterceptor implements NestInterceptor {
	intercept(
		_context: ExecutionContext,
		next: CallHandler,
	): Observable<unknown> {
		return next.handle().pipe(
			map(async (value: unknown) =>
				pipe(
					Match.value(value),
					Match.when(Effect.isEffect, async (effect) =>
						Exit.match(
							await Effect.runPromiseExit<unknown, Error>(unsafeCoerce(effect)),
							{
								onSuccess: identity,
								onFailure: (cause) =>
									pipe(
										Match.value(cause),
										Match.tag("Fail", ({ error }) => {
											throw error;
										}),
									),
							},
						),
					),
					Match.orElse(identity),
				),
			),
		);
	}
}
