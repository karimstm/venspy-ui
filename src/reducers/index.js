import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectReducer, fetchProjectsReducer } from './project-reducer';

export const init = () => {
    const reducer = combineReducers({
        project: projectReducer,
        projects: fetchProjectsReducer,
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}