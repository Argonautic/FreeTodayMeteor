import { PUSH_MAP } from '../actions/index';

export default function(state='', action) {
    switch (action.type) {
        case PUSH_MAP:
            return action.payload.data.map;
    }
    return state;
}