import { Component, createRef } from 'react'
import { contactService } from '../services/contact.service'

export class TransferFund extends Component {

    state = {
        amount: 0
    }

    typeInputRef = createRef()

    handleRef = (elInput) => {
        elInput?.focus()
    }

    handleChange = ({ target }) => {
        this.setState({ amount: +target.value })
    }

    onTransfer = (ev) => {
        ev.preventDefault()
        console.log('transfer:', this.state.amount)
        this.props.onTransferCoins(this.props.contact, this.state.amount)
        this.setState({ amount: 0 })
    }

    render() {
        const { contact, maxCoins, onTransferCoins } = this.props
        return (
            <section className='transfer-fund'>
                <p>Transfer coins to {contact.name}:</p>
                <form className='flex justify-center' onSubmit={this.onTransfer}>
                    <label htmlFor='amount'>Amount: </label>
                    <input ref={this.handleRef} type="number" max={maxCoins} min="0"
                        value={this.state.amount} onChange={this.handleChange}
                        id="amount" name="amount" />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}
