import {headers} from 'next/headers';

const useHostServer = () => {
	const headerList = headers();
	const host = headerList.get('host');
	return host || 'kardix.net';
};

export default useHostServer;
