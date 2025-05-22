
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useLatestMeasurements } from '@/hooks/useLatestMeasurements';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-health-primary font-bold">{`${payload[0].value} ${payload[0].unit || 'kg'}`}</p>
        {payload[0].payload.trend && (
          <p className={`text-sm ${payload[0].payload.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
            {payload[0].payload.trend === 'down' 
              ? `↓ ${payload[0].payload.change.toFixed(1)} ${payload[0].payload.unit || 'kg'}`
              : `↑ ${payload[0].payload.change.toFixed(1)} ${payload[0].payload.unit || 'kg'}`
            } from previous
          </p>
        )}
      </div>
    );
  }

  return null;
};

export function WeightChart() {
  const { weightHistory } = useLatestMeasurements();
  
  // Format data for chart
  const baseChartData = weightHistory.map(record => ({
    date: format(parseISO(record.timestamp), 'MMM d'),
    value: record.weight,
    unit: record.unit
  }));

  // Use fallback data if no records exist
  const baseData = baseChartData.length > 0 ? baseChartData : [
    { date: 'No data', value: 80, unit: 'kg' }
  ];

  // Add trend indicators and changes to data
  const enhancedData = baseData.map((item, index) => {
    if (index === 0) return { ...item };
    
    const prev = baseData[index - 1].value;
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
  const heightInM = 1.75; // This should ideally come from user profile
  const idealWeightLower = Math.round((18.5 * heightInM * heightInM) * 10) / 10;
  const idealWeightUpper = Math.round((24.9 * heightInM * heightInM) * 10) / 10;

  // Calculate overall trend
  const calculateTrend = () => {
    if (baseChartData.length < 2) return { difference: 0 };
    
    const firstWeight = baseChartData[0].value;
    const lastWeight = baseChartData[baseChartData.length - 1].value;
    const difference = lastWeight - firstWeight;
    
    return { difference };
  };
  
  const { difference } = calculateTrend();

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
          />
          <YAxis 
            domain={[(dataMin) => Math.max(dataMin - 5, 0), (dataMax) => dataMax + 5]}
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
      {baseChartData.length > 1 ? (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Weight trend: 
            <span className={difference < 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {difference < 0 ? 'Down ' : 'Up '}
              {Math.abs(difference).toFixed(1)} {baseData[0].unit || 'kg'}
            </span> over the displayed period
          </p>
        </div>
      ) : (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Not enough data to calculate weight trend. Record more measurements.</p>
        </div>
      )}
    </div>
  );
}
