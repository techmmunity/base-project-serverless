import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { APIGatewayProxyHandler } from "aws-lambda";
import * as awsServerlessExpress from "aws-serverless-express";
import * as express from "express";
import { Server } from "http";

import { AppModule } from "./app.module";

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
	const expressApp = express();

	const adapter = new ExpressAdapter(expressApp);

	const app = await NestFactory.create(AppModule, adapter);

	await app.init();

	return awsServerlessExpress.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
	if (!cachedServer) {
		// eslint-disable-next-line require-atomic-updates
		cachedServer = await bootstrapServer();
	}

	const { promise } = awsServerlessExpress.proxy(
		cachedServer,
		event,
		context,
		"PROMISE",
	);

	return promise;
};
