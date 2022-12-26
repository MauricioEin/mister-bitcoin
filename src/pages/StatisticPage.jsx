import { Component } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export class StatisticPage extends Component {
    state = {
        marketPrice: null,
        confirmedTransactions: null
    }
    async componentDidMount() {
        const marketPrice = await bitcoinService.getMarketPrice()
        const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
        this.setState({ marketPrice, confirmedTransactions })
    }

    render() {
        const { marketPrice, confirmedTransactions } = this.state
        return (
            <div className="statistic-page">
                <h1>STATISTICS</h1>
                {marketPrice && <Chart data={marketPrice} />}
                {confirmedTransactions && <Chart data={confirmedTransactions} />}
            </div >
        )
    }
}
