import { 
    CREATE_SUCCESS,
    CREATE_FAILURE,
    PROJECTS_FAILED,
    PROJECTS_SUCCESS,
    MODELS_FETCH_FAILURE,
    MODELS_FETCH_SUCCESS
 } from './types';
import axios from '../services/axios-default';


// Create a new project
export const create_project = data => async dispatch => {
    const response = await axios.post('/project/', data)
    .catch(() => dispatch({type: CREATE_FAILURE, payload: 'Failed to create a project'}));

    if(response && response.status === 201)
        return dispatch({ type: CREATE_SUCCESS, payload: response.data});    
}

// Fetch for existing projects
export const fetch_projects = () => async dispatch => {
    const response = await axios.get('/project/')
    .catch(() => dispatch({ type: PROJECTS_FAILED, payload: 'Failed to retrieve list of projects'}))
    
    if (response && response.status === 200)
        return dispatch({ type: PROJECTS_SUCCESS, payload: response.data})
}

// Fetch models for a specefic project

export const fetch_models = (project_id) => async dispatch => {
    const response = await axios.get(`/project/${project_id}/models/`)
    .catch(() => dispatch({ type: MODELS_FETCH_FAILURE, payload: 'Failed to fetch models'}))

    if (response && response.status === 200)
        return dispatch({ type: MODELS_FETCH_SUCCESS, payload: response.data})
}