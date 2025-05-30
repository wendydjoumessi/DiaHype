import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useLatestMeasurements } from '@/hooks/useLatestMeasurements';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const highAlert = payload[0].value > 160;
    const lowAlert = payload[0].value < 80;
    
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{`${label}`}</p>
        <p className={`font-bold ${highAlert ? 'text-red-600' : lowAlert ? 'text-yellow-600' : 'text-blue-600'}`}>
          {`${payload[0].value} ${payload[0].unit || 'mg/dL'}`}
        </p>
        <p className="text-xs text-gray-600 mt-1">{payload[0].payload.mealContext || ''}</p>
        
        {highAlert && (
          <p className="text-xs text-red-600 mt-1">
            Above target range
          </p>
        )}
        
        {lowAlert && (
          <p className="text-xs text-yellow-600 mt-1">
            Below target range
          </p>
        )}
        
        {!highAlert && !lowAlert && (
          <p className="text-xs text-green-600 mt-1">
            Within target range
          </p>
        )}
      </div>
    );
  }

  return null;
};

export function GlucoseChart() {
  const { bloodSugarHistory } = useLatestMeasurements();
  
  // Format data for chart
  const chartData = bloodSugarHistory.map(record => ({
    time: format(parseISO(record.measured_at), 'MMM d, h:mm a'),
    value: record.glucose_level,
    unit: record.unit,
    mealContext: record.meal_context,
    date: record.measured_at
  }));

  // Use fallback data if no records exist
  const data = chartData.length > 0 ? chartData : [
    { time: 'No data', value: 100, unit: 'mg/dL', mealContext: 'No data available' }
  ];

  // Calculate trend over displayed period if there is data
  const calculateTrend = () => {
    if (chartData.length < 2) return { difference: 0, percentChange: '0.0' };
    
    const firstValue = chartData[0].value;
    const lastValue = chartData[chartData.length - 1].value;
    const difference = lastValue - firstValue;
    const percentChange = ((difference / firstValue) * 100).toFixed(1);
    
    return { difference, percentChange };
  };
  
  const { difference, percentChange } = calculateTrend();
  
  return (
    <div className="w-full h-[300px] glucose-chart">
      <div className="mb-2 flex justify-end gap-2 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span>Blood Glucose</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-1 bg-red-500 mr-1"></span>
          <span>Target Range</span>
        </div>
      </div>
      
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
            interval={1}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            domain={[70, 180]} 
            ticks={[70, 100, 130, 160, 180]} 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={160} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'High', position: 'right', fill: '#EF4444', fontSize: 12 }} />
          <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Low', position: 'right', fill: '#EF4444', fontSize: 12 }} />
          <ReferenceLine y={130} stroke="#10B981" strokeDasharray="3 3" strokeWidth={1} />
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0EA5E9" 
            strokeWidth={3}
            dot={{ stroke: '#0EA5E9', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2, fill: '#fff' }}
            connectNulls={true}
          />
        </LineChart>
      </ResponsiveContainer>
      {chartData.length > 1 && (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Glucose trend: <span className={difference < 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {difference < 0 ? 'Decreased by ' : 'Increased by '}
            {Math.abs(difference)} mg/dL ({Math.abs(Number(percentChange))}%)
          </span> over the displayed period</p>
        </div>
      )}
      {chartData.length <= 1 && (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Not enough data to calculate glucose trend. Record more measurements.</p>
        </div>
      )}
    </div>
  );
}
