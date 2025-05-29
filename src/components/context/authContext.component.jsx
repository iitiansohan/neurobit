import { createContext, useEffect, useReducer } from "react";

const storedUser = localStorage.getItem('user');
let parsedUser;

try {
    parsedUser = JSON.parse(storedUser);
} catch (error) {
    parsedUser = null;
}

const initialState = {
    user: parsedUser || null,
    role: localStorage.getItem('role') || null,
    token: localStorage.getItem('token') || null,
}

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null
            };

        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                role: action.payload.role,
                token: action.payload.token
            };

        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)
    // console.log("state",state);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('token', state.token)
        localStorage.setItem('role', state.role)
    }, [state]);

    return <authContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
        {children}
    </authContext.Provider>
}