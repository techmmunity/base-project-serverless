import { Global, Module } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { DYNAMO_CLIENT, DYNAMO_MODULE_OPTIONS } from "./dynamo.constants";
import { DynamoModuleOptions } from "./interfaces/dynamo-options.interface";

@Global()
@Module({})
export class DynamoCoreModule {
	public static forRoot(options: DynamoModuleOptions) {
		const dynamoModuleOptions = {
			provide: DYNAMO_MODULE_OPTIONS,
			useValue: options,
		};

		const clientProvider = {
			provide: DYNAMO_CLIENT,
			useFactory: () => new DocumentClient(options),
		};

		return {
			module: DynamoCoreModule,
			providers: [clientProvider, dynamoModuleOptions],
			exports: [clientProvider],
		};
	}
}
