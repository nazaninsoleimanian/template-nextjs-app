export const ROUTE_CONSTANTS_AUTH = {
	AUTH_LOGIN: (lng: any, returnPath?: string) => {
		return `/${lng}/login${
			returnPath && returnPath !== '/' ? `?returnpath=${returnPath}` : ''
		}`;
	},
	AUTH_REGISTER: (lng: any) => `/${lng}/register`,
	AUTH_RESET: (lng: any) => `/${lng}/reset`,
};
