import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type InputFindDynamodb<T> = Omit<T, "TableName">;
export type ScanParam = InputFindDynamodb<DocumentClient.ScanInput>;
export type QueryParam = InputFindDynamodb<DocumentClient.QueryInput>;
export type GetParam = Omit<
	DocumentClient.GetItemInput & { prototype?: Record<any, any> },
	"Key" | "TableName"
>;
export type UpdateParam = Omit<
	DocumentClient.UpdateItemInput,
	"Key" | "TableName"
>;
