'use client';
import React from 'react';
import DatePicker, {
	DatePickerProps,
	CalendarProps,
} from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import {Controller} from 'react-hook-form';
import {useParams} from 'next/navigation';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

type Props = DatePickerProps &
	CalendarProps & {
		label: string | React.ReactElement;
		name: string;
		placeholder?: string;
		classNames?: {
			container?: string;
			label?: string;
			input?: string;
		};
		defaultValue?: string;
		required?: boolean;
		disable?: boolean;
		control: any;
	};
const DatePickerRHF = (props: Props) => {
	const {lng} = useParams();
	const {
		label,
		name,
		placeholder,
		defaultValue,
		required,
		disable,
		control,
		classNames,
		...otherProps
	} = props;

	const persianWeekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

	const inputId = `${name}-input-${label}`;
	return (
		<div className={`w-full ${classNames?.container}`}>
			<label
				htmlFor={inputId}
				className="text-sm block mb-2 whitespace-nowrap"
			>
				{label} {required && <span className="text-gray-900">*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				render={({field: {onChange, name, value}}) => (
					<>
						{!disable ? (
							<DatePicker
								value={defaultValue || value || ''}
								name={name}
								render={
									<InputIcon className="textField__input" />
								}
								onChange={value =>
									onChange(
										value?.isValid ? value?.toDate?.() : ''
									)
								}
								calendar={lng === 'en' ? gregorian : persian}
								locale={
									lng === 'en' ? gregorian_en : persian_fa
								}
								containerClassName="w-full "
								placeholder={placeholder}
								{...(lng === 'fa'
									? {weekDays: persianWeekDays}
									: {})}
								{...otherProps}

								// format={lng === 'en' ? 'MM/DD/YYYY' : 'YYYY/MM/DD'}
								// mapDays={({date}) => {
								// 	let props = {};
								// 	let isWeekend = [6].includes(date.weekDay.index);

								// 	if (isWeekend)
								// 		props.className = 'highlight highlight-red';

								// 	return props;
								// }}
							/>
						) : (
							<input
								className="textField__input"
								disabled={disable}
								value={defaultValue || value}
								placeholder={placeholder}
							/>
						)}
					</>
				)}
			/>
		</div>
	);
};

export default DatePickerRHF;
