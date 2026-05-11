import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

export default function Charts({ historicoBpm }) {
  const data = historicoBpm.map((valor, index) => ({
    name: index + 1,
    bpm: valor,
  }))

  return (
    <div className="chart-card">
      <h3>Histórico BPM</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bpm" stroke="#0d6efd" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}