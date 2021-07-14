import { DocumentClient, Types } from "aws-sdk/clients/dynamodb";

export type DynamoModuleOptions = DocumentClient.DocumentClientOptions &
	Types.ClientConfiguration;
