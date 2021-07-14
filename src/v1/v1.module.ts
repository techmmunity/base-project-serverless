import { Module } from "@nestjs/common";

import { API } from "./api";

import { DYNAMO_CONFIG } from "./config/dynamo";
import { GRAPHQL_CONFIG } from "./config/graphql";

@Module({
	imports: [GRAPHQL_CONFIG, DYNAMO_CONFIG, ...API],
})
export class V1Module {}
