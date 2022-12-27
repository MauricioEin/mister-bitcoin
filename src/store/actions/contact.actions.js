import { contactService } from "../../services/contact.service"

export function loadContacts() {
    return async (dispatch, getState) => {
        try {
            const contacts = await contactService.getContacts(getState().contactModule.filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
            return 'contacts set'
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
            return 'contact removed'

        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function saveContact(contact) {
    return async (dispatch) => {
        try {
            const type = contact._id ? 'UPDATE_CONTACT' : 'ADD_CONTACT'
            const savedContact = await contactService.saveContact(contact)
            dispatch({ type, contact: savedContact })
            return savedContact

        } catch (err) {
            console.log('err:', err)
        }
    }
}


export function setFilterBy(filterBy) {
    return (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
            return 'filter set'
        } catch (err) {
            console.log('err:', err)
        }
    }
}