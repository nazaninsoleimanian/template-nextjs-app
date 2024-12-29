interface itemType {
	name?: string;
	value?: string;
}
export const toStringCookies = (cookies: any) => {
	let strCookie = '';
	cookies.getAll().forEach((item: itemType) => {
		strCookie += `${item?.name}=${item?.value}; `;
	});
	return strCookie;
};

export const createCookieString = (cookiesObject: {[key: string]: string}) => {
	return Object.keys(cookiesObject)
		.map(cookieName => `${cookieName}=${cookiesObject[cookieName]}`)
		.join('; '); // Separate cookies with semicolon and space
};
