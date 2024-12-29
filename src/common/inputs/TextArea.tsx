'use client';

import React, {forwardRef, CSSProperties} from 'react';

interface TextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string | React.ReactElement;
	name: string;
	value?: string;
	placeholder?: string;
	styles?: CSSProperties;
	classNames?: {
		label?: string;
		input?: string;
	};
	required?: boolean;
	disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, ref) => {
		const {
			label,
			name,
			value,
			placeholder,
			styles,
			classNames = {label: '', input: ''},
			required,
			disabled,
			...otherProps
		} = props;
		const styleObj: CSSProperties | undefined = styles ? styles : undefined;
		return (
			<div className="w-full h-full flex flex-col">
				<label
					htmlFor={name}
					className={`text-sm block mb-2 whitespace-nowrap ${classNames?.label}`}
				>
					{label}{' '}
					{required && <span className="text-gray-900">*</span>}
				</label>
				<textarea
					id={name}
					ref={ref}
					name={name}
					value={value}
					placeholder={placeholder}
					disabled={disabled}
					style={styleObj}
					className={`textField__input ${classNames?.input}`}
					{...otherProps}
				/>
			</div>
		);
	}
);
TextArea.displayName = 'TextArea';
export default TextArea;
