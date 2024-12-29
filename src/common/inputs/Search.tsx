import React from 'react';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';

type Props = {
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	searchValue: string;
	classNames?: {
		container?: string;
	};
};
const Search = ({placeholder, onChange, searchValue, classNames}: Props) => {
	return (
		<div
			className={`cursor-pointer grid grid-cols-[1fr,auto] gap-1 bg-white rounded-lg px-3 py-1 md:p-1 md:px-3 border border-gray-200 w-full h-10 ${classNames?.container}`}
		>
			<div className="flex gap-1 text-gray-500">
				<MagnifyingGlassIcon
					// onClick={onSubmitSearchFilterHandler}
					className="size-5 my-auto"
				/>
				<input
					type="text"
					placeholder={placeholder}
					onChange={onChange}
					value={searchValue}
					className="m-0 p-0 text-sm text-gray-600 border-none rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-transparent focus:bg-transparent placeholder:text-gray-300 placeholder:capitalize"
				/>
			</div>
		</div>
	);
};

export default Search;
