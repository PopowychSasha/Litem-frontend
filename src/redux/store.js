import chatReducer from './chatReducer/chatReducer';
import roomReducer from './roomReducer/roomReducer';
import {
    combineReducers,
    createStore
} from 'redux';

const rootReducer = combineReducers({
    chatReducer: chatReducer,
    roomReducer: roomReducer
});

export const store = createStore(rootReducer);