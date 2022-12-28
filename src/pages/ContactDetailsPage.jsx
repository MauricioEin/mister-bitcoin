import { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'
import { sendCoins } from '../store/actions/user.actions'


class _ContactDetailsPage extends Component {
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
        const nextId = contacts[(idx + 1) % contacts.length]._id
        const prevId = contacts[(contacts.length + idx - 1) % contacts.length]._id
        this.setState({ contact, nextId, prevId })
    }


    render() {
        const { contact, nextId, prevId } = this.state
        if (!contact) return <div>Loading...</div>
        const imgUrl = `https://robohash.org/${contact._id}`

        const { sendCoins, loggedInUser } = this.props
        const movesToContact = loggedInUser.moves.filter(move => move.toId === contact._id)

        return (
            <div className="contact-details">
                <nav className='flex space-between'>
                    <Link to={`/contact/${prevId}`}> Previous</Link>
                    <Link to={`/contact/${nextId}`}> Next</Link>
                </nav>
                <div className='contact-info'>
                    <img src={imgUrl} alt="" />

                    <h1>{contact.name}</h1>
                    <h3>{contact.email}</h3>
                    <h3>{contact.phone}</h3>
                    <NavLink to={`/contact/edit/${contact._id}`}><button >Edit</button></NavLink>
                </div>
                <TransferFund
                    contact={contact}
                    onTransferCoins={sendCoins}
                    maxCoins={loggedInUser.coins} />
                <MovesList title={'Your Moves:'} moves={movesToContact} />

                {/* <div className='btns flex space-between'>
                    <NavLink to="/contact"><button >Back</button></NavLink>
                </div> */}
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    sendCoins
}
export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage)