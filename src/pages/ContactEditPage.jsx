import { useCallback, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { contactService } from '../services/contact.service'
import { useDispatch } from 'react-redux'
import { removeContact, saveContact } from '../store/actions/contact.actions'


export function ContactEditPage({ history }) {
    const [contact, setContact] = useState(contactService.getEmptyContact())
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        loadContact()
    }, [])

    const loadContact = async () => {
        const contactId = params.id
        if (!contactId) return
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
    }

    const submitContact = (ev) => {
        ev.preventDefault()
        try {
            dispatch(saveContact({ ...contact }))
            history.push('/contact/' + (contact._id||''))
        } catch (err) {
            console.log('err:', err)
        }
    }

    const handleChange = ({ target }) => {
        const { name: field, value } = target
        setContact(contact => ({ ...contact, [field]: value }))
    }

    const deleteContact = () => {
        try {
            dispatch(removeContact(contact._id))
            history.push('/contact')
        } catch (err) {
            console.log('error deleting contact:', err)
        }
    }

    const handleRef = useCallback((el) => {
        el?.focus()
    }, [])

    const imgUrl = `https://robohash.org/${contact._id}`

    return (
        <div className="contact-edit">
            <h2>{contact._id ? 'Edit Contact' : 'Add Contact'}</h2>
            {contact._id && <img src={imgUrl} />}
            <form onSubmit={submitContact} className='flex column'>
                <label ref={handleRef}>Name
                    <input onChange={handleChange} value={contact.name} type='text' name='name' />
                </label>
                <label >Email
                    <input onChange={handleChange} value={contact.email} type='email' name='email' />
                </label>
                <label >Phone
                    <input onChange={handleChange} value={contact.phone} type='text' name='phone' />
                </label>
                <button>Save</button>
            </form>

            <NavLink to={`/contact/${contact._id}`}><button>Back</button></NavLink>
            <button onClick={deleteContact} className='delBtn'>Delete contact</button>

        </div >
    )
}
