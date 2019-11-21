import { 
    CREATE_FAILURE,
    CREATE_SUCCESS,
    PROJECTS_FAILED,
    PROJECTS_SUCCESS,
    RUN_SUCCESS,
    RUN_FAILD
 } from '../actions/types';


const INITIAL_STATE = {
    project: [],
    errors: ''
};

export const projectReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CREATE_SUCCESS:
            return {...state, project: action.payload, errors: '' }
        case RUN_FAILD:
            return {...state, errors: action.payload};
        case RUN_SUCCESS:
            return state;
        case CREATE_FAILURE:
            return {...state, errors: action.payload, project: {} }
        default:
            return state;
    }
}

export const fetchProjectsReducer = (state = { projects: [], errors: ''}, action) => {
    
    switch(action.type) {
        case PROJECTS_SUCCESS:
            return {...state, projects: action.payload, errors: ''};
        case PROJECTS_FAILED:
            return {...state, errors: action.payload};
        default:
            return state;
    }
}