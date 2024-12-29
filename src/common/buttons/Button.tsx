'use client';

import React, {
	forwardRef,
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
} from 'react';
import Link from 'next/link';
import {cn} from '@/utils/clsx';
import {validUrl} from '@/utils/url';
import Render from '../render/Render';
import ColorRingLoading from '../loadings/ColorRingLoading';

interface BaseButtonProps {
	block?: boolean;
	variant?:
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'outline-primary'
		| 'outline-secondary'
		| 'outline-tertiary'
		| 'link-primary'
		| 'warning'
		| 'special-primary'
		| 'outline-primary-dashed'
		| 'danger'
		| 'outline-danger';
	size?: 'xs' | 'sm' | 'md' | 'lg';
	isLoading?: boolean;
	inverse?: boolean;
	icon?: React.ReactNode;
	className?: string;
	iconClassName?: string;
	href?: string;
}

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.ForwardRefRenderFunction<
	HTMLButtonElement | HTMLAnchorElement,
	ButtonProps | LinkProps
> = (props, ref) => {
	const {
		block,
		variant = 'primary',
		size = 'lg',
		isLoading = false,
		inverse,
		icon,
		rel,
		children,
		className,
		iconClassName,
		...otherProps
	} = props;
	const ButtonElement = otherProps.href ? 'a' : 'button';

	const classes = cn(
		block && 'w-full',
		inverse ? 'flex-row-reverse' : 'flex-row',
		'flex items-center justify-center gap-[2px] rounded-3xl font-semibold whitespace-nowrap',
		'transition-colors duration-300',
		[
			size === 'lg' && ['px-4 py-2', 'text-base @3xl:text-lg'],
			size === 'md' && ['px-3 py-1.5', 'text-md @3xl:text-md'],
			size === 'sm' && ['px-3 py-1', 'text-xs @3xl:text-sm'],
			size === 'xs' && ['px-3', 'text-xs @3xl:text-sm'],
		],
		[
			variant === 'primary' && [
				'border border-primary-500',
				'bg-primary-500 text-white',
				'hover:bg-primary-600',
				'active:bg-primary-500',
				'disabled:bg-gray-200 disabled:border disabled:border-gray-300',
			],
			variant === 'secondary' && [
				'border border-gray-950',
				'bg-gray-950 text-white',
				'hover:bg-gray-900',
				'active:bg-gray-950',
				'disabled:bg-gray-200 disabled:border disabled:border-gray-300',
			],
			variant === 'tertiary' && [
				'font-medium border border-primary-800',
				'bg-primary-800 text-white',
				'hover:bg-primary-900',
				'active:bg-primary-900',
				'disabled:bg-primary-200 disabled:border disabled:border-primary-200',
			],
			variant === 'outline-primary' && [
				'text-primary-500',
				'ring-primary-500 ring-1',
				'hover:bg-primary-50 hover:ring-primary-600 hover:text-primary-600',
				'active:bg-primary-100',
				'disabled:bg-primary-100 disabled:text-primary-500',
				'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
			],
			variant === 'outline-secondary' && [
				'text-gray-950 font-medium ring-transparent',
				'border-gray-950 border border-[1px]',
				'hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900',
				'active:bg-gray-50',
				'disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-300',
				'focus-visible:border-gray-500 focus:outline-none focus-visible:border',
			],
			variant === 'outline-tertiary' && [
				'bg-white font-medium text-primary-800 ring-transparent',
				'border-primary-800 border border-[1px]',
				'hover:bg-primary-50 hover:border-primary-900 hover:text-primary-900',
				'active:bg-primary-50',
				'disabled:bg-primary-50 disabled:text-primary-300 disabled:border-primary-300',
				'focus-visible:border-primary-500 focus:outline-none focus-visible:border',
			],
			variant === 'link-primary' && [
				'text-primary-500',
				'hover:text-primary-600',
				'active:text-primary-600',
				'disabled:text-gray-300',
				'focus-visible:border-primary-100 focus:outline-none focus-visible:border',
			],
			variant === 'special-primary' && [
				'text-white bg-gradient-to-r from-red-600 to-orange-500',
				'hover:opacity-90',
				'active:from-red-700 active:to-orange-500',
				'disabled:opacity-80',
			],
			variant === 'outline-primary-dashed' && [
				'text-primary-500',
				'!border border-1 border-dashed border-primary-500',
				'hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600',
				'active:bg-primary-100',
				'disabled:bg-primary-100 disabled:text-primary-500',
				'focus-visible:border-primary-500 focus:outline-none focus-visible:border',
			],
			variant === 'warning' && [
				'text-red-600',
				'!border border-1 border-dashed border-red-600',
				'hover:bg-red-50 hover:border-red-500 hover:text-red-500',
				'active:bg-red-100',
				'disabled:bg-red-100 disabled:text-red-600',
				'focus-visible:border-red-500 focus:outline-none focus-visible:border',
			],
			variant === 'danger' && [
				'text-white',
				'!border border-1 border-red-600 bg-red-600',
				'hover:bg-red-700',
				'active:bg-red-700',
				'disabled:bg-red-400 disabled:border-red-400',
				'focus-visible:border-red-500 focus:outline-none focus-visible:border',
			],
			variant === 'outline-danger' && [
				'text-red-600',
				'border border-red-600 border-[1px]',
				'hover:bg-red-50 hover:border-red-700 hover:text-red-700',
				'active:bg-red-100',
				'disabled:bg-red-100 disabled:text-red-400 disabled:border-red-400',
				'focus-visible:border-red-700 focus:outline-none focus-visible:border',
			],
		],
		'disabled:cursor-not-allowed',
		!!isLoading && 'relative transition-none disabled:cursor-wait',
		className
	);
	const iconColor = cn([
		variant === 'primary' && ['text-white group-hover:text-white'],
		variant === 'secondary' && ['text-white group-hover:text-white'],
		variant === 'tertiary' && ['text-white group-hover:text-white'],
		variant === 'danger' && ['text-white group-hover:text-white'],
		variant === 'outline-danger' && [
			'text-red-600 group-hover:text-red-700',
		],
		variant === 'outline-primary' && [
			'text-primary-500 group-hover:text-primary-600',
		],
		variant === 'outline-secondary' && [
			'text-primary-500 group-hover:text-primary-600',
		],
		variant === 'outline-tertiary' && [
			'text-primary-800 group-hover:text-primary-900',
		],
		variant === 'link-primary' && [
			'text-primary-500 group-hover:text-primary-600',
		],
		variant === 'special-primary' && ['text-white group-hover:text-white'],
	]);
	const content = (
		<>
			<Render
				condition={!!icon && !isLoading}
				render={() => (
					<span className={`${iconColor} ${iconClassName}`}>
						{icon}
					</span>
				)}
			/>
			<ColorRingLoading
				visible={!!isLoading}
				color={iconColor}
				height={cn([
					size === 'lg' && ['24'],
					size === 'md' && ['20'],
					size === 'sm' && ['20'],
					size === 'xs' && ['14'],
				])}
				width={cn([
					size === 'lg' && ['24'],
					size === 'md' && ['20'],
					size === 'sm' && ['18'],
					size === 'xs' && ['14'],
				])}
			/>
			{children}
		</>
	);

	if (ButtonElement === 'a') {
		const {href, ...anchorProps} = otherProps as LinkProps;
		if (validUrl(href)) {
			return (
				<a
					{...anchorProps}
					ref={ref as React.MutableRefObject<HTMLAnchorElement>}
					href={href}
					rel={rel || 'noopener noreferrer'}
					className={cn(classes, 'group')}
				>
					{content}
				</a>
			);
		}

		return (
			<Link href={href as string} legacyBehavior>
				<ButtonElement
					{...anchorProps}
					ref={ref as React.Ref<HTMLAnchorElement>}
					className={cn(classes, 'group')}
				>
					{content}
				</ButtonElement>
			</Link>
		);
	}

	const {...buttonProps} = otherProps as ButtonProps;
	return (
		<ButtonElement
			{...buttonProps}
			ref={ref as React.Ref<HTMLButtonElement>}
			className={cn(classes, 'group')}
		>
			{content}
		</ButtonElement>
	);
};

export default forwardRef(Button);
