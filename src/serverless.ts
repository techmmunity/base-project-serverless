import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import {
	Context,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from "aws-lambda";
import { proxy } from "aws-serverless-fastify";
import fastify, { FastifyInstance } from "fastify";

import { AppModule } from "./app.module";

let cachedServer: FastifyInstance;

const bootstrap = async (): Promise<FastifyInstance> => {
	const instance: FastifyInstance = fastify({
		logger: true,
	});

	const nestApp = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(instance),
	);

	nestApp.enableCors();

	await nestApp.init();

	return instance;
};

export const handler = async (
	event: APIGatewayProxyEvent,
	context: Context,
): Promise<APIGatewayProxyResult> => {
	if (!cachedServer) {
		// eslint-disable-next-line require-atomic-updates
		cachedServer = await bootstrap();
	}

	return proxy(cachedServer, event, context);
};
