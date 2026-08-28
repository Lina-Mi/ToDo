import { useState } from 'react';

import styles from './App.module.css';

import { useTodos } from './hooks/useTodos';

import {
	useSearch,
	filteredTodos,
	sortedTodos,
} from './components/SearchSort/SearchSort';

import { Header, SearchSort, AddPanel, TodoItem, Loader } from './components';

export const App = () => {
	const { todos, isLoading } = useTodos();

	const { searchTerm, setSearchTerm, debouncedSearch } = useSearch();

	const [isSorted, setIsSorted] = useState(false);

	const filtered = filteredTodos(todos, debouncedSearch);

	const sorted = sortedTodos(filtered, isSorted);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.App}>
			<div className={styles.headerRow}>
				<Header />
				<div className={styles.menu}>
					<SearchSort
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
					/>
				</div>
			</div>
			<div className={styles.todoList}>
				<AddPanel />

				{sorted.map(({ id, title }, index) => (
					<TodoItem key={id} todo={{ id, title }} index={index} />
				))}
			</div>
		</div>
	);
};
