import { Injectable } from "@nestjs/common";

import { create } from "./service/create";
import { V1CreateExampleInputSchema } from "./service/create/schemas/input.schema";

@Injectable()
export class ExampleService {
	public constructor() {}

	public create(params: V1CreateExampleInputSchema) {
		return create(
			{
				thisIsAnInjectable: "Just An Example",
			},
			params,
		);
	}
}
