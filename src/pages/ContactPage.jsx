import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { contactService } from '../services/contact.service'

export class ContactPage extends Component {

    state = {
        contacts: null,
        filterBy: {
            term: '',
        }
    }

    async componentDidMount() {
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts(this.state.filterBy)
            this.setState({ contacts })
        } catch (err) {
            console.log('err:', err)
        }
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadContacts)
    }

    render() {
        const { contacts, filterBy } = this.state

        return (
            <div className="contact-page">
                <h1>CONTACTS</h1>
                <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />

                <ContactList contacts={contacts} />
            </div >
        )
    }
}
