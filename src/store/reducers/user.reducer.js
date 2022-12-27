import { LOGGED_STORAGE_KEY } from "../../services/user.service"

const INITIAL_STATE = {
    loggedInUser: JSON.parse(localStorage.getItem(LOGGED_STORAGE_KEY))
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_LOGGED_USER':
            return {
                ...state,
                loggedInUser: action.user
            }

        default:
            return state
    }
}