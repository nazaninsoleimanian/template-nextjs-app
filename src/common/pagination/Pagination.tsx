import React, {Fragment, useEffect, useState} from 'react';
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';

interface PaginationProps {
	// totalPages: number;
	total: number;
	perPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	total,
	perPage,
	currentPage,
	onPageChange,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const {lng} = useParams<{lng: string}>();
	const [totalPages, setTotalPages] = useState<number>(0);

	useEffect(() => {
		const result = total / perPage;
		const flooredResult = Math.floor(result);

		if (result === flooredResult) {
			// The result is an integer.
			setTotalPages(Math.floor(total / perPage));
		} else {
			// The result is a float.
			setTotalPages(Math.floor(total / perPage) + 1);
		}
	}, [total, perPage]);

	const scrollToTop = () => {
		const isBrowser = () => typeof window !== 'undefined';
		if (!isBrowser()) return;
		window.scrollTo({top: 0, behavior: 'smooth'});
	};

	const handlePageChange = (page: number) => {
		scrollToTop();
		onPageChange(page);
		const updatedParams = new URLSearchParams(searchParams);
		updatedParams.set('page', String(page));
		const newUrl = `${pathname}?${updatedParams.toString()}`;
		router.push(newUrl);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			scrollToTop();
			handlePageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			scrollToTop();
			handlePageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers.reverse().map(pageNumber => {
			if (
				pageNumber === 1 ||
				pageNumber === currentPage ||
				pageNumber === totalPages ||
				(pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
			) {
				return (
					<button
						key={pageNumber}
						disabled={pageNumber === currentPage}
						onClick={() => handlePageChange(pageNumber)}
						className={`px-4 py-2 border-t border-b border-r-[0.5px] border-l-[0.5px] ${
							pageNumber === currentPage
								? 'bg-blue-500 text-white border-blue-500'
								: 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 border-gray-200'
						}`}
					>
						{pageNumber}
					</button>
				);
			} else if (
				pageNumber === currentPage - 3 ||
				pageNumber === currentPage + 3
			) {
				return (
					<span
						key={pageNumber}
						className="bg-gray-50 text-gray-400 border-t border-b border-r-[0.5px] border-l-[0.5px] border-gray-200 px-4 py-2"
					>
						...
					</span>
				);
			}
			return null;
		});
	};

	if (total === 0) return <Fragment />;

	return (
		<div className="flex items-center justify-center">
			<div
				className={`inline-flex flex-row-reverse justify-center items-center rounded-md overflow-hidden`}
			>
				{/* NEXT BUTTON */}
				<button
					onClick={handleNextPage}
					className={`p-2 border-t border-b border-gray-200 ${
						currentPage === totalPages
							? 'bg-gray-50 text-gray-500 cursor-not-allowed'
							: 'bg-white'
					} ${
						lng !== 'fa'
							? 'rounded-r-md border-r border-l-[0.5px]'
							: 'rounded-l-md border-l border-r-[0.5px]'
					}`}
					disabled={currentPage === totalPages}
				>
					<ChevronLeftIcon className="size-6 ltr:rotate-180" />
				</button>
				{renderPageNumbers()}
				{/* NEXT BUTTON */}
				<button
					onClick={handlePrevPage}
					className={`p-2 border-t border-b border-gray-200 ${
						currentPage === 1
							? 'bg-gray-50 text-gray-500 cursor-not-allowed'
							: 'bg-white'
					} ${
						lng !== 'fa'
							? 'rounded-l-md border-l border-r-[0.5px]'
							: 'rounded-r-md border-r border-l-[0.5px]'
					}`}
					disabled={currentPage === 1}
				>
					<ChevronRightIcon className="size-6 ltr:rotate-180" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
