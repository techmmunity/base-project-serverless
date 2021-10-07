import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { proxy } from "aws-serverless-fastify";
import fastify, { FastifyInstance } from "fastify";

import { V1Module } from "./v1.module";

let cachedServer: FastifyInstance;

const bootstrap = async (): Promise<FastifyInstance> => {
	const instance: FastifyInstance = fastify();

	const nestApp = await NestFactory.create<NestFastifyApplication>(
		V1Module,
		new FastifyAdapter(instance as any),
	);

	nestApp.enableCors();

	await nestApp.init();

	return instance;
};

const isWarmUp = (event: any) => event.source === "serverless-plugin-warmup";

export const handler = async (
	event: any,
	context: any,
): Promise<any | void> => {
	if (isWarmUp(event)) {
		/**
		 * If it's an event to keep the lambda warm,
		 * return here to stop the lambda execution
		 * as soon as possible
		 */
		return;
	}

	if (!cachedServer) {
		// eslint-disable-next-line require-atomic-updates
		cachedServer = await bootstrap();
	}

	return proxy(cachedServer, event, context);
};
