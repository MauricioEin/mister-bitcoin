import { useState } from "react"

export function MovesList(props) {

    const [isShow, setIsShow] = useState(false)

    const toggleShow = () => {
        setIsShow(prevIsShow => ({ isShow: !prevIsShow }))
    }
    const { title, moves, addContactName } = props
    const btnTxt = isShow ? 'Hide moves' : 'Show moves'
    const showClass = isShow && moves.length > 1 ? 'show' : ''
    return (
        <section className={'moves-list ' + showClass}>
            <h4>{title}</h4>
            <div className='moves-container'>
                {moves.length ?
                    isShow && moves.map(move => <article className='move-preview' key={move.at}>
                        {addContactName && <p>To: {move.to}</p>}
                        <p>At: {new Date(move.at).toLocaleString()}</p>
                        <p>Amount: {move.amount} coins</p>
                    </article>
                    )
                    : <p className='empty'>No moves to show</p>}
            </div>
            {!!moves.length && <button onClick={toggleShow}>{btnTxt}</button>}
        </section >
    )
}
