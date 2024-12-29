export default async function middlewareAuth(req: any, lng?: any) {
	const host = req.headers.get('host') || '';

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/current`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				...(req.cookies.get('access_token')
					? {
						Authorization: `Bearer ${req.cookies.get('access_token')?.value
							}`,
					}
					: {}),
				'x-partnership-domain': host,
				'Accept-Language': lng,
			},
		}
	);
	const data = await response.json();
	console.log('middlewareAuth data =============', data);

	return data;
}
