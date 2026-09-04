import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setDebouncedSearch, setSorted } from '../../actions';
import { selectSearchTerm, selectDebouncedSearch, selectIsSorted } from '../../selectors';
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
	const dispatch = useDispatch();

	const searchTerm = useSelector(selectSearchTerm);
	const debouncedSearch = useSelector(selectDebouncedSearch);
	const isSorted = useSelector(selectIsSorted);

	const handlesetSearchTerm = (value) => {
		dispatch(setSearchTerm(value));
	};

	const handleSetIsSorted = (value) => {
		dispatch(setSorted(value));
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(setDebouncedSearch(searchTerm));
		}, 1000);

		return () => clearTimeout(timer);
	}, [searchTerm, dispatch]);

	return {
		searchTerm,
		setSearchTerm: handlesetSearchTerm,
		debouncedSearch,
		isSorted,
		setIsSorted: handleSetIsSorted,
	};
};

export const SearchSort = ({ searchTerm, setSearchTerm, isSorted, setIsSorted }) => {
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
