import { useState } from 'react';
import { TodosContext } from './context/TodosContext';
import { Header, SearchSort, AddPanel, TodoItem, Loader } from './components';
import { useTodos } from './hooks/useTodos';
import styles from './App.module.css';

import {
	useSearch,
	filteredTodos,
	sortedTodos,
} from './components/SearchSort/SearchSort';

export const App = () => {
	const {
		todos,
		isLoading,
		requestAddNewTask,
		requestDeleteTask,
		requestUpdateTask,
		isCreating,
	} = useTodos();

	const { searchTerm, setSearchTerm, debouncedSearch } = useSearch();
	const [isSorted, setIsSorted] = useState(false);

	const filtered = filteredTodos(todos, debouncedSearch);
	const sorted = sortedTodos(filtered, isSorted);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<TodosContext.Provider
			value={{
				requestAddNewTask,
				isCreating,
				searchTerm,
				setSearchTerm,
				isSorted,
				setIsSorted,
				requestDeleteTask,
				requestUpdateTask,
			}}
		>
			<div className={styles.App}>
				<div className={styles.headerRow}>
					<Header />
					<div className={styles.menu}>
						<SearchSort />
					</div>
				</div>
				<div className={styles.todoList}>
					<AddPanel />

					{sorted.map(({ id, title }, index) => (
						<TodoItem key={id} todo={{ id, title }} index={index} />
					))}
				</div>
			</div>
		</TodosContext.Provider>
	);
};
