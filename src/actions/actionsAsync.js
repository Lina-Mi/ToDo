import {
	setTodos,
	addTodo,
	updateTodo,
	deleteTodo,
	setLoading,
	setError,
} from './actions';

export const getTodos = () => (dispatch) => {
	dispatch(setLoading(true));

	fetch('http://localhost:3001/todos', {
		method: 'GET',
	})
		.then((response) => response.json())
		.then((loadedTodos) => {
			dispatch(setTodos(loadedTodos));
			dispatch(setLoading(false));
		})
		.catch((error) => {
			dispatch(setLoading(false));
			dispatch(setError('Loading error'));
		});
};

export const requestAddNewTask = (newTaskTitle) => (dispatch) => {
	if (newTaskTitle.trim() === '') return;

	fetch('http://localhost:3001/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: newTaskTitle,
			completed: false,
		}),
	})
		.then((response) => response.json())
		.then((newTodo) => {
			dispatch(addTodo(newTodo));
		})
		.catch((error) => {
			dispatch(setError('Error'));
		});
};

export const requestUpdateTask = (id, editedTitle) => (dispatch) => {
	return fetch(`http://localhost:3001/todos/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title: editedTitle,
		}),
	})
		.then((response) => response.json())
		.then((updatedTodo) => {
			dispatch(updateTodo(updatedTodo));
		})
		.catch((error) => {
			dispatch(setError('Error'));
		});
};

export const requestDeleteTask = (id) => (dispatch) => {
	fetch(`http://localhost:3001/todos/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			dispatch(deleteTodo(id));
		})
		.catch((error) => {
			dispatch(setError('Error'));
		});
};
