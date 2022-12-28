import { useState } from 'react'

export function TransferFund({ contact, maxCoins, onTransferCoins }) {
    const [amount, setAmount] = useState(0)

    const handleChange = ({ target }) => {
        setAmount(+target.value)
    }

    const onTransfer = (ev) => {
        ev.preventDefault()
        if (!amount) return
        onTransferCoins(contact, amount)
        setAmount(0)
    }

    return (
        <section className='transfer-fund'>
            <p>Transfer coins to {contact.name}:</p>
            <form className='flex justify-center wrap' onSubmit={onTransfer}>
                <label htmlFor='amount'>Amount: </label>
                <input type="number" max={maxCoins} min="0"
                    value={amount} onChange={handleChange}
                    id="amount" name="amount" />
                <button>Transfer</button>
            </form>
        </section>
    )
}

