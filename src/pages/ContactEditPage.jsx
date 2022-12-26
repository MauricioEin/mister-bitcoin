import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { contactService } from '../services/contact.service'

export class ContactEditPage extends Component {
    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        console.log('props', this.props)
        const contactId = this.props.match.params.id
        if (!contactId) return
        const contact = await contactService.getContactById(contactId)
        this.setState({ contact })
    }

    submitContact = async (ev) => {
        ev.preventDefault()
        try {
            await contactService.saveContact({ ...this.state.contact })
            this.props.history.push('/')
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = ({ target }) => {
        const { name: field, value } = target
        this.setState(({contact}) => ({ contact: { ...contact, [field]: value } }))
    }

    deleteContact = async () => {
        try{
            await contactService.deleteContact(this.state.contact._id)
            this.props.history.push('/contact')
        } catch(err) {
            console.log('error deleting contact:', err)
        }
    }


    render() {
        const { contact } = this.state
        const imgUrl = `https://robohash.org/${contact._id}`

        return (
            <div className="contact-edit">
                <h2>{contact._id ? 'Edit Contact' : 'Add Contact'}</h2>
                {contact._id && <img src={imgUrl}/>}
                <form onSubmit={this.submitContact} className='flex column'>
                    <label htmlFor='name'>Name 
                    <input onChange={this.handleChange} value={contact.name} type='text' name='name' id='name' />
                    </label>
                    <label htmlFor='email'>Email
                    <input onChange={this.handleChange} value={contact.email} type='email' name='email' id='email' />
                    </label>
                    <label htmlFor='phone'>Phone
                    <input onChange={this.handleChange} value={contact.phone} type='text' name='phone' id='phone' />
                    </label>
                    <button>Save</button>
                </form>

                <NavLink to="/contact"><button>Back</button></NavLink>
                <button onClick={this.deleteContact} className='delBtn'>Delete contact</button>

            </div >
        )
    }
}
