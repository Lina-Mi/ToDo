const initialState = {
	searchTerm: '',
	debouncedSearch: '',
	isSorted: false,
	loading: false,
};

export const ActionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};
		case 'SET_SEARCH_TERM': {
			return {
				...state,
				searchTerm: action.payload,
			};
		}
		case 'SET_DEBOUNCED_SEARCH': {
			return {
				...state,
				debouncedSearch: action.payload,
			};
		}
		case 'SET_SORTED': {
			return {
				...state,
				isSorted: action.payload,
			};
		}
		default:
			return state;
	}
};
