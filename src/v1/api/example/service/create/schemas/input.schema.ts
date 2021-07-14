import { InputType } from "@nestjs/graphql";

@InputType()
export class V1CreateExampleInputSchema {
	public thisIsAnParam: string;
}
