import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

import { useTodos } from '../hooks/useTodos';
import { useSearch } from '../hooks/useSearch';

import { filteredTodos, sortedTodos } from '../utils/Sort';

export const MainPage = () => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const { todos, isLoading, isCreating, requestAddNewTask } = useTodos();

	const { searchTerm, setSearchTerm, debouncedSearch } = useSearch();

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			requestAddNewTask(newTaskTitle);
			setNewTaskTitle('');
		}
	};

	return (
		<div className={styles.App}>
			<div className={styles.headerRow}>
				<h1 className={styles.title}>To Do List</h1>

				<div className={styles.menu}>
					<input
						className={styles.searchInput}
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<button
						className={styles.sortButton}
						onClick={() => setIsSorted(!isSorted)}
					>
						{isSorted ? 'Original order' : 'Sort A-Z'}
					</button>
				</div>
			</div>

			<div className={styles.todoList}>
				<div className={styles.newTodo}>
					<div className={styles.todoId}></div>

					<input
						className={styles.todoTitleInput}
						type="text"
						placeholder="Add new task"
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button
						className={styles.addButton}
						disabled={isCreating}
						onClick={() => {
							requestAddNewTask(newTaskTitle);
							setNewTaskTitle('');
						}}
					>
						Add
					</button>
				</div>

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					sortedTodos(filteredTodos(todos, debouncedSearch), isSorted).map(
						({ id, title }, index) => (
							<div className={styles.todoItem} key={id}>
								<div className={styles.todoId}>{index + 1}</div>
								<Link to={`/task/${id}`} className={styles.todoTitleLink}>
									<div className={styles.todoTitle}>
										{title}
										{/* {title.length > 70
											? title.slice(0, 70) + '...'
											: title} */}
									</div>
								</Link>
							</div>
						),
					)
				)}
			</div>
		</div>
	);
};
