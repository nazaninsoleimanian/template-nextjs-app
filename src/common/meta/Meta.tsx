interface Props {
	host: string;
	title?: string;
	favicon?: string;
	description?: string;
	author?: string;
	image?: string;
	keyword?: string;
	asPath?: string;
}

const Meta = ({
	// host = '',
	title = '',
	favicon = '',
	description = ``,
}: // image: outsideImage = 'https://ahmedibra.com/logo.png',
// asPath = '/',
// author = '',
// keyword = '',
Props) => {
	// const url = `https://${host}${asPath}`;
	// const image = outsideImage
	// 	? `https://ahmedibra.com${outsideImage}`
	// 	: `https://ahmedibra.com/logo.png`;

	return {
		// host: host ? host : host,
		title: title ? title : title,
		description: description ? description : description,
		icons: {
			icon: [favicon],
			// apple: ['/apple-touch-icon.png?v=4'],
			// shortcut: ['/apple-touch-icon.png'],
		},
		// image: image,

		// metadataBase: new URL(`https://${host}/new-panel`),
		// alternates: {
		// 	canonical: url,
		// 	languages: {
		// 		'en-US': '/en',
		// 		'fa-IR': '/fa',
		// 	},
		// },
		// openGraph: {
		// 	type: 'website',
		// 	// images: image,
		// 	title: title ? title : title,
		// 	description: description ? description : description,
		// },
		// keywords: [`${keyword}`],
		// authors: [
		// 	{
		// 		name: author ? author : author,
		// 		url: `https://${host}/new-panel`,
		// 	},
		// ],
		// publisher: author ? author : author,
		// robots: {
		// 	index: true,
		// 	follow: true,
		// 	nocache: false,
		// 	googleBot: {
		// 		index: true,
		// 		follow: true,
		// 		noimageindex: false,
		// 		'max-video-preview': -1,
		// 		'max-image-preview': 'large',
		// 		'max-snippet': -1,
		// 	},
		// },

		// 	manifest: '/site.webmanifest',
		// 	twitter: {
		// 		card: 'summary_large_image',
		// 		title: title ? title : title,
		// 		description: description ? description : description,
		// 		// siteId: '1467726470533754880',
		// 		// creatorId: '1467726470533754880',
		// 		creator: `@${author ? author : author}`,
		// 		images: {
		// 			// url: image,
		// 			alt: title ? title : title,
		// 		},
		// 		app: {
		// 			name: 'twitter_app',
		// 			id: {
		// 				iphone: 'twitter_app://iphone',
		// 				ipad: 'twitter_app://ipad',
		// 				googleplay: 'twitter_app://googleplay',
		// 			},
		// 			url: {
		// 				// iphone: image,
		// 				// ipad: image,
		// 			},
		// 		},
		// 	},
		// 	appleWebApp: {
		// 		title: title ? title : title,
		// 		statusBarStyle: 'black-translucent',
		// 		startupImage: [
		// 			'/logo.png',
		// 			{
		// 				url: '/logo.png',
		// 				media: '(device-width: 768px) and (device-height: 1024px)',
		// 			},
		// 		],
		// 	},
		// 	verification: {
		// 		google: 'google',
		// 		yandex: 'yandex',
		// 		yahoo: 'yahoo',
		// 		other: {
		// 			// me: ['info@ahmedibra.com', `http://${host}/new-panel`],
		// 		},
		// 	},
	};
};
export default Meta;
