'use client';
import React, {useEffect, useState} from 'react';
import ColorRingLoading from '../loadings/ColorRingLoading';

type PropsType = {
	pdfUrl: string;
};

const PdfViewer = ({pdfUrl}: PropsType) => {
	const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	console.log(isLoading);

	useEffect(() => {
		const fetchPdf = async () => {
			try {
				const response = await fetch(pdfUrl);

				if (!response.ok) {
					throw new Error('Failed to fetch PDF');
				}

				// Convert the PDF response to a Blob
				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				setPdfBlobUrl(url);
				setIsLoading(false);
			} catch (err) {
				setError('Failed to load PDF. Please try again.');
				console.error(err);
				setIsLoading(false);
			}
		};

		fetchPdf();

		// Cleanup: Release the Blob URL when component unmounts
		return () => {
			if (pdfBlobUrl) {
				URL.revokeObjectURL(pdfBlobUrl);
			}
		};
	}, [pdfUrl]);

	return (
		<div className="w-full h-full">
			{error && <p className="error">{error}</p>}
			{isLoading || !pdfBlobUrl ? (
				<div className="w-full h-full flex items-center justify-center text-gray-400">
					<p>Loading PDF...</p> <ColorRingLoading color="#c2c2c2" />
				</div>
			) : (
				<iframe
					src={pdfBlobUrl}
					style={{width: '100%', height: '80vh', border: 'none'}}
					title="PDF Viewer"
				/>
			)}
		</div>
	);
};

export default PdfViewer;
