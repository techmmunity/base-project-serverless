import { Inject } from "@nestjs/common";

import { DYNAMO_CLIENT } from "./dynamo.constants";
import { EntityClassOrSchema } from "./interfaces/entity-class-or-schema.type";

import { getRepositoryToken } from "./utils/get-repository-token";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectRepository = (entity: EntityClassOrSchema) =>
	Inject(getRepositoryToken(entity));

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InjectDynamoClient = () => Inject(DYNAMO_CLIENT);
