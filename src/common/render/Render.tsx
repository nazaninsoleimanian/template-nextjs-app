'use client';

interface RenderProps {
	condition: boolean;
	children?: React.ReactNode;
	render?: () => React.ReactNode;
}
const Render = ({condition, children, render}: RenderProps) => {
	if (condition) {
		return children || (render && render());
	}
	return null;
};

export default Render;
