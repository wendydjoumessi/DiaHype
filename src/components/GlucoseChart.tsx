
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { time: '12 AM', value: 115 },
  { time: '3 AM', value: 105 },
  { time: '7 AM', value: 135 },
  { time: '9 AM', value: 160 },
  { time: '12 PM', value: 145 },
  { time: '3 PM', value: 130 },
  { time: '6 PM', value: 150 },
  { time: '9 PM', value: 125 },
  { time: '11 PM', value: 120 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-health-primary font-bold">{`${payload[0].value} mg/dL`}</p>
      </div>
    );
  }

  return null;
};

export function GlucoseChart() {
  return (
    <div className="w-full h-[300px] glucose-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            domain={[70, 200]} 
            ticks={[70, 100, 130, 160, 200]} 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={180} stroke="#EF4444" strokeDasharray="3 3" />
          <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0EA5E9" 
            strokeWidth={3}
            dot={{ stroke: '#0EA5E9', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2, fill: '#fff' }}
          />
          <text x={50} y={85} fill="#EF4444" fontSize={10}>Low</text>
          <text x={50} y={175} fill="#EF4444" fontSize={10}>High</text>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
