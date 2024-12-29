const url_pattern = new RegExp(
	'^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
	'i'
);

export const validUrl = (url: string | '' = '') => !!url_pattern.test(url);

export const getCurrentPathname = (lng: any, pathname: any) =>
	pathname.replace(`/${lng}`, '');
