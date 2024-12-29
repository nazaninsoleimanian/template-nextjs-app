import React from 'react';
import {ThreeDots} from 'react-loader-spinner';

type Props = {
	height?: string;
	width?: string;
	color?: string;
	visible?: boolean;
};
const TreeDotsLoading = ({
	height = '24',
	width = '24',
	color = '#fff',
	visible = false,
}: Props) => {
	return (
		<ThreeDots
			height={height}
			width={width}
			radius="9"
			color={color}
			ariaLabel="three-dots-loading"
			visible={visible}
		/>
	);
};

export default TreeDotsLoading;
