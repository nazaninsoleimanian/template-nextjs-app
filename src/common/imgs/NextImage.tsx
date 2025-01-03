import {cn} from '@/utils/clsx';
import Image, {ImageProps} from 'next/image';
import * as React from 'react';

type NextImageProps = {
	useSkeleton?: boolean;
	classNames?: {
		image?: string;
		blur?: string;
	};
	alt: string;
} & (
	| {width: string | number; height: string | number}
	| {fill: boolean; width?: string | number; height?: string | number}
) &
	ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
	useSkeleton = false,
	src,
	width,
	height,
	alt,
	className,
	classNames,
	...rest
}: NextImageProps) {
	const widthIsSet = className?.includes('w-') ?? false;

	return (
		<figure
			style={!widthIsSet ? {width: `${width}px`} : undefined}
			className={className}
		>
			<Image
				className={cn(
					classNames?.image,
					useSkeleton && cn('animate-pulse', classNames?.blur)
				)}
				src={src}
				width={width}
				height={height}
				alt={alt}
				// onLoad={({ target }) => {
				// 	const { naturalWidth, naturalHeight } = target as HTMLImageElement;
				// 	setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
				//   }}
				{...rest}
			/>
		</figure>
	);
}
