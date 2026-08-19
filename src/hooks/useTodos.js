import { useEffect, useState } from 'react';

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodos, setRefreshTodos] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3001/todos', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);

	const requestAddNewTask = (newTaskTitle) => {
		if (newTaskTitle.trim() === '') return;
		setIsCreating(true);

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
				console.log('New task added:', newTodo);
				setTodos([...todos, newTodo]);
				setRefreshTodos(!refreshTodos);
				return newTodo;
			})
			.finally(() => setIsCreating(false));
	};

	const requestUpdateTask = (id, editedTitle) => {
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
			.then((updatedTask) => {
				setRefreshTodos(!refreshTodos);

				return updatedTask;
			});
	};

	const requestDeleteTask = (id) => {
		fetch(`http://localhost:3001/todos/${id}`, {
			method: 'DELETE',
		}).then(() => {
			setRefreshTodos(!refreshTodos);
		});
	};
	return {
		todos,
		isLoading,
		isCreating,

		requestAddNewTask,
		requestDeleteTask,
		requestUpdateTask,
	};
};
