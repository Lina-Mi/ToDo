import { useDispatch, useSelector } from 'react-redux';
import { selectEditingTodoId, selectEditedTitle } from '../../selectors';
import { setEditingTodoId, setEditedTitle } from '../../actions/actions';
import { Button } from '../Buttons/Buttons';
import styles from './TodoItem.module.css';

export const TodoItem = ({ todo, index, requestUpdateTask, requestDeleteTask }) => {
	const { id, title } = todo;
	const dispatch = useDispatch();

	const editingTodoId = useSelector(selectEditingTodoId);
	const editedTitle = useSelector(selectEditedTitle);

	const handleUpdateKeyDown = (e) => {
		if (e.key === 'Enter' && editingTodoId !== null) {
			dispatch(requestUpdateTask(editingTodoId, editedTitle)).then(() => {
				dispatch(setEditingTodoId(null));
				dispatch(setEditedTitle(''));
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
					onChange={(e) => dispatch(setEditedTitle(e.target.value))}
					onKeyDown={handleUpdateKeyDown}
					autoFocus
				/>
			) : (
				<div
					className={styles.todoTitle}
					onDoubleClick={() => {
						dispatch(setEditingTodoId(id));
						dispatch(setEditedTitle(title));
					}}
				>
					{title}
				</div>
			)}
			<Button onClick={() => dispatch(requestDeleteTask(id))}>Delete</Button>
		</div>
	);
};
