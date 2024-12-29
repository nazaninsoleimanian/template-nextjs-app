import type {Config} from 'tailwindcss';
import {fontFamily} from 'tailwindcss/defaultTheme';

function withOpacity(variableName: any): any {
	return ({opacityValue}: {opacityValue: any}) => {
		if (opacityValue !== undefined) {
			return `rgba(var(${variableName}), ${opacityValue})`;
		}
		return `rgb(var(${variableName}))`;
	};
}

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/common/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/routes/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: {
					950: withOpacity('--color-primary-950'),
					900: withOpacity('--color-primary-900'),
					800: withOpacity('--color-primary-800'),
					700: withOpacity('--color-primary-700'),
					600: withOpacity('--color-primary-600'),
					500: withOpacity('--color-primary-500'),
					400: withOpacity('--color-primary-400'),
					300: withOpacity('--color-primary-300'),
					200: withOpacity('--color-primary-200'),
					100: withOpacity('--color-primary-100'),
					50: withOpacity('--color-primary-50'),
				},
				gray: {
					950: withOpacity('--color-gray-950'),
					900: withOpacity('--color-gray-900'),
					800: withOpacity('--color-gray-800'),
					700: withOpacity('--color-gray-700'),
					600: withOpacity('--color-gray-600'),
					500: withOpacity('--color-gray-500'),
					400: withOpacity('--color-gray-400'),
					300: withOpacity('--color-gray-300'),
					200: withOpacity('--color-gray-200'),
					100: withOpacity('--color-gray-100'),
					50: withOpacity('--color-gray-50'),
				},
				orange: {
					950: withOpacity('--color-orange-950'),
					900: withOpacity('--color-orange-900'),
					800: withOpacity('--color-orange-800'),
					700: withOpacity('--color-orange-700'),
					600: withOpacity('--color-orange-600'),
					500: withOpacity('--color-orange-500'),
					400: withOpacity('--color-orange-400'),
					300: withOpacity('--color-orange-300'),
					200: withOpacity('--color-orange-200'),
					100: withOpacity('--color-orange-100'),
					50: withOpacity('--color-orange-50'),
				},
				success: withOpacity('--color-success'),
				warning: withOpacity('--color-warning'),
				error: withOpacity('--color-error'),
			},
			fontFamily: {
				sans: [...fontFamily.sans, 'var(--font-iransansx)'],
				iransansfanum: ['var(--font-iransansfanum)'],
				inter: ['var(--font-inter)'],
				vazir: ['var(--font-vazir)'],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					// sm: '2rem',
					// lg: '4rem',
					// xl: '5rem',
					// '2xl': '6rem',
				},
			},
			boxShadow: {},
			backgroundImage: {},
			keyframes: {
				shimmer: {
					'0%': {
						backgroundPosition: '-700px 0',
					},
					'100%': {
						backgroundPosition: '700px 0',
					},
				},
			},
			animation: {
				shimmer: 'shimmer 1.3s linear infinite',
			},
		},
	},
	plugins: [],
};
export default config;
