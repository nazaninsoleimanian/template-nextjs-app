import React from 'react';
// import NextImage from './NextImage';
import {cn} from '@/utils/clsx';

type Props = {
	src: string;
	isLoading?: boolean;
	className?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
};
const Avatar = (props: Props) => {
	const {
		src,
		//  isLoading = false,
		className = '',
		size = 'md',
	} = props;

	return (
		<div
			className={cn(
				'relative rounded-full overflow-hidden',
				[
					size === 'sm' && ['w-7 h-7'],
					size === 'md' && ['w-9 h-9'],
					size === 'lg' && ['w-12 h-12'],
					size === 'xl' && ['w-16 h-16'],
				],
				'shadow-md',
				className
			)}
		>
			<div className="relative h-full w-full">
				<img
					src={src}
					className={cn(
						'absolute inset-0 object-scale-down',
						[
							size === 'sm' && ['w-7 h-7'],
							size === 'md' && ['w-9 h-9'],
							size === 'lg' && ['w-12 h-12'],
							size === 'xl' && ['w-16 h-16'],
						],
						className
					)}
					alt="avatar"
				/>
			</div>
			{/* <NextImage
				className={`relative h-full w-full`}
				classNames={{image: 'object-scale-down'}}
				// src={src}
				src={
					'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=8'
				}
				fill
				sizes="30vw"
				alt="avatar"
			/> */}
		</div>
	);
};

export default Avatar;
