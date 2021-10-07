import { ApiProperty } from "@nestjs/swagger";

export class V1CreateExampleOutputSchema {
	@ApiProperty({
		description: "Example id",
		example: "id",
	})
	public id: string;

	@ApiProperty({
		description: "Example param",
		example: "example",
	})
	public thisIsAnParam: string;
}
