import {dir} from 'i18next';

import type {Metadata} from 'next';
import localFont from 'next/font/local';
import '../globals.css';
// import {languages} from '@/src/i18n/settings';

const geistSans = localFont({
	src: '../fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

// export async function generateStaticParams() {
// 	return languages.map(lng => ({lng}));
// }

export default function RootLayout({
	children,
	params: {lng},
}: Readonly<{
	children: React.ReactNode;
	params: {lng: string};
}>) {
	return (
		<html lang="en" dir={dir(lng)}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}