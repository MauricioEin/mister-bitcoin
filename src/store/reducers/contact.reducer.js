const INITIAL_STATE = {
    contacts: null,
    filterBy: {
        term: ''
    }
}


export function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [...state.contacts]
            }
        case 'REMOVE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.contacIid)
            }
        case 'UPDATE_CONTACT':
            const idx = state.contacts.findIndex(contact => contact._id === action.contact._id)
            return {
                ...state,
                contacts: state.contacts.splice(idx, 1, action.contact)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        default:
            return state
    }
}