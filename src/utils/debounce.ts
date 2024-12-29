export const debounce = <T extends (...args: any[]) => void>(
	fn: T,
	delay: number
) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	const debouncedFunction = (...args: Parameters<T>): void => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, delay);
	};

	// You only use the cancel method if you want to completely abort
	// the debounced execution (e.g., when a component unmounts or
	// you want to reset the debounce mechanism).
	debouncedFunction.cancel = () => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return debouncedFunction;
};
