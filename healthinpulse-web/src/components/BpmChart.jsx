import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

function BpmChart({ data }) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <div>
                    <h3>Frequência Cardíaca</h3>
                    <p>Últimas medições em tempo real</p>
                </div>

                <span className="chart-badge">
                    BPM
                </span>
            </div>

            <div className="chart-wrapper">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 11 }}
                        />

                        <YAxis
                            domain={[40, 180]}
                            tick={{ fontSize: 11 }}
                        />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="bpm"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BpmChart;