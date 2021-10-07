import { NestFactory } from "@nestjs/core";
import fastify, { FastifyInstance } from "fastify";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { proxy } from "aws-serverless-fastify";

import { setSwagger } from "helpers/set-swagger";
import { API_VERSION } from "./config";

let cachedServer: FastifyInstance;

const bootstrap = async (): Promise<FastifyInstance> => {
	const instance: FastifyInstance = fastify();

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { V1Module } = await import("./v1.module");

	const nestApp = await NestFactory.create<NestFastifyApplication>(
		V1Module,
		new FastifyAdapter(instance as any),
	);

	nestApp.enableCors();

	setSwagger({
		app: nestApp,
		title: "Base Project Serverlerss",
		description: "",
		version: API_VERSION,
	});

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
