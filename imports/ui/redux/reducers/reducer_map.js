import { GET_MAP } from '../actions/index';

export default function(state='', action) {
    switch (action.type) {
        case GET_MAP:
            return action.payload.data.map;
    }
    return state;
}