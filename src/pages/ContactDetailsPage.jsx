import { useEffect, useState } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { MovesList } from '../cmps/MovesList'
import { TransferFund } from '../cmps/TransferFund'
import { contactService } from '../services/contact.service'
import { useDispatch, useSelector } from 'react-redux'
import { sendCoins } from '../store/actions/user.actions'


export function ContactDetailsPage() {
    const [contact, setContact] = useState(null)
    const [prevNextIds, setPrevNextIds] = useState({})
    const params = useParams()
    const loggedInUser = useSelector(state=>state.userModule.loggedInUser)
    const dispatch = useDispatch()


    useEffect(() => { loadContact() }, [params.id])

    const loadContact = async () => {
        const id = params.id
        const contact = await contactService.getContactById(id)
        setContact(contact)
        // for prev and next:
        const contacts = await contactService.getContacts()
        const idx = contacts.findIndex(contact => contact._id === id)
        const nextId = contacts[(idx + 1) % contacts.length]._id
        const prevId = contacts[(contacts.length + idx - 1) % contacts.length]._id
        setPrevNextIds({ prevId, nextId })
    }

    if (!contact) return <div>Loading...</div>
    const { nextId, prevId } = prevNextIds
    const imgUrl = `https://robohash.org/${contact._id}`
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
                onTransferCoins={(contact, amount)=>dispatch(sendCoins(contact, amount))}
                maxCoins={loggedInUser.coins} />
            <MovesList title={`Your Moves to ${contact.name.split(' ')[0]}:`} moves={movesToContact} />
        </div >
    )
}
