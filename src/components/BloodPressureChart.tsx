import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

// Enhanced mock data for blood pressure chart showing progression over time
const data = [
  { date: '2023-04-01', systolic: 149, diastolic: 94 },
  { date: '2023-04-04', systolic: 146, diastolic: 92 },
  { date: '2023-04-07', systolic: 143, diastolic: 90 },
  { date: '2023-04-10', systolic: 142, diastolic: 88 },
  { date: '2023-04-13', systolic: 139, diastolic: 87 },
  { date: '2023-04-16', systolic: 135, diastolic: 85 },
  { date: '2023-04-19', systolic: 132, diastolic: 84 },
  { date: '2023-04-22', systolic: 128, diastolic: 82 },
  { date: '2023-04-25', systolic: 130, diastolic: 83 },
  { date: '2023-04-28', systolic: 127, diastolic: 81 },
  { date: '2023-05-01', systolic: 125, diastolic: 80 },
  { date: '2023-05-04', systolic: 124, diastolic: 79 },
  { date: '2023-05-07', systolic: 123, diastolic: 78 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const systolicChange = payload[0].payload.systolicChange;
    const diastolicChange = payload[0].payload.diastolicChange;
    
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{date}</p>
        <p className="text-blue-600 font-bold">{`Systolic: ${payload[0].value} mmHg`}</p>
        <p className="text-green-600 font-bold">{`Diastolic: ${payload[1].value} mmHg`}</p>
        
        {systolicChange && (
          <p className={`text-xs ${systolicChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            Systolic: {systolicChange < 0 ? '↓' : '↑'} {Math.abs(systolicChange)} from previous
          </p>
        )}
        
        {diastolicChange && (
          <p className={`text-xs ${diastolicChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            Diastolic: {diastolicChange < 0 ? '↓' : '↑'} {Math.abs(diastolicChange)} from previous
          </p>
        )}
      </div>
    );
  }

  return null;
};

export function BloodPressureChart() {
  // Add trend indicators and changes to data
  const enhancedData = data.map((item, index) => {
    if (index === 0) return { ...item };
    
    const systolicPrev = data[index - 1].systolic;
    const diastolicPrev = data[index - 1].diastolic;
    const systolicCurrent = item.systolic;
    const diastolicCurrent = item.diastolic;
    
    return { 
      ...item, 
      systolicChange: systolicCurrent - systolicPrev,
      diastolicChange: diastolicCurrent - diastolicPrev
    };
  });

  return (
    <div className="w-full h-[300px]">
      <div className="mb-2 flex justify-end gap-2 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
          <span>Systolic</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span>Diastolic</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-1 bg-red-500 mr-1"></span>
          <span>Hypertension threshold</span>
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
            domain={[60, 160]}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36}/>
          
          {/* Reference lines for hypertension thresholds */}
          <ReferenceLine y={140} stroke="#EF4444" strokeDasharray="3 3" />
          <ReferenceLine y={90} stroke="#EF4444" strokeDasharray="3 3" />
          
          <Line 
            type="monotone" 
            dataKey="systolic" 
            name="Systolic"
            stroke="#3B82F6" 
            strokeWidth={2.5}
            dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="diastolic" 
            name="Diastolic"
            stroke="#10B981" 
            strokeWidth={2.5}
            dot={{ stroke: '#10B981', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
          />
          
          <text x={50} y={85} fill="#EF4444" fontSize={10}>Diastolic high</text>
          <text x={50} y={135} fill="#EF4444" fontSize={10}>Systolic high</text>
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 text-center text-sm text-gray-500">
        <p>Blood pressure trend: <span className="text-green-600 font-medium">Decreased by 26/16 mmHg</span> over the last month</p>
      </div>
    </div>
  );
}
