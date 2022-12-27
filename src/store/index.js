import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { contactReducer } from "./reducers/contact.reducer"
import { userReducer } from "./reducers/user.reducer"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    contactModule: contactReducer,
    userModule: userReducer, 
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


window.gStore = store