import { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { MovesList } from '../cmps/MovesList'

export class HomePage extends Component {

    state = { user: null, rate: null }

    async componentDidMount() {
        const user = await userService.getUser()
        const rate = await bitcoinService.getRate()
        this.setState({ user, rate })
    }

    render() {
        const { user, rate } = this.state
        if (!user) return <h4>Loading...</h4>
        return (
            <div className="home-page">
                <h1>MisterBITcoin</h1>
                <img src={require('../assets/img/bit.jpeg')}/>
                <h2>Welcome {user.name}</h2>
                <h3>Coins: {user.coins}</h3>
                <p><span>Dollar to Bitcoin: {rate}</span> 🞄 <span>Bitcoin to Dollar: {(1/rate).toLocaleString()}</span></p>
                <MovesList title={'Your last 3 moves:'} moves={user.moves.slice(0,3)} addContactName={true}/>
            </div >
        )
    }
}
