'use client';
import React, {ReactNode} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import {useTranslation} from 'react-i18next';

interface FormControlProps {
	keyName: string;
	fields: {};
	errors:
		| any
		| {}
		| {
				[key: string]: {
					message: string | undefined;
				};
		  };
	children: ReactNode;
	className?: string;
}

const FormControl: React.FC<FormControlProps> = ({
	keyName,
	errors,
	fields,
	children,
	className,
}: FormControlProps) => {
	const {t} = useTranslation();

	const getErrorMessage = (key: any, fieldObject: {}) => {
		return t(key, fields);
	};

	return (
		<div className={`form_control ${className}`}>
			{children}
			<ErrorMessage
				errors={errors}
				name={keyName}
				render={() => (
					<p className="validation_message validation_message__error">
						{t(errors[keyName].message, fields)}
					</p>
				)}
			/>
		</div>
	);
};

export default FormControl;
