import localFont from 'next/font/local';
import {Inter} from 'next/font/google';
export const vazir = localFont({
	variable: '--font-vazir',
	display: 'swap',
	src: [
		{
			path: './vazir/woff2/thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: './vazir/woff2/light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: './vazir/woff2/regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: './vazir/woff2/medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: './vazir/woff2/bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: './vazir/woff2/black.woff2',
			weight: '900',
			style: 'normal',
		},
	],
});

export const inter = Inter({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});
