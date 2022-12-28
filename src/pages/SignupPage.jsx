import imgUrl from '../assets/img/bitcoin.png'
import { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { signup } from '../store/actions/user.actions'

// import { userService } from '../services/user.service'
// import { bitcoinService } from '../services/bitcoin.service'

class _SignupPage extends Component {

    state = { name: '' }

    typeInputRef = createRef()

    handleRef = (elInput) => {
        elInput?.focus()
    }

    handleChange = ({ target }) => {
        this.setState({ name: target.value })
    }

    onSignup = () => {
        if(!this.state.name) return
        this.props.signup(this.state.name)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="signup-page">
                <img src={imgUrl} />
                <h3>Please enter your name:</h3>
                <label htmlFor='name'>
                    <input ref={this.handleRef} value={this.state.name} onChange={this.handleChange} type="text" id="name" />
                    <button onClick={this.onSignup}>Sign up</button>
                </label>
            </div >
        )
    }
}


const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
    signup
}
export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)