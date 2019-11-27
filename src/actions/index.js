import { 
    CREATE_SUCCESS,
    CREATE_FAILURE,
    PROJECTS_FAILED,
    PROJECTS_SUCCESS,
    MODELS_FETCH_FAILURE,
    MODELS_FETCH_SUCCESS,
    TYPES_FETCH_FAILURE,
    TYPES_FETCH_SUCCESS,
    MODEL_INSERT_FAILURE,
    MODEL_INSERT_SUCCESS,
    RUN_FAILD,
	RUN_SUCCESS,
	DEFAULT_URL,
	LOGIN_PATH
 } from './types';
import axios from '../services/axios-default';
import { login, logout, reject } from "./login-actions";

//login actions
export {login, logout, reject};
export {LOGIN_PATH, DEFAULT_URL};

// Create a new project
export const create_project = data => async dispatch => {
    const response = await axios.post('/project/', data)
    .catch(() => dispatch({type: CREATE_FAILURE, payload: 'Failed to create a project'}));

    if(response && response.status === 201)
        return dispatch({ type: CREATE_SUCCESS, payload: response.data});
    return response;
}

// Fetch for existing projects
export const fetch_projects = () => async dispatch => {
    const response = await axios.get('/project/')
    .catch(() => dispatch({ type: PROJECTS_FAILED, payload: 'Failed to retrieve list of projects'}))
    
    if (response && response.status === 200)
        return dispatch({ type: PROJECTS_SUCCESS, payload: response.data})
    return response;
}

// Fetch models for a specefic project

export const fetch_models = (project_id) => async dispatch => {
    const response = await axios.get(`/project/${project_id}/models`)
    .catch(() => dispatch({ type: MODELS_FETCH_FAILURE, payload: 'Failed to fetch models'}))

    if (response && response.status === 200)
        return dispatch({ type: MODELS_FETCH_SUCCESS, payload: response.data})
    return response;
}

// Fetch types

export const fetchTypes = () => async dispatch => {
    const response = await axios.get('/types/')
    .catch(() => dispatch({ type: TYPES_FETCH_FAILURE, payload: 'Could not fetch types'}))

    if (response.status === 200 )
        return dispatch({ type: TYPES_FETCH_SUCCESS, payload: response.data})
    return response;
}

export const uploadModel = (data) => async dispatch => {
    const response = await axios.post('/upload', data)
    .catch((err) => {
        return dispatch({ type: MODEL_INSERT_FAILURE , payload: 'Failed to Upload File'})
    });
    if (response.status === 201 )
        return dispatch({ type: MODEL_INSERT_SUCCESS, payload: response.data})
    return response;

}


// Run a simulation
export const runSimulation = (projectId, data) => async dispatch => {
    const response = await axios.get(`/simulations/${projectId}`,
    {
        params: data
    })
    .catch(() => {
        return dispatch({ type: RUN_FAILD , payload: 'Failed to Run Simulation'})
    });
    if (response.status === 200)
        return dispatch({ type: RUN_SUCCESS, payload: 'Run success'})
    return response
}
