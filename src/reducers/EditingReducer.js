const initialState = {
	editingTodoId: null,
	editedTitle: '',
};

export const EditingReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_EDITING_TODO_ID':
			return {
				...state,
				editingTodoId: action.payload,
			};

		case 'SET_EDITED_TITLE':
			return {
				...state,
				editedTitle: action.payload,
			};

		default:
			return state;
	}
};
