import type { IDService } from "./id.service";

export class UUIDService implements IDService {
	generate() {
		return crypto.randomUUID();
	}
}
