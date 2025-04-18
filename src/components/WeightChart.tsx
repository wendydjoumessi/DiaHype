
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

// Enhanced mock data for weight chart showing progression over time
const data = [
  { date: '2023-04-01', value: 87.5 },
  { date: '2023-04-04', value: 86.8 },
  { date: '2023-04-07', value: 86.2 },
  { date: '2023-04-10', value: 85.2 },
  { date: '2023-04-13', value: 84.7 },
  { date: '2023-04-16', value: 84.3 },
  { date: '2023-04-19', value: 83.8 },
  { date: '2023-04-22', value: 83.5 },
  { date: '2023-04-25', value: 83.1 },
  { date: '2023-04-28', value: 82.7 },
  { date: '2023-05-01', value: 82.3 },
  { date: '2023-05-04', value: 81.9 },
  { date: '2023-05-07', value: 81.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{date}</p>
        <p className="text-health-primary font-bold">{`${payload[0].value} kg`}</p>
        {payload[0].payload.trend && (
          <p className={`text-sm ${payload[0].payload.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
            {payload[0].payload.trend === 'down' 
              ? `↓ ${payload[0].payload.change.toFixed(1)} kg`
              : `↑ ${payload[0].payload.change.toFixed(1)} kg`
            } from previous
          </p>
        )}
      </div>
    );
  }

  return null;
};

export function WeightChart() {
  // Add trend indicators and changes to data
  const enhancedData = data.map((item, index) => {
    if (index === 0) return { ...item };
    
    const prev = data[index - 1].value;
    const current = item.value;
    const change = Math.abs(current - prev);
    const trend = current < prev ? 'down' : 'up';
    
    return { 
      ...item, 
      trend, 
      change 
    };
  });

  // Calculate ideal weight range based on height (example: for 175cm)
  const heightInM = 1.75;
  const idealWeightLower = Math.round((18.5 * heightInM * heightInM) * 10) / 10;
  const idealWeightUpper = Math.round((24.9 * heightInM * heightInM) * 10) / 10;

  return (
    <div className="w-full h-[300px]">
      <div className="mb-2 flex justify-end gap-2 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span>Weight</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-1 bg-green-500 mr-1"></span>
          <span>Ideal Range</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-1 bg-red-500 mr-1"></span>
          <span>Upper Limit</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={enhancedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.getDate() + '/' + (date.getMonth() + 1);
            }}
          />
          <YAxis 
            domain={['dataMin - 3', 'dataMax + 3']}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={90} stroke="#EF4444" strokeDasharray="3 3" /> 
          <ReferenceLine y={idealWeightUpper} stroke="#10B981" strokeDasharray="3 3" />
          <ReferenceLine y={idealWeightLower} stroke="#10B981" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="value" 
            name="Weight (kg)"
            stroke="#0EA5E9" 
            strokeWidth={3}
            dot={{ stroke: '#0EA5E9', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2, fill: '#fff' }}
          />
          <text x={50} y={40} fill="#EF4444" fontSize={10}>Upper limit</text>
          <text x={50} y={idealWeightUpper * 2.5} fill="#10B981" fontSize={10}>Ideal range</text>
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 text-center text-sm text-gray-500">
        <p>Weight trend: <span className="text-green-600 font-medium">Down 5.2 kg</span> over the last month</p>
      </div>
    </div>
  );
}
