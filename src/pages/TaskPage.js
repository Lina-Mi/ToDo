import { useState, useEffect } from 'react';
import styles from '../App.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../hooks/useTodos';
import { NotFoundPage } from './NotFoundPage';

export const TaskPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [task, setTask] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');

	const { requestDeleteTask, requestUpdateTask } = useTodos();

	useEffect(() => {
		if (id === undefined) return;

		fetch(`http://localhost:3001/todos/${id}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.title === undefined) {
					navigate('/404');
					return;
				}

				setTask(data);
				setEditedTitle(data.title);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
				setTask(null);
			});
	}, [id, navigate]);

	const handleUpdateKeyDown = (e) => {
		if (e.key === 'Enter' && editingTodoId !== null) {
			requestUpdateTask(editingTodoId, editedTitle).then((updatedTask) => {
				setEditingTodoId(null);
				setTask(updatedTask);
				setEditedTitle(updatedTask.title);
			});
		}
	};

	if (isLoading) {
		return <div className={styles.loader}></div>;
	}

	const { title } = task || {};

	if (!title) {
		return <NotFoundPage />;
	}

	return (
		<div className={styles.App}>
			<div className={styles.headerRow}>
				<h1 className={styles.title}>To Do List</h1>
			</div>

			<div className={styles.todoList}>
				<div className={styles.taskPageItem}>
					<div className={styles.taskContent}>
						<div className={styles.todoId}>{id}</div>

						{editingTodoId === id ? (
							<input
								className={styles.taskPageInput}
								type="text"
								value={editedTitle}
								onChange={(e) => setEditedTitle(e.target.value)}
								onKeyDown={handleUpdateKeyDown}
								autoFocus
							/>
						) : (
							<div
								className={styles.taskPageTitle}
								onDoubleClick={() => {
									setEditingTodoId(id);
									setEditedTitle(task.title);
								}}
							>
								{task.title}
							</div>
						)}
					</div>

					<div className={styles.taskActions}>
						<button
							className={styles.addButton}
							onClick={() => {
								if (editingTodoId === id) {
									requestUpdateTask(id, editedTitle).then(
										(updatedTask) => {
											setEditingTodoId(null);
											setTask(updatedTask);
											setEditedTitle(updatedTask.title);
										},
									);
								} else {
									setEditingTodoId(id);
									setEditedTitle(task.title);
								}
							}}
						>
							{editingTodoId === id ? 'Save' : 'Edit'}
						</button>
						<button
							className={styles.deleteButton}
							onClick={() => requestDeleteTask(id)}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
			<button
				className={styles.backButton}
				onClick={() => {
					navigate(-1);
				}}
			>
				Go back
			</button>
		</div>
	);
};
