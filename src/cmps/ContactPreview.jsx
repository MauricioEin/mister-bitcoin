import { Link } from "react-router-dom";

export function ContactPreview({ contact }) {


    const imgUrl = `https://robohash.org/${contact._id}`
    return (

        <li className="contact-preview">
            <Link to={`/contact/${contact._id}`}>
                <img src={imgUrl} alt="" />
                <section className="info">
                    <h2>{contact.name}</h2>
                    <h4>{contact.email}</h4>
                    <h4>{contact.phone}</h4>
                </section>
                {/* <section className="actions">
                <button onClick={() => onRemoveContact(contact._id)}>X</button>
            </section> */}
            </Link>
        </li>

    )
}
