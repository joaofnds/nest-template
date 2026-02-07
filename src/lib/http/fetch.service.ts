import type { HTTPService, RequestOptions } from "./http.service";

export class FetchService implements HTTPService {
	get(url: string, init?: RequestOptions) {
		return fetch(url, { method: "GET", ...init });
	}

	post(url: string, init?: RequestOptions) {
		return fetch(url, { method: "POST", ...init });
	}

	patch(url: string, init?: RequestOptions) {
		return fetch(url, { method: "PATCH", ...init });
	}

	put(url: string, init?: RequestOptions) {
		return fetch(url, { method: "PUT", ...init });
	}

	delete(url: string, init?: RequestOptions) {
		return fetch(url, { method: "DELETE", ...init });
	}
}
