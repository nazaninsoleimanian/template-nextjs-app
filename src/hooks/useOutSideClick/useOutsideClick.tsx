import {useEffect, useRef} from 'react';

export default function useOutsideClick<T extends HTMLElement>(
	handler: () => void,
	listenCapturing = true
) {
	const ref = useRef<T>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent | TouchEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				handler();
			}
		}

		document.addEventListener('click', handleClick, listenCapturing);
		document.addEventListener('touchstart', handleClick, listenCapturing);

		return () => {
			document.removeEventListener('click', handleClick, listenCapturing);
			document.removeEventListener(
				'touchstart',
				handleClick,
				listenCapturing
			);
		};
	}, [handler, listenCapturing]);

	return ref;
}
