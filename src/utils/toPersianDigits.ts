export const toPersianDigits = (num: number | string): string => {
	const persianDigits: string[] = [
		'۰',
		'۱',
		'۲',
		'۳',
		'۴',
		'۵',
		'۶',
		'۷',
		'۸',
		'۹',
	];

	return String(num).replace(
		/\d/g,
		(digit: string) => persianDigits[parseInt(digit)]
	);
};
