import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { TodosReducer, EditingReducer, ActionsReducer } from './reducers';

const reducer = combineReducers({
	todos: TodosReducer,
	editing: EditingReducer,
	actions: ActionsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
