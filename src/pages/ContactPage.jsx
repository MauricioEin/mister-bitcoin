import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'

class _ContactPage extends Component {

    async componentDidMount() {
        await this.props.loadContacts()
    }

    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts, filterBy } = this.props
        console.log('contacts', contacts)
        return (
            <div className="contact-page">
                <h1>CONTACTS</h1>
                <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />
                <Link to='/contact/edit'><button>Add a new contact</button></Link>
                {contacts ?
                    <ContactList contacts={contacts} />
                    : <div>Loading...</div>}
            </div >
        )
    }
}




const mapStateToProps = state => {
    return {
        contacts: state.contactModule.contacts,
        filterBy: state.contactModule.filterBy
    }
}
const mapDispatchToProps = {
    loadContacts,
    setFilterBy
}
export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)