import React from 'react';

type Props = {
	steps: {label: string; optional: string; onClick: () => void}[];
	currentStep: number;
	disabled?: boolean;
	className?: string;
};

const Stepper = ({currentStep, steps, disabled, className}: Props) => {
	return (
		<div
			className={`flex flex-1 justify-end items-start mb-4 ${className}`}
		>
			{steps.map((step, index) => (
				<div
					key={index}
					className={`flex  ${
						index !== steps.length - 1 && 'flex-1'
					} flex-col`}
				>
					<div
						key={index}
						className="flex flex-1 w-full items-center"
					>
						<div
							onClick={step.onClick}
							className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold ${
								!disabled && 'cursor-pointer'
							} ${
								index < currentStep
									? 'bg-white text-primary-800 border-primary-800'
									: index === currentStep
									? 'bg-primary-800 text-white border-primary-800'
									: 'bg-gray-200 text-gray-900 border-gray-200'
							}`}
						>
							{index + 1}
						</div>
						{index !== steps.length - 1 && (
							<hr
								className={`flex-1 h-1 ${
									index < currentStep
										? 'bg-primary-800'
										: index === currentStep
										? 'border-t-2 border-dashed border-primary-800'
										: 'border-t-2 border-dashed border-gray-300'
								}`}
							/>
						)}
					</div>
					<div className="relative">
						<div
							className={`absolute -top-1 ${
								index === steps.length - 1
									? '-start-2'
									: 'rtl:-start-4 ltr:-start-6'
							} ${index === 2 && 'ltr:-start-10'} ${
								index === 1 && 'ltr:-start-8'
							} flex flex-col items-center`}
						>
							<span className="hidden @3xl:inline-block mt-2 text-xs">
								{step.label}
							</span>
							<span className="hidden @3xl:inline-block text-xs text-gray-500">
								{step.optional}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Stepper;
