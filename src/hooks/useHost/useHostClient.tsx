'use client';
import {useEffect, useState} from 'react';

const useHostClient = () => {
	const [host, setHost] = useState('');

	useEffect(() => {
		if (typeof window !== undefined) {
			setHost(window?.location?.host);
		}
	}, []);
	return host;
};

export default useHostClient;
