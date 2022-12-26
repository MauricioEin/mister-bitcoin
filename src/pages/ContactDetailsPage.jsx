import { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { contactService } from '../services/contact.service'

export class ContactDetailsPage extends Component {
    state = {
        contact: null,
        prevId: null,
        nextId: null
    }

    async componentDidMount() {
        this.loadContact()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
        }
    }


    loadContact = async () => {
        const id = this.props.match.params.id
        const contact = await contactService.getContactById(id)
        // for prev and next:
        const contacts = await contactService.getContacts()
        const idx = contacts.findIndex(contact => contact._id === id)
        const nextId = contacts[(contacts.length + idx + 1) % contacts.length]._id
        const prevId = contacts[(contacts.length + idx - 1) % contacts.length]._id
        this.setState({ contact, nextId, prevId })
    }

    render() {
        const { contact, nextId, prevId } = this.state
        if (!contact) return <div>Loading...</div>
        const imgUrl = `https://robohash.org/${contact._id}`

        return (
            <div className="contact-details">
                <nav className='flex space-around'>
                    <Link to={`/contact/${prevId}`}> Previous</Link>
                    <Link to={`/contact/${nextId}`}> Next</Link>
                </nav>
                <img src={imgUrl} alt="" />

                <h1>{contact.name}</h1>
                <h2>{contact.email}</h2>
                <h2>{contact.phone}</h2>

                <NavLink to="/contact"><button >Back</button></NavLink>
                <NavLink to={`/contact/edit/${contact._id}`}><button >Edit</button></NavLink>

            </div >
        )
    }
}
