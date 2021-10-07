import { ApiProperty } from "@nestjs/swagger";

export class V1CreateExampleInputSchema {
	@ApiProperty({
		description: "Example param",
		example: "example",
	})
	public thisIsAnParam: string;
}
