export const PUSH_MAP = 'PUSH_MAP';

export function pushMap(map) {
    return {
        type: PUSH_MAP,
        payload: map,
    };
}

