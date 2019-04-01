import {types as postTypes} from './posts';
import {types as commentTypes} from './comments';

const initialState = {};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case postTypes.FETCH_ALL_POST:
        case commentTypes.FETCH_COMMENTS:
            return {...state, ...action.users}
        case postTypes.FETCH_POST:
            return {...state, [action.user.id]: action.user}
        default: 
            return state;
    }
}

export default reducer;

// selector
export const getUserById = (state, id) => (state.users[id]);