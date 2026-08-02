import { useEffect, useState } from 'react';

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchTerm);
		}, 1000);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	return {
		searchTerm,
		setSearchTerm,
		debouncedSearch,
	};
};
