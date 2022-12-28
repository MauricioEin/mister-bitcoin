import { Component, createRef } from 'react'
import { contactService } from '../services/contact.service'

export class TransferFund extends Component {

    state = {
        amount: 0
    }

    typeInputRef = createRef()

    handleChange = ({ target }) => {
        this.setState({ amount: +target.value })
    }

    onTransfer = (ev) => {
        ev.preventDefault()
        if (!this.state.amount) return
        this.props.onTransferCoins(this.props.contact, this.state.amount)
        this.setState({ amount: 0 })
    }

    render() {
        const { contact, maxCoins } = this.props
        return (
            <section className='transfer-fund'>
                <p>Transfer coins to {contact.name}:</p>
                <form className='flex justify-center wrap' onSubmit={this.onTransfer}>
                    <label htmlFor='amount'>Amount: </label>
                    <input type="number" max={maxCoins} min="0"
                        value={this.state.amount} onChange={this.handleChange}
                        id="amount" name="amount" />
                    <button>Transfer</button>
                </form>
            </section>
        )
    }
}
