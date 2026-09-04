export const setTodos = (todos) => ({
	type: 'SET_TODOS',
	payload: todos,
});

export const addTodo = (todo) => ({
	type: 'ADD_TODO',
	payload: todo,
});

export const updateTodo = (todo) => ({
	type: 'UPDATE_TODO',
	payload: todo,
});

export const deleteTodo = (id) => ({
	type: 'DELETE_TODO',
	payload: id,
});

export const setLoading = (status) => ({
	type: 'SET_LOADING',
	payload: status,
});

export const setEditingTodoId = (id) => ({
	type: 'SET_EDITING_TODO_ID',
	payload: id,
});

export const setEditedTitle = (title) => ({
	type: 'SET_EDITED_TITLE',
	payload: title,
});

export const setSearchTerm = (term) => ({
	type: 'SET_SEARCH_TERM',
	payload: term,
});

export const setDebouncedSearch = (term) => ({
	type: 'SET_DEBOUNCED_SEARCH',
	payload: term,
});

export const setSorted = (value) => ({
	type: 'SET_SORTED',
	payload: value,
});
