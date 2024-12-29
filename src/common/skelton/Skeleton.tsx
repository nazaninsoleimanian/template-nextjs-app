import React from 'react';
import {cn} from '@/utils/clsx';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'> & {
	bgColorSection?: 'gray' | 'white';
};
export default function Skeleton({
	bgColorSection = 'white',
	className,
	...rest
}: SkeletonProps) {
	if (bgColorSection === 'gray') {
		return (
			<div
				className={cn('animate-shimmer rounded-lg', className)}
				style={{
					backgroundColor: '#fefefe',
					backgroundImage:
						'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
					backgroundSize: '700px 100%',
					backgroundRepeat: 'no-repeat',
				}}
				{...rest}
			/>
		);
	}
	return (
		<div
			className={cn('animate-shimmer bg-[#f6f7f8] rounded-lg', className)}
			style={{
				backgroundImage:
					'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
				backgroundSize: '700px 100%',
				backgroundRepeat: 'no-repeat',
			}}
			{...rest}
		/>
	);
}
