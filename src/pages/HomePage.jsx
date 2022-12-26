import { Component } from 'react'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export class HomePage extends Component {

    state = { user: null, rate: null }

    async componentDidMount() {
        const user = await userService.getUser()
        const rate = await bitcoinService.getRate()
        this.setState({ user, rate })
    }

    render() {
        const { user, rate } = this.state
        return (
            <div className="home-page">
                <h1>MisterBITcoin</h1>
                <img src={require('../assets/img/bit.jpeg')}/>
                <h2>{user?.name}</h2>
                <h3>Coins: {user?.coins}</h3>
                <p>One Dollar in Bitcoins: {rate}</p>
                <p>One Bitcoin in Dollars: {(1/rate).toLocaleString()}</p>
            </div >
        )
    }
}
