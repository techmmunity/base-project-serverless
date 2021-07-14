import { V1CreateExampleInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

interface Injectables {
	thisIsAnInjectable: string;
}

export const create = async (
	{ thisIsAnInjectable }: Injectables,
	params: V1CreateExampleInputSchema,
) => {
	const { thisIsAnParam } = await validate(params);

	return {
		thisIsAnInjectable,
		thisIsAnParam,
	};
};
