'use client';

import React, {forwardRef, ChangeEvent} from 'react';

interface CheckBoxProps {
	children?: React.ReactNode;
	type?: string;
	label?: string | JSX.Element;
	name: string;
	value?: string;
	checked?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	classNames?: {
		input?: string;
		label?: string;
	};
	disabled?: boolean;
	className?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
	const {
		label,
		name,
		value,
		checked,
		disabled,
		onChange,
		children,
		className,
		classNames,
	} = props;
	return (
		<label
			htmlFor={name}
			className={`flex gap-2 ${
				disabled ? 'cursor-auto' : 'cursor-pointer '
			} ${className}`}
		>
			<input
				type={'checkbox'}
				id={name}
				ref={ref}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				className={`checkbox__input ${classNames?.input}`}
			/>
			{label && (
				<span className={`text-sm font-normal ${classNames?.label}`}>
					{label}
				</span>
			)}
			{children}
		</label>
	);
});

export default CheckBox;
