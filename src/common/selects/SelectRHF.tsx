'use client';
import {cn} from '@/utils/clsx';
import {ChangeEvent} from 'react';
import {Controller} from 'react-hook-form';
import Select, {Props as ReactSelectProps, MenuPlacement} from 'react-select';
import makeAnimated from 'react-select/animated';

interface OptionType {
	label?: string;
	value?: string;
}

interface SelectProps {
	control: any;
	label?: string | React.ReactElement;
	name: string;
	required?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	menuPlacement?: MenuPlacement;
	classNames?: {
		wrapper?: string;
		select?: string;
		label?: string;
		menuList?: string;
	};
}

// const colourStyles: StylesConfig<ColourOption> = {
// 	control: styles => ({...styles, backgroundColor: 'white'}),
// 	option: (styles, {data, isDisabled, isFocused, isSelected}) => {
// 		const color = chroma(data.color);
// 		return {
// 			...styles,
// 			backgroundColor: isDisabled
// 				? undefined
// 				: isSelected
// 				? data.color
// 				: isFocused
// 				? color.alpha(0.1).css()
// 				: undefined,
// 			color: isDisabled
// 				? '#ccc'
// 				: isSelected
// 				? chroma.contrast(color, 'white') > 2
// 					? 'white'
// 					: 'black'
// 				: data.color,
// 			cursor: isDisabled ? 'not-allowed' : 'default',

// 			':active': {
// 				...styles[':active'],
// 				backgroundColor: !isDisabled
// 					? isSelected
// 						? data.color
// 						: color.alpha(0.3).css()
// 					: undefined,
// 			},
// 		};
// 	},
// 	input: styles => ({...styles, ...dot()}),
// 	placeholder: styles => ({...styles, ...dot('#ccc')}),
// 	singleValue: (styles, {data}) => ({...styles, ...dot(data.color)}),
// };

const SelectRHF = (props: SelectProps & Omit<ReactSelectProps, 'onChange'>) => {
	const {
		control,
		label,
		name,
		required,
		classNames,
		menuPlacement,
		...selectProps
	} = props;

	const animatedComponents = makeAnimated({
		...(selectProps.components as any),
	});

	const inputId = `${name}-input-${label}`;

	return (
		<div className={`${classNames?.wrapper}`}>
			<label
				htmlFor={inputId}
				className={`text-sm block mb-2 whitespace-nowrap ${classNames?.label}`}
			>
				{label} {required && <span className="text-gray-900">*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				defaultValue={selectProps.defaultValue}
				render={({field: {onChange, value, ref}}) => (
					<Select
						inputId={inputId}
						instanceId={inputId}
						ref={ref}
						components={animatedComponents}
						name={name}
						styles={{
							input: base => ({
								...base,
								'input:focus': {
									boxShadow: 'none',
								},
							}),
							menuPortal: base => ({
								...base,
								zIndex: 9999,
							}),
							menu: base => ({...base, zIndex: 9999}),
						}}
						className={cn('w-full rounded', classNames?.select)}
						classNames={{
							control: ({isFocused}: {isFocused: any}) =>
								cn(
									'px-1 py-0 !rounded !text-gray-600 !border-none !ring-1 !ring-gray-200',
									'hover:!ring-gray-500',
									isFocused &&
										'!ring-2 !ring-gray-500 !outline-none'
								),
							indicatorSeparator: ({
								isFocused,
							}: {
								isFocused: any;
							}) =>
								cn([isFocused && '!ring-0'], 'hidden !p-[2px]'),
							indicatorsContainer: () => '[&>div]:!p-[1px]',
							placeholder: () =>
								'text-sm !text-gray-300 whitespace-nowrap capitalize',
							menuList: () => `${classNames?.menuList}`,
						}}
						{...selectProps}
						onChange={val => onChange(val)}
						menuPlacement={menuPlacement ? menuPlacement : 'auto'}
					/>
				)}
			/>
		</div>
	);
};

export default SelectRHF;
