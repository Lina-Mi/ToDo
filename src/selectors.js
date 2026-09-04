export const selectTodos = (state) => state.todos.todos;
export const selectLoading = (state) => state.actions.loading;

export const selectEditingTodoId = (state) => state.editing.editingTodoId;
export const selectEditedTitle = (state) => state.editing.editedTitle;

export const selectSearchTerm = (state) => state.actions.searchTerm;
export const selectDebouncedSearch = (state) => state.actions.debouncedSearch;
export const selectIsSorted = (state) => state.actions.isSorted;
