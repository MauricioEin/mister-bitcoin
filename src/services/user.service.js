import { storageService } from "./storage.service"

export const userService = {
    getUser,
    signup,
    addMove,
    
}

export const LOGGED_STORAGE_KEY = 'loggedInUser'

const loggedInUser = {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
}

function getUser() {
    return new Promise((resolve, reject) => {
        const user = storageService.load(LOGGED_STORAGE_KEY)
        resolve(user)
    })
}

function signup(name) {
    return new Promise((resolve, reject) => {
        const user = { name, coins: 100, moves: [] }
        storageService.save(LOGGED_STORAGE_KEY, user)
        resolve(user)
    })
}

async function addMove(contact, amount) {
    try {
        const user = await getUser()
        const move = {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount
        }
        user.moves.push(move)
        user.coins -= amount
        storageService.save(LOGGED_STORAGE_KEY, user)
        return user
    } catch (err) {
        console.log('err:', err)
    }
}