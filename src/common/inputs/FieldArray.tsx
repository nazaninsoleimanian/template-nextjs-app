'use client';
import {useTranslation} from '@/i18n/client';
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import {useParams} from 'next/navigation';
import React, {Fragment} from 'react';
import FormControl from '../fom-control/FormControl';
import TextField from './TextField';
import Button from '../buttons/Button';

type Props = {
	required?: boolean;
	fields: any[];
	register: any;
	append: ({}: any) => void;
	remove: (index: number) => void;
	errors: any;
	name: string;
	nameItem: string;
	addLimit?: number;
	disabled?: boolean;
	placeholder?: string;
	onChange?: (index: number, value: string) => void | undefined;
};
const FieldArray = ({
	required = false,
	disabled = false,
	fields,
	name,
	nameItem,
	register,
	append,
	remove,
	errors,
	addLimit,
	placeholder,
	onChange,
}: Props) => {
	const {lng} = useParams();
	const {t} = useTranslation(lng);
	return (
		<div className="flex flex-1 flex-col gap-y-6">
			{fields.map((field, index) => {
				return (
					<Fragment key={field.id}>
						<FormControl
							keyName={nameItem}
							fields={{
								field: t(nameItem as any),
							}}
							errors={
								errors[name] && errors[name][index]
									? errors[name][index]
									: {}
							}
							className="flex-1"
						>
							<TextField
								required={required}
								disabled={disabled}
								label={`${t(nameItem as any)}(${index + 1})`}
								placeholder={placeholder || t(nameItem as any)}
								{...register(
									`${[name]}.${index}.${nameItem}` as const
								)}
								{...(onChange
									? {
											onChange: e =>
												onChange(index, e.target.value),
									  }
									: {})}
								classNames={{
									container: 'relative',
									input: `${
										lng !== 'fa'
											? 'truncate'
											: 'right_truncate'
									}`,
								}}
							>
								{!disabled && index > 0 && (
									<Button
										variant="warning"
										icon={<MinusIcon className="size-5" />}
										onClick={() => remove(index)}
										className={`!p-3 size-5 bg-white !rounded-full absolute top-8 ${
											lng !== 'fa' ? 'right-2' : 'left-2'
										}`}
									/>
								)}
							</TextField>
						</FormControl>
					</Fragment>
				);
			})}
			{!disabled && addLimit && fields.length < addLimit && (
				<div
					className="self-start flex gap-x-1 items-center text-sm cursor-pointer"
					onClick={() => append({[nameItem]: ''})}
				>
					<PlusIcon className="size-4 text-primary-600" />
					<p className="text-primary-500">
						{t('add_something', {field: t(nameItem as any)})}
					</p>
				</div>
			)}
			{!disabled && !addLimit && (
				<div
					className="self-start flex gap-x-1 items-center text-sm cursor-pointer"
					onClick={() => append({[nameItem]: ''})}
				>
					<PlusIcon className="size-4 text-primary-600" />
					<p className="text-primary-500">
						{t('add_something', {field: t(nameItem as any)})}
					</p>
				</div>
			)}
		</div>
	);
};

export default FieldArray;
