import {cn} from '@/utils/clsx';

export interface ChildrenProps {
	children: React.ReactNode;
}

export interface ClassNameProps {
	className: string;
}
export type ClassNameChildrenProps = ChildrenProps & Partial<ClassNameProps>;

export const Card: React.FC<ClassNameChildrenProps> = ({
	children,
	className,
}) => {
	return (
		<div className={cn('bg-white rounded-lg p-4', className)}>
			{children}
		</div>
	);
};

export const CardWithBorder: React.FC<ClassNameChildrenProps> = ({
	className,
	...props
}) => {
	return <Card className={`${className} border-[1px]`} {...props} />;
};
