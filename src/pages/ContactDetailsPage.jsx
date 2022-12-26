import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { contactService } from '../services/contact.service'

export class ContactDetailsPage extends Component {
    state = {
        contact: null
    }

    async componentDidMount() {
        const contact = await contactService.getContactById(this.props.match.params.id)
        this.setState({ contact })
    }

    render() {
        const { contact } = this.state
        if (!contact) return <div>Loading...</div>
        const imgUrl = `https://robohash.org/${contact._id}`

        return (
            <div className="contact-details">
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
