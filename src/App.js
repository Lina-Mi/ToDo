import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.App}>
			<h1 className={styles.title}>To Do List</h1>
			<div className={styles.todoList}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todos.map(({ id, title }) => (
						<div className={styles.todoItem} key={id}>
							<div className={styles.todoId}>{id}</div>
							<div className={styles.todoTitle}>{title}</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
