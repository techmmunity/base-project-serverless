import { Module } from "@nestjs/common";
import { DynamoModule } from "v1/injectables/dynamo";

import { ExampleResolver } from "./example.resolver";

import { ExampleService } from "./example.service";

@Module({
	imports: [DynamoModule.forFeature([])],
	providers: [ExampleService, ExampleResolver],
})
export class ExampleModule {}
