'use client';

import React, {forwardRef, AnchorHTMLAttributes} from 'react';
import Link from 'next/link';
import {cn} from '@/utils/clsx';
import {validUrl} from '@/utils/url';
import Render from '../render/Render';

interface BaseLinkProps {
	href?: string;
	variant?: 'primary' | 'secondary' | 'white';
	block?: boolean;
	inverse?: boolean;
	icon?: React.ReactNode;
	className?: string;
}

type LinkProps = BaseLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const NextLink: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (
	props,
	ref
) => {
	const {
		href,
		variant = 'primary',
		block,
		inverse,
		icon,
		rel,
		children,
		className,
		...otherProps
	} = props;

	const classes = cn(
		'font-semibold text-sm',
		[
			variant === 'primary' && [
				'text-primary-500',
				'hover:font-bold hover:text-primary-400',
				'active:font-bold',
			],
			variant === 'white' && [
				'text-white',
				'hover:font-bold',
				'active:font-bold',
			],
			variant === 'secondary' && [
				'text-gray-950',
				'hover:font-bold hover:text-gray-800',
				'active:font-bold',
			],
		],
		block && 'w-full',
		inverse ? 'flex-row-reverse' : 'flex-row',
		className
	);
	const content = (
		<>
			<Render
				condition={!!icon}
				render={() => <span className="mr-2">{icon}</span>}
			/>
			{children}
		</>
	);

	if (validUrl(href)) {
		return (
			<a
				{...otherProps}
				ref={ref as React.MutableRefObject<HTMLAnchorElement>}
				href={href}
				rel={rel || 'noopener noreferrer'}
				className={classes}
			>
				{content}
			</a>
		);
	}

	return (
		<Link
			{...otherProps}
			href={href as string}
			ref={ref as React.Ref<HTMLAnchorElement>}
			className={classes}
		>
			{content}
		</Link>
	);
};

export default forwardRef(NextLink);
