import type { IDService } from "../../src/lib/id/id.service";

export class IncrementalIDFactory implements IDService {
	private id = 1;
	readonly generatedIDs: string[] = [];

	generate(): string {
		const id = String(this.id++);
		this.generatedIDs.push(id);
		return id;
	}

	reset(): void {
		this.id = 1;
		this.generatedIDs.length = 0;
	}
}
