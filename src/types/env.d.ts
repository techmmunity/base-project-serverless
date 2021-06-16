/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "homolog" | "production" | "test";
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_HOST: string;
			POSTGRES_DATABSE: string;
		}
	}
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
