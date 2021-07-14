import { DynamicModule, Module } from "@nestjs/common";

import { DynamoModuleOptions } from "./interfaces/dynamo-options.interface";
import { EntityClassOrSchema } from "./interfaces/entity-class-or-schema.type";

import { DynamoCoreModule } from "./dynamo-core.module";

import { createDynamoProviders } from "./utils/create-providers";

@Module({})
export class DynamoModule {
	public static forRoot(options: DynamoModuleOptions) {
		return {
			module: DynamoModule,
			imports: [DynamoCoreModule.forRoot(options)],
		};
	}

	public static forFeature(
		entities: Array<EntityClassOrSchema>,
	): DynamicModule {
		const providers = createDynamoProviders(entities);

		return {
			module: DynamoModule,
			providers,
			exports: providers,
		};
	}
}
