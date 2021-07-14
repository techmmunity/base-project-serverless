import { GraphQLModule } from "@nestjs/graphql";
import { join } from "node:path";

export const GRAPHQL_CONFIG = GraphQLModule.forRoot({
	autoSchemaFile: join(process.cwd(), "src/schema.gql"),
});
