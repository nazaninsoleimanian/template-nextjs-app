import React, {ReactNode} from 'react';
import {
	Calendar as ReactCalendar,
	DateObject,
	CalendarProps,
} from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {useParams} from 'next/navigation';

type PropsType = Omit<CalendarProps, 'onChange' | 'range'> & {
	children?: ReactNode;
	range?: boolean;
	onChange?: (selectedDates: DateObject[] | DateObject | null) => void;
	defaultValue?: DateObject[];
};
const Calendar = (props: PropsType) => {
	const {
		children,
		onChange,
		range = false,
		defaultValue,
		...otherProps
	} = props;

	const {lng} = useParams();

	const handleChange = (selectedDates: DateObject[] | DateObject | null) => {
		if (onChange) {
			onChange(selectedDates);
		}
	};

	return (
		<ReactCalendar
			value={defaultValue}
			calendar={lng === 'en' ? gregorian : persian}
			locale={lng === 'en' ? gregorian_en : persian_fa}
			className="flex flex-col pb-3"
			{...otherProps}
			range={range}
			onChange={handleChange}
		>
			{children}
		</ReactCalendar>
	);
};

export default Calendar;
