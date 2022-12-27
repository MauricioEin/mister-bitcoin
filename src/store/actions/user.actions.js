import { userService } from "../../services/user.service"


export function signup(name) {
    return async (dispatch) => {
        try {
            const savedUser = await userService.signup(name)
            dispatch({ type: 'UPDATE_LOGGED_USER', user: savedUser })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function sendCoins(contact, amount) {
    return async (dispatch) => {
        try {
            const user = await userService.addMove(contact, amount)
            dispatch({ type: 'UPDATE_LOGGED_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadLoggedUser(){
    return async (dispatch) => {
        try {
            const user = await userService.getUser()
            if (!user) return
            dispatch({ type: 'UPDATE_LOGGED_USER', user })
        } catch (err) {
            console.log('err:', err)
        }
    }

}