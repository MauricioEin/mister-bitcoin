import { useState, useEffect } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function ContactFilter(props) {

    const [filterBy, setFilterBy] = useState({...props.filterBy})

    useEffectUpdate(() => {
        console.log('update');
        props.onChangeFilter({ ...filterBy })
    }, [filterBy])

    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    if (!filterBy) return <div>Loading...</div>
    const { term } = filterBy
    return (
        <form className='contact-filter'>
            <section>
                <label htmlFor="term"></label>
                <input onChange={handleChange}
                    value={term} type="text" name="term" id="term" placeholder='Search for a contact' />
            </section>
        </form>
    )
}
