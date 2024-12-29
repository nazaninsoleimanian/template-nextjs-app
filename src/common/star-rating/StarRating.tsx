'use client';
import React, {useEffect, useState} from 'react';
import {StarIcon as StarSolid} from '@heroicons/react/24/solid';
import {StarIcon as StarOutline} from '@heroicons/react/24/outline';

type StarRatingProps = {
	rate?: number;
	readOnly?: boolean;
	totalStars?: number;
	onRatingChange?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
	rate = 0,
	readOnly = false,
	totalStars = 5,
	onRatingChange,
}) => {
	const [rating, setRating] = useState(0);

	useEffect(() => {
		setRating(rate);
	}, []);

	const handleRating = (rate: number) => {
		if (!readOnly) {
			setRating(rate);
			if (onRatingChange) {
				onRatingChange(rate);
			}
		}
	};

	return (
		<div className="flex space-x-1">
			{Array.from({length: totalStars}, (_, index) => (
				<button
					key={index}
					type="button"
					onClick={() => handleRating(index + 1)}
					className={`focus:outline-none ${
						readOnly && 'cursor-default'
					}`}
				>
					{index < rating ? (
						<StarSolid className="size-5 text-yellow-500" />
					) : (
						<StarOutline className="size-5 text-gray-400" />
					)}
				</button>
			))}
		</div>
	);
};

export default StarRating;
