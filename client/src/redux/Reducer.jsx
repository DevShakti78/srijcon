
import { USER_LOGIN,USER_LOGOUT } from "./Action";
const initialState = {
    token:""
}

export const LogInReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGIN:
            return {
                ...store,
                token: payload,
                
            }
        default:
            return store;
    }

}
export const LogOutReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOGOUT:
            return {
                token: null
            }

        default:
            return store;
    }

}