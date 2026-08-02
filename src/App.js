import { useState } from 'react';
import styles from './App.module.css';

import { useTodos } from './hooks/useTodos';
import { useSearch } from './hooks/useSearch';

import { filteredTodos, sortedTodos } from './utils/Sort';

export const App = () => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const {
		todos,
		isLoading,
		isCreating,
		requestAddNewTask,
		requestDeleteTask,
		requestUpdateTask,
	} = useTodos();

	const { searchTerm, setSearchTerm, debouncedSearch } = useSearch();

	/* const filteredTodos = (todos, debouncedSearch);
	const sortedTodos = (filteredTodos, isSorted); */

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			requestAddNewTask(newTaskTitle);
			setNewTaskTitle('');
		}
	};

	const handleUpdateKeyDown = (e) => {
		if (e.key === 'Enter' && editingTodoId !== null) {
			requestUpdateTask(editingTodoId, editedTitle).then(() => {
				setEditingTodoId(null);
				setEditedTitle('');
			});
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

								{editingTodoId === id ? (
									<input
										className={styles.todoTitleInput}
										type="text"
										value={editedTitle}
										onChange={(e) => setEditedTitle(e.target.value)}
										onKeyDown={handleUpdateKeyDown}
										autoFocus
									/>
								) : (
									<div
										className={styles.todoTitle}
										onDoubleClick={() => {
											setEditingTodoId(id);
											setEditedTitle(title);
										}}
									>
										{title}
									</div>
								)}
								<button
									className={styles.deleteButton}
									onClick={() => requestDeleteTask(id)}
								>
									Delete
								</button>
							</div>
						),
					)
				)}
			</div>
		</div>
	);
};
