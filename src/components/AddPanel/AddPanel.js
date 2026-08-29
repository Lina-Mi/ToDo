import { useContext, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Button } from '../Buttons/Buttons';
import styles from './AddPanel.module.css';

export const AddPanel = () => {
	const { requestAddNewTask, isCreating } = useContext(TodosContext);

	const [newTaskTitle, setNewTaskTitle] = useState('');

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			requestAddNewTask(newTaskTitle);
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
				disabled={isCreating}
				onClick={() => {
					requestAddNewTask(newTaskTitle);
					setNewTaskTitle('');
				}}
			>
				Add
			</Button>
		</div>
	);
};
