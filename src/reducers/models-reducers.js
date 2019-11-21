import { 
    MODELS_FETCH_FAILURE,
    MODELS_FETCH_SUCCESS,
    MODEL_INSERT_SUCCESS,
    MODEL_INSERT_FAILURE
 } from '../actions/types';

 const INITIAL_STATE = {
    models: [],
    errors: ''
};


export const ModelsReducers = (state = INITIAL_STATE, actions) => {
    switch(actions.type)
    {
        case MODELS_FETCH_SUCCESS:
            return {...state, models: actions.payload, error: ''}
        case MODELS_FETCH_FAILURE:
            return {...state, models: [...state.models], error: actions.error }
        case MODEL_INSERT_SUCCESS:
            return {...state, models: [...state.models, actions.payload], error: '' }
        case MODEL_INSERT_FAILURE:
            return state;
        default:
            return state;
    }
}
