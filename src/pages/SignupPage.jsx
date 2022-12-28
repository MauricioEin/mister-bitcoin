import imgUrl from '../assets/img/bitcoin.png'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/user.actions'

export function SignupPage({ history }) {
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleRef = (elInput) => {
        elInput?.focus()
    }

    const handleChange = ({ target }) => {
        setName(target.value)
    }

    const onSignup = () => {
        if (!name) return
        dispatch(signup(name))
        history.push('/')
    }

    return (
        <div className="signup-page">
            <img src={imgUrl} />
            <h3>Please enter your name:</h3>
            <label htmlFor='name'>
                <input ref={handleRef} value={name} onChange={handleChange} type="text" id="name" />
                <button onClick={onSignup}>Sign up</button>
            </label>
        </div >
    )
}

