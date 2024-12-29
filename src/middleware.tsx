import {NextResponse, type NextRequest} from 'next/server';
import acceptLanguage from 'accept-language';
import {fallbackLng, languages, cookieName} from './i18n/settings';

acceptLanguage.languages(languages);

export async function middleware(req: NextRequest) {
	const url = req.url;
	const host = req.headers.get('host') || '';
	const pathname = req.nextUrl.pathname;
	const query = req.nextUrl.search;

	const requestHeaders = new Headers(req.headers);
	requestHeaders.set('x-url', url);
	requestHeaders.set('x-pathname', pathname);
	requestHeaders.set('x-host', host);

	let lng: string | undefined | null = fallbackLng;

	// Check for language in cookies or Accept-Language header
	if (req.cookies.has(cookieName)) {
		lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
	}
	if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	if (!lng) lng = fallbackLng;

	// Handle default language (fa) without prefix
	if (pathname === '/') {
		// Set the language cookie to the default language and continue
		const response = NextResponse.rewrite(
			new URL(`/${fallbackLng}`, req.url)
		);
		response.cookies.set(cookieName, fallbackLng);
		return response;
	}

	// Redirect if accessing the default language explicitly (e.g., /fa -> /)
	if (pathname === `/${fallbackLng}`) {
		return NextResponse.redirect(new URL(`/`, url));
	}

	// Redirect if the URL doesn't start with a valid language and isn't a special path
	if (
		!languages.some(loc => pathname.startsWith(`/${loc}`)) &&
		!pathname.startsWith('/_next') &&
		!pathname.startsWith('/images') &&
		!pathname.startsWith('/customersFavicons')
	) {
		return NextResponse.redirect(new URL(`/${lng}${pathname}`, url));
	}

	// Handle referer language detection and set the cookie
	if (req.headers.has('referer')) {
		const refererUrl = new URL(req.headers.get('referer') || '');
		const lngInReferer = languages.find(l =>
			refererUrl.pathname.startsWith(`/${l}`)
		);
		const response = NextResponse.next({
			request: {
				headers: requestHeaders,
			},
		});
		if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
		return response;
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)', {source: '/'}],
};
