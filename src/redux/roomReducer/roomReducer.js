import {
    CREATE_ROOM,
    FETCH_ROOMS
} from "../const";

const initialState = [];

const roomReducer = (state = initialState, action) => {
    if (action.type === CREATE_ROOM) {
        return [
            action.payload, ...state
        ]
    } else if (action.type === FETCH_ROOMS) {
        return [
            ...action.payload
        ]
    }
    return state;
}

export default roomReducer;