'use client';
import React from 'react';
import Select, {
	Props as ReactSelectProps,
	ActionMeta,
	MultiValue,
	SingleValue,
} from 'react-select';
import {cn} from '@/utils/clsx';
import makeAnimated from 'react-select/animated';

interface OptionType {
	label?: string;
	value?: string;
}

interface SelectProps {
	label?: string | React.ReactElement;
	name: string;
	required?: boolean;
	onChange?: (
		newValue: any
	) =>
		| void
		| ((
				newValue: MultiValue<OptionType> | SingleValue<OptionType>,
				actionMeta: ActionMeta<OptionType>
		  ) => void)
		| undefined;
	classNames?: {
		wrapper?: string;
		select?: string;
		label?: string;
		menuList?: string;
	};
}

const ReactSelect = (
	props: SelectProps & Omit<ReactSelectProps, 'onChange'>
) => {
	const {
		label,
		name,
		required,
		onChange,
		classNames,
		menuPlacement,
		...selectProps
	} = props;
	const animatedComponents = makeAnimated({
		...(selectProps.components as any),
	});
	const inputId = `${name}-input-${label}`;
	return (
		<div className={`flex flex-col w-full ${classNames?.wrapper}`}>
			{label && (
				<label
					htmlFor={inputId}
					className={`text-sm block mb-2 whitespace-nowrap ${classNames?.label}`}
				>
					{label}{' '}
					{required && <span className="text-gray-900">*</span>}
				</label>
			)}
			<Select
				inputId={inputId}
				instanceId={inputId}
				name={name}
				onChange={onChange}
				components={animatedComponents}
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
							isFocused && '!ring-2 !ring-gray-500 !outline-none'
						),
					indicatorSeparator: ({isFocused}: {isFocused: any}) =>
						cn([isFocused && '!ring-0'], 'hidden !p-[2px]'),
					indicatorsContainer: () => '[&>div]:!p-[1px]',
					placeholder: () =>
						'text-sm !text-gray-300 whitespace-nowrap capitalize',
					menuList: () => `${classNames?.menuList}`,
				}}
				{...selectProps}
				{...(menuPlacement ? {menuPlacement} : {menuPlacement: 'auto'})}
			/>
		</div>
	);
};

export default ReactSelect;
