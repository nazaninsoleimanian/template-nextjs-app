import React from 'react';
import {ClockIcon} from '@heroicons/react/24/outline';
import {useParams} from 'next/navigation';
import {Controller} from 'react-hook-form';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

interface Props {
	label: string | React.ReactElement;
	name: string;
	placeholder?: string;
	required?: boolean;
	disable?: boolean;
	control: any;
	classNames?: {
		container?: string;
	};
}

const TimePickerRHF = (props: Props) => {
	const {lng} = useParams();
	const {label, name, placeholder, required, disable, control, classNames} =
		props;
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
							<div className={`relative`}>
								<DatePicker
									value={
										value
											? new DateObject({
													date: value,
													format: 'HH:mm',
											  })
											: ''
									}
									onChange={onChange}
									disableDayPicker
									format="HH:mm"
									plugins={[<TimePicker hideSeconds />]}
									calendar={
										lng === 'en' ? gregorian : persian
									}
									locale={
										lng === 'en' ? gregorian_en : persian_fa
									}
									placeholder={placeholder}
									containerClassName="w-full flex"
									inputClass="bg-white textField__input h-9 rtl:pl-10 rtl:pr-3 ltr:pr-10 ltr:pl-3"
								/>
								<ClockIcon className="w-5 h-5 absolute rtl:left-2 ltr:right-2 top-1/2 transform -translate-y-1/2 text-gray-950" />
							</div>
						) : (
							<input
								className="textField__input"
								disabled={disable}
								value={value}
								placeholder={placeholder}
							/>
						)}
					</>
				)}
			/>
		</div>
	);
};

export default TimePickerRHF;
