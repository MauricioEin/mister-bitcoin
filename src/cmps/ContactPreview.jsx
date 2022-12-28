import { Link } from "react-router-dom";

export function ContactPreview({ contact }) {


    const imgUrl = `https://robohash.org/${contact._id}`
    return (

        <li className="contact-preview">
            <Link to={`/contact/${contact._id}`}>
                <section className="info">
                    <h2>{contact.name}</h2>
                    <h5>{contact.phone}</h5>
                </section>
                <img src={imgUrl} alt="" />
            </Link>
        </li>

    )
}
