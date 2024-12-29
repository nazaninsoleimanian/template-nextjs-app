'use client';
import React from 'react';
import NextImage from '../imgs/NextImage';
import {cn} from '@/utils/clsx';
import {ArrowPathOutline} from '../svgs';

interface CaptchaProps {
	data?: {
		img: string;
	};
	isFetching: boolean;
	refetch: () => void;
	className?: string;
}
function Captcha({data, refetch, isFetching, className}: CaptchaProps) {
	const handleClick = async () => {
		refetch();
	};

	return (
		<div
			className={`w-full h-9 flex items-center rounded-md text-gray-600 border-none ring-1 ring-gray-200 overflow-hidden ${className}`}
		>
			<div
				className={cn(
					'flex items-center justify-center p-2 text-gray-300 text-xl cursor-pointer',
					isFetching && 'animate-spin'
				)}
				onClick={handleClick}
			>
				<ArrowPathOutline className="w-6 h-6" />
			</div>
			<div className="h-full w-[1px] bg-gray-200"></div>
			<NextImage
				useSkeleton={isFetching}
				className="relative w-full h-full flex justify-center bg-gray-100"
				classNames={{
					blur: 'blur-sm',
					image: 'object-contain bg-[#f1f2f3]',
				}}
				src={data?.img || ''}
				fill
				sizes="30vw"
				alt="captcha-code"
			/>
		</div>
	);
}

export default Captcha;
