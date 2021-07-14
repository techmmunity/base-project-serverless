import { InputType } from "@nestjs/graphql";

@InputType()
export class V1CreateExampleOutputSchema {
	public thisIsAnInjectable: string;

	public thisIsAnParam: string;
}
