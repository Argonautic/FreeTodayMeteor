export const GET_MAP = 'GET_MAP';

export function getMap(map) {
    return {
        type: GET_MAP,
        payload: map,
    };
}

