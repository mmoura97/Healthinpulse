import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function CaloriesChart({ data }) {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <div>
                    <h3>Calorias</h3>
                    <p>Últimas medições em tempo real</p>
                </div>

                <span className="chart-badge orange">kcal</span>
            </div>

            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />

                        <XAxis dataKey="time" tick={{ fontSize: 11 }} />

                        <YAxis domain={[0, 600]} tick={{ fontSize: 11 }} />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="calories"
                            stroke="#f97316"
                            fill="rgba(249, 115, 22, 0.18)"
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CaloriesChart;