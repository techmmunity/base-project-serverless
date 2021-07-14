import { DynamoModule } from "v1/injectables/dynamo";

export const DYNAMO_CONFIG = DynamoModule.forRoot({
	convertEmptyValues: true,
});
