import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = 'domain.ir';
	return [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.7,
		},
		// Add more URLs here
	];
}
