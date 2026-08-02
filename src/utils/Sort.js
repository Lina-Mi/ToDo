export const filteredTodos = (todos, debouncedSearch) => {
	return todos.filter(({ title }) => title.includes(debouncedSearch));
};

export const sortedTodos = (todos, isSorted) => {
	const sortTodos = [...todos];

	if (isSorted) {
		sortTodos.sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});
	}
	return sortTodos;
};
