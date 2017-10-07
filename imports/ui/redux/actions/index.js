export const PUSH_MAP = 'PUSH_MAP';
export const PUSH_COORDINATES = 'PUSH_COORDINATES';

export function pushMap(map) {
    return {
        type: PUSH_MAP,
        payload: map,
    };
}

export function pushCoordinates(coordinates) {
    return {
        type: PUSH_COORDINATES,
        payload: coordinates
    }
}

