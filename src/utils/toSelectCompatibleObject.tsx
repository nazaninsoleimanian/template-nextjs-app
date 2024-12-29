export const toSelectCompatibleObject = (array: any[]) => {
	if (!array.length) return array;
	return array?.map(item => ({
		label: item.title,
		value: item.id.toString(),
		...item,
	}));
};
