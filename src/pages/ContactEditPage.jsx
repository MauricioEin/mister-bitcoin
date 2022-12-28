import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'
import { removeContact, saveContact } from '../store/actions/contact.actions'


class _ContactEditPage extends Component {
    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        if (!contactId) return
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
    }

    submitContact = async (ev) => {
        ev.preventDefault()
        try {
            const savedContact = await this.props.saveContact({ ...this.state.contact })
            this.props.history.push('/contact/' + savedContact._id)
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = ({ target }) => {
        const { name: field, value } = target
        this.setState(({ contact }) => ({ contact: { ...contact, [field]: value } }))
    }

    deleteContact = async () => {
        try {
            await this.props.removeContact(this.state.contact._id)
            this.props.history.push('/contact')
        } catch (err) {
            console.log('error deleting contact:', err)
        }
    }

    handleRef = (el) =>{
        el?.focus()
    }


    render() {
        const { contact } = this.state
        const imgUrl = `https://robohash.org/${contact._id}`

        return (
            <div className="contact-edit">
                <h2>{contact._id ? 'Edit Contact' : 'Add Contact'}</h2>
                {contact._id && <img src={imgUrl} />}
                <form onSubmit={this.submitContact} className='flex column'>
                    <label ref={this.handleRef}>Name
                        <input onChange={this.handleChange} value={contact.name} type='text' name='name' />
                    </label>
                    <label >Email
                        <input onChange={this.handleChange} value={contact.email} type='email' name='email' />
                    </label>
                    <label >Phone
                        <input onChange={this.handleChange} value={contact.phone} type='text' name='phone' />
                    </label>
                    <button>Save</button>
                </form>

                <NavLink to={`/contact/${contact._id}`}><button>Back</button></NavLink>
                <button onClick={this.deleteContact} className='delBtn'>Delete contact</button>

            </div >
        )
    }
}




const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
    removeContact,
    saveContact
}
export const ContactEditPage = connect(mapStateToProps, mapDispatchToProps)(_ContactEditPage)