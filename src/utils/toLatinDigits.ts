export const toLatinDigits = (persianStr: string): string => {
	const persianToLatinMap: {[key: string]: string} = {
		'۰': '0',
		'۱': '1',
		'۲': '2',
		'۳': '3',
		'۴': '4',
		'۵': '5',
		'۶': '6',
		'۷': '7',
		'۸': '8',
		'۹': '9',
	};

	return persianStr.replace(
		/[۰-۹]/g,
		(char: string) => persianToLatinMap[char]
	);
};
