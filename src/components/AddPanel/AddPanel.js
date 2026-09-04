import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../Buttons/Buttons';
import styles from './AddPanel.module.css';

export const AddPanel = ({ requestAddNewTask }) => {
	const [newTaskTitle, setNewTaskTitle] = useState('');
	const dispatch = useDispatch();

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			dispatch(requestAddNewTask(newTaskTitle));
			setNewTaskTitle('');
		}
	};

	return (
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
			<Button
				onClick={() => {
					dispatch(requestAddNewTask(newTaskTitle));
					setNewTaskTitle('');
				}}
			>
				Add
			</Button>
		</div>
	);
};
