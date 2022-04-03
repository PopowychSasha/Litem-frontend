import {
    CREATE_MESSAGE,
    DELETE_MESSAGES,
    FETCH_MESSAGES
} from "../const";

const initialState = [];

const chatReducer = (state = initialState, action) => {
    if (action.type === CREATE_MESSAGE) {
        return [
            ...state, action.payload
        ]
    } else if (action.type === FETCH_MESSAGES) {
        return [
            ...action.payload
        ]
    } else if (action.type === DELETE_MESSAGES) {
        return []
    }
    return state;
}

export default chatReducer;