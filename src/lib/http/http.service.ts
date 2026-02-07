export type RequestOptions = Pick<RequestInit, "headers" | "body" | "signal">;

export interface HTTPService {
	get(url: string, init?: RequestOptions): Promise<Response>;
	post(url: string, init?: RequestOptions): Promise<Response>;
	patch(url: string, init?: RequestOptions): Promise<Response>;
	put(url: string, init?: RequestOptions): Promise<Response>;
	delete(url: string, init?: RequestOptions): Promise<Response>;
}
