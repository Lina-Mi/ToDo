import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Button } from '../Buttons/Buttons';
import styles from './SearchSort.module.css';

export const filteredTodos = (todos, debouncedSearch) => {
	return todos.filter(({ title }) => title.includes(debouncedSearch));
};

export const sortedTodos = (todos, isSorted) => {
	const sortTodos = [...todos];

	if (isSorted) {
		sortTodos.sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});
	}
	return sortTodos;
};

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

export const SearchSort = () => {
	const { searchTerm, setSearchTerm, isSorted, setIsSorted } = useContext(TodosContext);

	return (
		<div>
			<input
				className={styles.searchInput}
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<Button onClick={() => setIsSorted(!isSorted)}>
				{isSorted ? 'Original order' : 'Sort A-Z'}
			</Button>
		</div>
	);
};
