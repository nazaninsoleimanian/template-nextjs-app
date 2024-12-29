'use client';
import {useEffect, useState} from 'react';

const useLocation = () => {
	const [locatin, setLocation] = useState({
		href: '',
		origin: '',
		pathname: '',
		search: '',
	});

	useEffect(() => {
		if (typeof window !== undefined) {
			setLocation(window?.location);
		}
	}, []);

	return {
		...locatin,
	};
};

export default useLocation;
