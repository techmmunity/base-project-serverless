import { Provider } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { DYNAMO_CLIENT } from "../dynamo.constants";
import { DynamoRepository } from "../dynamo.repository";
import { EntityClassOrSchema } from "../interfaces/entity-class-or-schema.type";
import { getRepositoryToken } from "./get-repository-token";

export const createDynamoProviders = (
	entities: Array<EntityClassOrSchema>,
): Array<Provider> =>
	entities.map(entity => ({
		provide: getRepositoryToken(entity),
		useFactory: (dynamoClient: DocumentClient) =>
			new DynamoRepository(dynamoClient, entity),
		inject: [DYNAMO_CLIENT],
	}));
