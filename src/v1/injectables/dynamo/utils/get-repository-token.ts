import { EntityClassOrSchema } from "../interfaces/entity-class-or-schema.type";

export const getRepositoryToken = (entity: EntityClassOrSchema) =>
	`${entity.name}Repository`;
