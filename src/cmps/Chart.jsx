
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts"


export function Chart({ data }) {
    const { name, unit, period, description, values } = data
    const stats = values?.map(coords => ({ [period]: new Date(coords.x * 1000).toLocaleDateString(), [unit]: coords.y }))

    const getRandomColor = () => {
        const colorChars = '0123456789abcdef'
        var colorStr = '#'
        for (var i = 0; i < 6; i++) {
            colorStr += colorChars.charAt(Math.random() * colorChars.length)
        }
        return colorStr
    }
    const color = getRandomColor()
    return (
        <div className="chart">
            <h4>{name}</h4>
            <p>{description}</p>
            <AreaChart
                width={800}
                height={300}
                data={stats}
                margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={period} />
                <YAxis tickFormatter={num => {
                    return num.toLocaleString()
                }} />
                <Tooltip />
                <Area type="monotone" dataKey={unit} stroke={color} fill={color} />
            </AreaChart>        </div>
    )
}
