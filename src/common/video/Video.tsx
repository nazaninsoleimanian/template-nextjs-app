import React from 'react';

type PropsType = {
	src: string;
	subtitle_src?: string;
	width: string | number;
	height: string | number;
	poster?: string;
	classNames?: {
		video?: string;
		source?: string;
		track?: string;
	};
};
const Video = (props: PropsType) => {
	const {src, subtitle_src, width, height, poster, classNames} = props;
	return (
		<video
			width={width}
			height={height}
			controls
			preload="none"
			poster={poster}
			className={classNames?.video}
		>
			<source src={src} type="video/mp4" className={classNames?.source} />
			{subtitle_src && (
				<track
					src={subtitle_src}
					// src="/path/to/captions.vtt"
					// kind="subtitles"
					// srcLang="en"
					// label="English"
				/>
			)}
			Your browser does not support the video tag.
		</video>
	);
};

export default Video;
