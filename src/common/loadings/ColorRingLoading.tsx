import React from 'react';
import {ColorRing} from 'react-loader-spinner';

type Props = {
	height?: string;
	width?: string;
	color?: string;
	visible?: boolean;
};
const ColorRingLoading = ({
	height = '24',
	width = '24',
	color = '#fff',
	visible = false,
}: Props) => {
	return (
		<ColorRing
			height={height}
			width={width}
			colors={[color, color, color, color, color]}
			ariaLabel="color-ring-loading"
			wrapperClass="color-ring-wrapper"
			visible={visible}
		/>
	);
};

export default ColorRingLoading;
