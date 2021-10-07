import { Module } from "@nestjs/common";

import { API } from "./api";

import { MONGO_DB_CONNECT } from "./config/mongodb";

@Module({
	imports: [MONGO_DB_CONNECT, ...API],
})
export class V1Module {}
