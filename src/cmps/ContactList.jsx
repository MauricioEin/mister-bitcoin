import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts }) {
    return (
        contacts ?
            < ul className='contact-list clean-list simple-cards-grid' >
                {contacts.map(contact =>
                    <ContactPreview
                        key={contact._id}
                        contact={contact}
                    />
                )}
            </ul >
            : <div>Loading...</div>
    )
}