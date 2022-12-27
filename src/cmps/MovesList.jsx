import { Component } from 'react'

export class MovesList extends Component {

    state = {
        filterBy: null
    }

    render() {
        const { title, moves, addContactName } = this.props
        return (
            <section className='moves-list'>
                <h4>{title}</h4>
                <div className='moves-container'>
                    {moves.length ? moves.map(move => <article className='move-preview' key={move.at}>
                        {addContactName && <p>To: {move.to}</p>}
                        <p>At: {new Date(move.at).toLocaleString()}</p>
                        <p>Amount: {move.amount} coins</p>
                    </article>
                    ) : <p className='empty'>No moves to show</p>}
                </div>
            </section>
        )
    }
}