/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { EntityClassOrSchema } from "./interfaces/entity-class-or-schema.type";

import { UpdateParam } from "types/dynamo";

@Injectable()
export class DynamoRepository<EntityType> {
	public constructor(
		protected dynamoDb: DocumentClient,
		protected entity: EntityClassOrSchema,
	) {}

	public async findById<T = EntityType>(id: DocumentClient.Key): Promise<T> {
		const { Item } = await this.dynamoDb
			.get({
				TableName: this.entity.name,
				Key: id,
			})
			.promise();

		return Item as T;
	}

	public query(queryParam: DocumentClient.QueryInput) {
		return this.dynamoDb.query({
			...queryParam,
			TableName: this.entity.name,
			Limit: queryParam.Limit || 100,
		});
	}

	public save<T = EntityType>(item: T): Promise<T> {
		return this.dynamoDb
			.put({
				TableName: this.entity.name,
				Item: item,
				ReturnValues: "ALL_OLD",
			})
			.promise()
			.then(dataPut => dataPut.Attributes as T);
	}

	public delete<T = EntityType>(key: DocumentClient.Key) {
		return this.dynamoDb
			.delete({
				TableName: this.entity.name,
				ReturnValues: "ALL_OLD",
				Key: key,
			})
			.promise()
			.then(dateDeleted => dateDeleted.Attributes as T);
	}

	public update<T = EntityType>(
		Key: DocumentClient.Key,
		updateParam: UpdateParam,
	) {
		return this.dynamoDb
			.update({
				...updateParam,
				TableName: this.entity.name,
				Key,
			})
			.promise()
			.then(item => item.Attributes as T);
	}
}
