import { Test, TestingModule } from "@nestjs/testing";

import { ExampleService } from "v1/api/example/example.service";

export const service = () => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [ExampleService],
	}).compile();

	return module.get<ExampleService>(ExampleService);
};
