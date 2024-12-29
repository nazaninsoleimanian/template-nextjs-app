'use client';

import React, {forwardRef, ChangeEvent, FocusEvent, CSSProperties} from 'react';

interface TextFieldProps {
	children?: React.ReactNode;
	type?: string;
	label: string | React.ReactElement;
	name: string;
	value?: string;
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	styles?: CSSProperties;
	classNames?: {
		label?: string;
		input?: string;
		container?: string;
	};
	required?: boolean;
	disabled?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
	const {
		type = 'text',
		label,
		name,
		value,
		placeholder,
		onChange,
		onFocus,
		onBlur,
		styles,
		classNames,
		required,
		disabled = false,
		children,
	} = props;
	const styleObj: CSSProperties | undefined = styles ? styles : undefined;
	return (
		<div className={`${classNames?.container}`}>
			<label
				htmlFor={name}
				className={`text-sm block mb-2 whitespace-nowrap ${classNames?.label}`}
			>
				{label} {required && <span className="text-gray-900">*</span>}
			</label>
			<input
				type={type}
				id={name}
				ref={ref}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				disabled={disabled}
				style={styleObj}
				className={`textField__input ${classNames?.input}`}
			/>
			{children}
		</div>
	);
});
TextField.displayName = 'TextField';
export default TextField;
