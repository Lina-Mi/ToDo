import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { Button } from '../Buttons/Buttons';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todo, index }) => {
	const { id, title } = todo;
	const { requestDeleteTask, requestUpdateTask } = useTodos();

	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editedTitle, setEditedTitle] = useState('');

	const handleUpdateKeyDown = (e) => {
		if (e.key === 'Enter' && editingTodoId !== null) {
			requestUpdateTask(editingTodoId, editedTitle).then(() => {
				setEditingTodoId(null);
				setEditedTitle('');
			});
		}
	};

	return (
		<div className={styles.todoItem}>
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
			<Button onClick={() => requestDeleteTask(id)}>Delete</Button>
		</div>
	);
};
