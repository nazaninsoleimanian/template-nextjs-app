export const toJoinKeys = (...params: any) =>
	['key', ...params].filter(Boolean).join('-');
