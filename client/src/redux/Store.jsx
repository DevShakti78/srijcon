
import { createStore, combineReducers } from 'redux';
import { LogInReducer,LogOutReducer } from './Reducer';
const rootReducer = combineReducers({
    login: LogInReducer,
    logout: LogOutReducer
})

export const Store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())