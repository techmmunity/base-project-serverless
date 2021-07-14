import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";

import { ExampleService } from "./example.service";

import { V1CreateExampleInputSchema } from "./service/create/schemas/input.schema";
import { V1CreateExampleOutputSchema } from "./service/create/schemas/output.schema";

@Resolver("example")
export class ExampleResolver {
	public constructor(private readonly exampleService: ExampleService) {}

	@Mutation(() => V1CreateExampleOutputSchema)
	public create(@Args("data") data: V1CreateExampleInputSchema) {
		return this.exampleService.create(data);
	}

	@Query(() => V1CreateExampleOutputSchema)
	public find() {
		return this.exampleService.create({
			thisIsAnParam: "Example",
		});
	}
}
