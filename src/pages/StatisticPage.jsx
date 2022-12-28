import { useEffect, useState } from 'react'
import { Chart } from '../cmps/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export function StatisticPage() {
    const [marketPrice, setMarketPrice] = useState(null)
    const [confirmedTransactions, setconfirmedTransactions] = useState(null)

    useEffect(() => {
        ; (async () => {
            const marketPrice = await bitcoinService.getMarketPrice()
            setMarketPrice(marketPrice)
            const confirmedTransactions = await bitcoinService.getConfirmedTransactions()
            setconfirmedTransactions(confirmedTransactions)
        })()
    }, [])

    return (
        <div className="statistic-page">
            <h1>STATISTICS</h1>
            {marketPrice && <Chart data={marketPrice} />}
            {confirmedTransactions && <Chart data={confirmedTransactions} />}
        </div >
    )
}
