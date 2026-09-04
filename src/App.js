import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';

import {
	filteredTodos,
	sortedTodos,
	useSearch,
} from './components/SearchSort/SearchSort';

import {
	selectTodos,
	selectLoading,
	selectSearchTerm,
	selectDebouncedSearch,
	selectIsSorted,
} from './selectors';

import {
	getTodos,
	requestAddNewTask,
	requestUpdateTask,
	requestDeleteTask,
} from './actions';

import { Header, SearchSort, AddPanel, TodoItem, Loader } from './components';

export const App = () => {
	const todos = useSelector(selectTodos);
	const isLoading = useSelector(selectLoading);

	const searchTerm = useSelector(selectSearchTerm);
	const debouncedSearch = useSelector(selectDebouncedSearch);
	const isSorted = useSelector(selectIsSorted);

	const dispatch = useDispatch();

	const { setSearchTerm, setIsSorted } = useSearch();

	const filtered = filteredTodos(todos, debouncedSearch);
	const sorted = sortedTodos(filtered, isSorted);

	useEffect(() => {
		dispatch(getTodos(searchTerm, isSorted));
	}, [searchTerm, isSorted, dispatch]);

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
				<AddPanel requestAddNewTask={requestAddNewTask} />
				{sorted.map(({ id, title }, index) => (
					<TodoItem
						key={id}
						todo={{ id, title }}
						index={index}
						requestUpdateTask={requestUpdateTask}
						requestDeleteTask={requestDeleteTask}
					/>
				))}
			</div>
		</div>
	);
};
