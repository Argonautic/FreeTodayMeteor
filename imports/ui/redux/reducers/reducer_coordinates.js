import { PUSH_COORDINATES } from '../actions/index';

export default function(state=[-73.9178987, 40.7604247], action) {
    switch (action.type) {
        case PUSH_COORDINATES:
            console.log(action.payload);
            return action.payload
    }
    return state;
}