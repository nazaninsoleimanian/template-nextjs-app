import DOMPurify from 'dompurify';

export function sanitizeHtml(html) {
	return DOMPurify.sanitize(html);
}

export const changeBackSlashNToTag = str => {
	return str.replace(/\n/g, '<br />');
};
