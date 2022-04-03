import {
    CREATE_MESSAGE,
    CREATE_ROOM,
    DELETE_MESSAGES,
    FETCH_MESSAGES,
    FETCH_ROOMS
} from "./const"

export const createMessageCreator = (messageData) => {
    return {
        type: CREATE_MESSAGE,
        payload: {
            message: messageData.message,
            userId: messageData.userId
        }
    }
}

export const fetchMessagesCreator = (messges) => {
    return {
        type: FETCH_MESSAGES,
        payload: messges
    }
}

export const createRoomCreator = (roomName, roomId) => {

    return {
        type: CREATE_ROOM,
        payload: {
            _id: localStorage.getItem('_id'),
            roomName: roomName,
            roomId: roomId
        }
    }
}

export const fetchRoomsCreator = (rooms) => {

    const roomsName = rooms.map(room => {
        return {
            _id: localStorage.getItem('_id'),
            roomName: room.roomName,
            roomId: room._id
        }
    })
    return {
        type: FETCH_ROOMS,
        payload: roomsName
    }
}

export const deleteMessagesCreator = () => {
    return {
        type: DELETE_MESSAGES
    }
}