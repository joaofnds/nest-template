import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
} from "@nestjs/common";
import { Cause, Effect, Exit, identity } from "effect";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class EffectInterceptor implements NestInterceptor {
	intercept(
		_context: ExecutionContext,
		next: CallHandler,
	): Observable<unknown> {
		return next
			.handle()
			.pipe(map((result) => this.handleControllerResult(result)));
	}

	private async handleControllerResult(result: unknown) {
		if (!Effect.isEffect(result)) return result;

		return Exit.match(
			await Effect.runPromiseExit(
				result as Effect.Effect<unknown, Error, never>,
			),
			{ onSuccess: identity, onFailure: (cause) => this.onFailure(cause) },
		);
	}

	private onFailure(cause: Cause.Cause<Error>) {
		switch (cause._tag) {
			case "Fail":
				throw cause.error;
			default:
				throw new InternalServerErrorException(cause);
		}
	}
}
