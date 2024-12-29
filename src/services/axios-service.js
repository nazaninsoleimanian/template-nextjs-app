import axios from 'axios';
import {Cookies} from 'react-cookie';
import {cookieOptions} from '@/utils/cookie';
import {ats_domain} from '../environement/env';

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	withCredentials: true, //send cookies type http only with requests
});

const httpAuth = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};

http.interceptors.request.use(
	res => res,
	err => Promise.reject(err)
);

http.interceptors.response.use(
	res => res,
	async err => {
		const cookies = new Cookies();
		const host =
			(typeof localStorage !== undefined &&
				localStorage.getItem('host')) ||
			ats_domain;
		const lng =
			(typeof localStorage !== undefined &&
				localStorage.getItem('i18nextLng')) ||
			'fa';

		const originalRequest = err.config;

		if (
			err.response &&
			err.response.status === 401 &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				})
					.then(token => {
						originalRequest.headers[
							'Authorization'
						] = `Bearer ${token}`;
						return http(originalRequest);
					})
					.catch(error => {
						return Promise.reject(error);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = cookies.get(
					'refresh_token',
					cookieOptions(host)
				);
				const response = await httpAuth.post(
					'/auth/token',
					{},
					{
						headers: {
							...(refreshToken
								? {
										Authorization: `Bearer ${refreshToken}`,
								  }
								: {}),
							'x-partnership-domain': host,
							'Accept-Language': lng,
						},
					}
				);

				if (response) {
					cookies.remove('access_token', cookieOptions(host));
					cookies.remove('refresh_token', cookieOptions(host));
					cookies.set(
						'access_token',
						response?.data?.data?.access_token,
						cookieOptions(host)
					);
					cookies.set(
						'refresh_token',
						response?.data?.data?.refresh_token,
						cookieOptions(host)
					);

					http.defaults.headers.common[
						'Authorization'
					] = `Bearer ${response?.data?.data?.access_token}`;
					originalRequest.headers[
						'Authorization'
					] = `Bearer ${response?.data?.data?.access_token}`;

					processQueue(null, response?.data?.data?.access_token);

					return http(originalRequest);
				}
			} catch (error) {
				processQueue(error, null);

				if (error.response && error.response.status === 401) {
					cookies.remove('access_token', cookieOptions(host));
					cookies.remove('refresh_token', cookieOptions(host));
					window.location.href = '/new-panel/fa/login';
				}
				return Promise.reject(error);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(err);
	}
);
