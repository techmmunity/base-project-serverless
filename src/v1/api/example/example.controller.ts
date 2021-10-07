/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { ExampleService } from "./example.service";
import { V1CreateExampleInputSchema } from "./service/create/schemas/input.schema";
import { API_VERSION } from "v1/config";
// import { LazyModuleLoader } from "@nestjs/core";
// import { App2Service } from "@app/module2/app2.service";
// import { AppService } from "./app.service";
// import { App2Module } from "@app/module2/app2.module";

@ApiTags(`${API_VERSION} - Example`)
@Controller(`${API_VERSION}/example`)
export class AppController {
	// private app2Service: App2Service;

	public constructor(
		private readonly exampleService: ExampleService, // private readonly lazyLoadModuler: LazyModuleLoader,
	) {}

	@Post()
	@ApiCreatedResponse({
		type: V1CreateExampleInputSchema,
	})
	public create(@Body() data: any) {
		return this.exampleService.create(data);
	}

	// @Post("/lazy-module")
	// public async getHello2(): Promise<string> {
	// 	if (!this.app2Service) {
	// 		const context = await this.lazyLoadModuler.load(() => App2Module);
	// 		this.app2Service = context.get(App2Service);
	// 	}

	// 	return this.app2Service.getHello();
	// }
}
