import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = 'domain.ir';
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
