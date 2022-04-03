import React, {
    useState
} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const AuthContext = React.createContext({
    token: '',
    isLogIn: false,
    logIn: () => {},
    logOut: () => {},
    socket: {}
})

export const AuthContextProvider = (props) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const isUserLogIn = !!userToken;
    const context = {
        token: userToken,
        isLogIn: isUserLogIn,
        logIn: (token, _id) => {
            console.log(`token=${token}`);
            setUserToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('_id', _id);
        },
        logOut: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('_id');
            userToken('');
        },
        socket: socket
    }
    return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>
}

export default AuthContext;