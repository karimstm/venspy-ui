import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectReducer, fetchProjectsReducer } from './project-reducer';
import { TypesReducer } from './types-reducers';
import { ModelsReducers } from './models-reducers';

export const init = () => {
    const reducer = combineReducers({
        project: projectReducer,
        projects: fetchProjectsReducer,
        types: TypesReducer,
        models: ModelsReducers
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}