import moment from 'jalali-moment';

const formats = [
	'YYYY-MM-DD',
	'YYYY/MM/DD',
	'HH:mm:ss',
	'HH:mm',
	'YYYY-MM-DD HH:mm:ss',
	'YYYY-MM-DDTHH:mm:ss',
];

export const getDateWithSlash = (date: any, lng: any) => {
	const m = moment(date);
	m.locale(lng);
	return m.format(formats[1]);
}; // fa: ۱۴۰۳/۰۲/۱۹ - en: 2024/05/08

export const getTime = (date: any, lng?: any) => {
	if (lng) {
		const m = moment(date);
		m.locale(lng);
		return m.format(formats[3]);
	} else {
		return moment().format(formats[3]);
	}
}; // fa: ۱۷:۳۳ - en: 17:33

export const getDayByCharacters = (date: any, lng: any) => {
	const m = moment(date);
	m.locale(lng);
	return m.format('dddd');
}; // fa: چهارشنبه - en: wednesday

export const getDateOnDashFormat = (date: any, lng: any) => {
	const m = moment(date);
	m.locale(lng);
	return m.format(formats[0]);
}; // fa: ۱۴۰۳-۰۲-۱۹ - en: 2024-05-08

type TimeResult = {
	months: number;
	days: number;
	hours: number;
	minutes: number;
};

export const convertDaysToTime = (
	totalDays: number,
	locale: 'fa' | 'en'
): string => {
	moment.locale(locale);

	const totalMinutes = totalDays * 24 * 60;
	const duration = moment.duration(totalMinutes, 'minutes');

	const months = Math.floor(totalDays / 30);
	const remainingDays = totalDays % 30;
	const hours = Math.floor(duration.asHours()) % 24;
	const minutes = duration.minutes();

	const timeResult: TimeResult = {
		months,
		days: remainingDays,
		hours,
		minutes,
	};

	// Format the output based on locale
	if (locale === 'fa') {
		return `${timeResult.months > 0 ? timeResult.months + ' ماه ' : ''}${
			timeResult.days > 0 ? timeResult.days + ' روز ' : ''
		}${timeResult.hours > 0 ? timeResult.hours + ' ساعت ' : ''}${
			timeResult.minutes > 0 ? timeResult.minutes + ' دقیقه' : ''
		}`;
	} else {
		return `${
			timeResult.months > 0 ? timeResult.months + ' month(s) ' : ''
		}${timeResult.days > 0 ? timeResult.days + ' day(s) ' : ''}${
			timeResult.hours > 0 ? timeResult.hours + ' hour(s) ' : ''
		}${timeResult.minutes > 0 ? timeResult.minutes + ' minute(s)' : ''}`;
	}
};
