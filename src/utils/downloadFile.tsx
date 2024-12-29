export const downloadFile = (fileLink: string, fileName: string) => {
	const link = document.createElement('a');
	link.href = fileLink;
	link.download = fileName;
	link.click();
};
