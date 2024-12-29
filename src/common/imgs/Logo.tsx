import React from 'react';
// import NextImage from './NextImage';
import Skeleton from '../skelton/Skeleton';
import {cn} from '@/utils/clsx';

interface PropsType {
	data: {data: {logo: string}} | undefined;
	width: string;
	height: string;
}
const Logo = ({data, width, height}: PropsType) => {
	return (
		<>
			{data ? (
				<figure
					style={!width ? {width: `${width}px`} : undefined}
					className={`relative ${width} ${height}`}
				>
					<img
						src={data?.data?.logo}
						alt="company-logo"
						className={cn(
							'object-contain',
							'absolute w-full h-full'
						)}
					/>
				</figure>
			) : (
				// <NextImage
				// 	className={`relative ${width} ${height}`}
				// 	classNames={{image: 'object-contain'}}
				// 	src={data?.data?.logo}
				// 	fill
				// 	sizes="30vw"
				// 	alt="company-logo"
				// 	priority
				// />
				<Skeleton className={`${width} ${height}`} />
			)}
		</>
	);
};

export default Logo;
