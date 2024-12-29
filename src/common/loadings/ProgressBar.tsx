import React from 'react';

type ProgressBarProps = {
	progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({progress = 0}) => {
	return (
		<div className="w-full bg-gray-100 rounded-full h-4 mt-4 flex justify-end">
			<div
				className="bg-gray-300 h-4 rounded-full"
				style={{width: `${progress}%`}}
			></div>
		</div>
	);
};

export default ProgressBar;
