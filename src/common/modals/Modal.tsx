'use client';
import {createPortal} from 'react-dom';
import useOutsideClick from '@/hooks/useOutSideClick/useOutsideClick';
import {useEffect, useState} from 'react';
import {XMarkIcon} from '@heroicons/react/20/solid';
import {useParams} from 'next/navigation';

interface ModalProps {
	open: boolean;
	onClose: () => void;
	bottomSheet?: boolean;
	title?: string | JSX.Element;
	children: React.ReactNode;
	InnerXMarkDisabled?: boolean;
	OuterXMarkDisabled?: boolean;
	outSideClick?: boolean;
	classNames?: {
		mask?: string;
		panel?: string;
		body?: string;
		title?: string;
	};
}

let modalStack: number[] = [];

function Modal({
	open,
	onClose,
	bottomSheet = false,
	title = '',
	children,
	outSideClick = true,
	InnerXMarkDisabled = false,
	OuterXMarkDisabled = true,
	classNames = {
		mask: '',
		panel: '',
		title: '',
		body: '',
	},
}: ModalProps) {
	const {lng} = useParams();
	const [zIndex, setZIndex] = useState(50);
	const ref = useOutsideClick<HTMLDivElement>(() => {
		if (modalStack[modalStack.length - 1] === zIndex) {
			outSideClick && onClose();
		}
	});

	useEffect(() => {
		if (open) {
			modalStack.push(zIndex);
			document.body.style.overflow = 'hidden'; // Disable scrolling
		} else {
			modalStack = modalStack.filter(z => z !== zIndex);
			if (modalStack.length === 0) {
				document.body.style.overflow = ''; // Re-enable scrolling when all modals are closed
			}
		}
		return () => {
			modalStack = modalStack.filter(z => z !== zIndex);
			if (modalStack.length === 0) {
				document.body.style.overflow = ''; // Cleanup in case the modal was unmounted directly
			}
		};
	}, [open, zIndex]);

	useEffect(() => {
		setZIndex(modalStack.length > 0 ? Math.max(...modalStack) + 10 : 50);
	}, [open]);

	return (
		open &&
		createPortal(
			<div
				className={`fixed top-0 left-0 w-full h-dvh max-h-dvh bg-gray-950 bg-opacity-70 ${classNames.mask}`}
				style={{zIndex: zIndex - 1}}
			>
				<div
					ref={ref}
					className={`fixed left-1/2 -translate-x-1/2 ${
						bottomSheet
							? 'bottom-0 rounded-t-xl'
							: 'top-1/2 -translate-y-1/2 rounded-xl'
					} bg-white p-4 shadow-lg transition-all duration-500 ease-out
                    md:w-[calc(100vw-2rem)] ${classNames.panel}`}
					style={{zIndex}}
				>
					<div
						className={`flex items-center justify-between ${
							title && 'mb-3 md:mb-6 border-b-2 border-gray-50'
						}`}
					>
						{!!InnerXMarkDisabled && !OuterXMarkDisabled && (
							<XMarkIcon
								className={`absolute cursor-pointer ${
									lng !== 'fa' ? 'right-4' : 'left-4'
								} -top-7 size-6 bg-white rounded-full`}
								onClick={onClose}
							/>
						)}
						{!InnerXMarkDisabled && !!OuterXMarkDisabled && (
							<XMarkIcon
								className={`absolute cursor-pointer ${
									lng !== 'fa' ? 'right-4' : 'left-4'
								} top-4 size-5`}
								onClick={onClose}
							/>
						)}
						{title && (
							<h5
								className={`!mt-0 pb-4 text-xl font-medium ${classNames?.title}`}
							>
								{title}
							</h5>
						)}
					</div>
					<div className={`w-full h-full ${classNames?.body}`}>
						{children}
					</div>
				</div>
			</div>,
			document.body
		)
	);
}

export default Modal;
