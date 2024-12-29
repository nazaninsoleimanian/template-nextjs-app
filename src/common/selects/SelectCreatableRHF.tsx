'use client';
import React, {ChangeEvent, FocusEvent, useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import {cn} from '@/utils/clsx';
import {Controller} from 'react-hook-form';

interface OptionType {
	label: string;
	value: string;
}

type Props = {
	label: string | React.ReactElement;
	name: string;
	defaultValue?: any;
	options: OptionType[] | undefined;
	placeholder?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
	styles?: {};
	classNames?: {
		label?: string;
		input?: string;
	};
	isMulti?: boolean;
	isClearable?: boolean;
	isLoading?: boolean;
	required?: boolean;
	control: any;
	disabled?: boolean;
	getValues: any;
	setValue: any;
	onCreate: (values: OptionType, isMulti: boolean) => void;
};
const animatedComponents = makeAnimated();

const SelectCreatableRHF = (props: Props) => {
	const {
		label,
		name,
		defaultValue,
		options = [],
		placeholder,
		isMulti = false,
		isClearable,
		required,
		isLoading,
		control,
		disabled = false,
		onCreate,
	} = props;

	const [selectOptions, setSelectOptions] = useState<
		OptionType[] | OptionType
	>();

	useEffect(() => {
		setSelectOptions(options);
	}, [options]);

	const handleCreateOption = (inputValue: string) => {
		const newOption = {
			label: inputValue,
			value: inputValue.toLowerCase().replace(`/[^\p{L}\p{N}_]/gu`, ''), //remove all non-word characters from a string of any language
		};
		onCreate(newOption, isMulti);
		setSelectOptions(prev => [newOption, ...(prev as OptionType[])]);
	};

	const inputId = `${name}-input-${label}`;

	const formatCreateLabel = (inputValue: string) => inputValue;

	return (
		<div className="w-full">
			<label
				htmlFor={inputId}
				className="text-sm block mb-2 whitespace-nowrap"
			>
				{label} {required && <span className="text-gray-900">*</span>}
			</label>
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({field}) => (
					<CreatableSelect
						isMulti={isMulti}
						isClearable={isClearable}
						onCreateOption={handleCreateOption}
						isLoading={isLoading}
						isDisabled={disabled || isLoading}
						components={animatedComponents}
						options={selectOptions as OptionType[]}
						placeholder={placeholder}
						formatCreateLabel={formatCreateLabel}
						{...field}
						styles={{
							input: base => ({
								...base,
								'input:focus': {
									boxShadow: 'none',
								},
							}),
						}}
						className=""
						classNames={{
							control: ({isFocused}) =>
								cn(
									'px-1 py-0 !rounded-lg !text-gray-600 !border-none !ring-1 !ring-gray-200',
									'hover:!ring-gray-500',
									isFocused &&
										'!ring-2 !ring-gray-500 !outline-none'
								),
							indicatorSeparator: ({isFocused}) =>
								cn([isFocused && '!ring-0'], 'hidden !p-[2px]'),
							indicatorsContainer: () => '[&>div]:!p-[1px]',
							placeholder: ({isDisabled}) =>
								cn('text-sm !text-gray-300 whitespace-nowrap', [
									isDisabled && '!text-gray-400',
								]),
						}}
					/>
				)}
			/>
		</div>
	);
};

export default SelectCreatableRHF;
