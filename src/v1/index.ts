import { getHandlerPath } from "../helpers/get-handler-path";

export const v1 = {
	handler: `${getHandlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				cors: true,
				method: "post",
				path: "/",
			},
		},
		{
			http: {
				cors: true,
				method: "post",
				path: "{proxy+}",
			},
		},
	],
};
