import { useEffect } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'

export function ContactPage() {
    const contacts = useSelector(state => state.contactModule.contacts)
    const filterBy = useSelector(state => state.contactModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadContacts())
    }, [])

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadContacts())
    }

    console.log('contacts', contacts)
    return (
        <div className="contact-page">
            <h1>CONTACTS</h1>
            <ContactFilter onChangeFilter={onChangeFilter} filterBy={filterBy} />
            <Link to='/contact/edit'><button>Add a new contact</button></Link>
            {contacts ?
                <ContactList contacts={contacts} />
                : <div>Loading...</div>}
        </div >
    )
}
