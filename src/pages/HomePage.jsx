import { useEffect, useState } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { MovesList } from '../cmps/MovesList'
import bitcoinImg from '../assets/img/bit.jpeg'

export function HomePage() {

    const [user, setUser] = useState(null)
    const [rate, setRate] = useState(null)

    useEffect(() => {
        ; (async () => {
            const user = await userService.getUser()
            setUser(user)
            const rate = await bitcoinService.getRate()
            setRate(rate)
        })()
    }, [])

    if (!user) return <h4>Loading...</h4>
    return (
        <div className="home-page">
            <h1>MisterBITcoin</h1>
            <img src={bitcoinImg} />
            <h2>Welcome {user.name}</h2>
            <h3>Coins: {user.coins}</h3>
            <p><span>Dollar to Bitcoin: {rate}</span>
                <span className='circle'>•</span>
                <span>Bitcoin to Dollar: {(1 / rate).toLocaleString()}</span></p>
            <MovesList title={'Your last 3 moves:'} moves={user.moves.slice(0, 3)} addContactName={true} />
        </div >
    )
}
