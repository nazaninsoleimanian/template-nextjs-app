export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const urlRegExp = new RegExp(
	'^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$',
	'i'
);
export const urlWithHttpRegExp = new RegExp(
	/^(https?:\/\/)[\w\-]+(\.[\w\-]+)+([^\s]*)?$/
);
// export const phoneRegExp = /^(09)[0-9]{9}/;
export const phoneRegExp = /^\+?[0-9]\d{7,14}$/;
export const latinCharacters = /^[a-zA-Z0-9 ]+$/;

export const persianCharacters = /^[\u0600-\u06FF0-9 ]+$/;

export const dateFormatRegex =
	/^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4}.*$/;
