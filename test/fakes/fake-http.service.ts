import assert from "node:assert/strict";
import type {
	HTTPService,
	RequestOptions,
} from "../../src/lib/http/http.service";

export class FakeHTTPService implements HTTPService {
	readonly responses: Response[] = [];
	readonly requests: {
		method: "get" | "post" | "put";
		url: string;
		options?: RequestOptions;
	}[] = [];

	addResponse(response: Response) {
		this.responses.push(response);
	}

	reset() {
		this.responses.length = 0;
		this.requests.length = 0;
	}

	async get(url: string, options?: RequestOptions): Promise<Response> {
		this.requests.push({ method: "get", url, options });
		return this.popResponse();
	}

	async post(url: string, options?: RequestOptions): Promise<Response> {
		this.requests.push({ method: "post", url, options });
		return this.popResponse();
	}

	async patch(url: string, options?: RequestOptions): Promise<Response> {
		this.requests.push({ method: "patch", url, options });
		return this.popResponse();
	}

	async put(url: string, options?: RequestOptions): Promise<Response> {
		this.requests.push({ method: "put", url, options });
		return this.popResponse();
	}

	async delete(url: string, options?: RequestOptions): Promise<Response> {
		this.requests.push({ method: "delete", url, options });
		return this.popResponse();
	}

	private popResponse(): Response {
		const response = this.responses.shift();
		assert(response, "No response found for request");
		return response;
	}
}
