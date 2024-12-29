import React, {ReactNode} from 'react';
import NextImage from '../imgs/NextImage';

type PropsType = {
	title: string;
	children?: ReactNode;
	classNames?: {
		container?: string;
	};
};
const NothingFound = ({title, children, classNames}: PropsType) => {
	return (
		<div
			className={`w-full h-full flex justify-center items-center ${classNames?.container}`}
		>
			<div className="flex flex-col items-center gap-3">
				<NextImage
					width={76}
					height={76}
					src="/new-panel/images/nothing_found.svg"
					alt="nothing found"
				/>
				<span className="text-sm font-medium text-gray-400">
					{title}
				</span>
				{children}
			</div>
		</div>
	);
};

export default NothingFound;
