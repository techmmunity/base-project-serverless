import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

interface SetSwaggerParams {
	app: INestApplication;
	title: string;
	description: string;
	version: string;
}

export const setSwagger = ({
	app,
	title,
	description,
	version,
}: SetSwaggerParams) => {
	const config = new DocumentBuilder()
		.setTitle(title)
		.setDescription(description)
		.setVersion(version)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`${version}/swagger`, app, document);
};
