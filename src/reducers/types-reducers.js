import { TYPES_FETCH_SUCCESS, TYPES_FETCH_FAILURE } from '../actions/types';


const INITIAL_STATE = {
    types: [],
    errors: ''
};


export const TypesReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type)
    {
        case TYPES_FETCH_SUCCESS:
            return {...state, types: action.payload, error: ''}
        case TYPES_FETCH_FAILURE:
            return {...state, types: [], error: action.payload }
        default:
            return state;
    }
}