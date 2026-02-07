import { TestingModuleBuilder } from "@nestjs/testing";
import { FetchService } from "src/lib/http/fetch.service";
import { HTTPService } from "src/lib/http/http.service";

export type ModuleCustomizer = (builder: TestingModuleBuilder) => void;

export const useValue =
	<T, V>(overrideToken: T, value: V) =>
	(builder: TestingModuleBuilder) =>
		builder.overrideProvider(overrideToken).useValue(value);

export const useFakeHTTP = (fake: HTTPService) => useValue(FetchService, fake);
