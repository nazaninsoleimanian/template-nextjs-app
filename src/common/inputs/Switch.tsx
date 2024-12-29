'use client';
import React from 'react';
import styled from 'styled-components';

type SizeType = {
	size?: 'lg' | 'md' | 'sm' | 'xs';
};

const Label = styled.label<SizeType>`
	position: relative;
	display: inline-block;
	height: ${({size}) => {
		switch (size) {
			case 'lg':
				return '26px';
			case 'md':
				return '24px';
			case 'sm':
				return '22px';
			case 'xs':
				return '20px';
			default:
				return '22px';
		}
	}};
	width: ${({size}) => {
		switch (size) {
			case 'lg':
				return '44px';
			case 'md':
				return '41px';
			case 'sm':
				return '38px';
			case 'xs':
				return '35px';
			default:
				return '38px';
		}
	}};
	input {
		opacity: 0;
		width: 0;
		height: 0;
	}
`;

// The slider
const Slider = styled.span<SizeType>`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: 0.4s;

	&:before {
		position: absolute;
		content: '';
		height: ${({size}) => {
			switch (size) {
				case 'lg':
					return '18px';
				case 'md':
					return '16px';
				case 'sm':
					return '14px';
				case 'xs':
					return '12px';
				default:
					return '14px';
			}
		}};
		width: ${({size}) => {
			switch (size) {
				case 'lg':
					return '18px';
				case 'md':
					return '16px';
				case 'sm':
					return '14px';
				case 'xs':
					return '12px';
				default:
					return '14px';
			}
		}};
		left: 4px;
		bottom: 4px;
		background-color: rgb(var(--color-gray-950));
		transition: 0.4s;
	}

	/* When input is checked */
	input:checked + & {
		background-color: rgb(var(--color-gray-950));
	}

	input:focus + & {
		box-shadow: 0 0 1px rgb(var(--color-gray-950));
	}

	input:checked + &:before {
		transform: ${({size}) => {
			switch (size) {
				case 'lg':
					return 'translateX(18px)';
				case 'md':
					return 'translateX(17px)';
				case 'sm':
					return 'translateX(16px)';
				case 'xs':
					return 'translateX(15px)';
				default:
					return 'translateX(16px)';
			}
		}};
		background-color: white;
	}

	/* Rounded sliders */
	&.round {
		border-radius: 34px;
	}

	&.round:before {
		border-radius: 50%;
	}
`;

interface PropsType {
	name: string;
	label: string | React.ReactElement;
	required?: boolean;
	disabled?: boolean;
	checked?: boolean;
	onChange: () => void;
	classNames?: {
		container?: string;
		label?: string;
		input?: string;
	};
}

const Switch = (props: PropsType & SizeType) => {
	const {
		label,
		name,
		classNames,
		required,
		disabled,
		checked,
		onChange,
		size,
	} = props;
	return (
		<div className={`${classNames?.container}`}>
			<div className={`text-sm ${classNames?.label}`}>
				{label} {required && <span className="text-gray-900">*</span>}
			</div>
			<Label id={name} size={size}>
				<input
					type="checkbox"
					name={name}
					onChange={onChange}
					checked={checked}
					{...(disabled ? {disabled} : {})}
				/>
				<Slider size={size} className="round" />
			</Label>
		</div>
	);
};

export default Switch;
