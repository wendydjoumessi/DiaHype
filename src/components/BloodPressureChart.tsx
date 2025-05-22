import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { useLatestMeasurements } from '@/hooks/useLatestMeasurements';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600 font-bold">{`Systolic: ${payload[0].value} mmHg`}</p>
        <p className="text-green-600 font-bold">{`Diastolic: ${payload[1].value} mmHg`}</p>
        
        {payload[0].payload.systolicChange && (
          <p className={`text-xs ${payload[0].payload.systolicChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            Systolic: {payload[0].payload.systolicChange < 0 ? '↓' : '↑'} {Math.abs(payload[0].payload.systolicChange)} from previous
          </p>
        )}
        
        {payload[0].payload.diastolicChange && (
          <p className={`text-xs ${payload[0].payload.diastolicChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            Diastolic: {payload[0].payload.diastolicChange < 0 ? '↓' : '↑'} {Math.abs(payload[0].payload.diastolicChange)} from previous
          </p>
        )}
      </div>
    );
  }

  return null;
};

export function BloodPressureChart() {
  const { bloodPressureHistory } = useLatestMeasurements();

  // Format data for chart
  const baseChartData = bloodPressureHistory.map(record => ({
    date: format(parseISO(record.measured_at), 'MMM d'),
    rawDate: record.measured_at,
    systolic: record.systolic,
    diastolic: record.diastolic,
  }));

  // Use fallback data if no records exist
  const baseData = baseChartData.length > 0 ? baseChartData : [
    { date: 'No data', systolic: 120, diastolic: 80 }
  ];

  // Add trend indicators and changes to data
  const enhancedData = baseData.map((item, index) => {
    if (index === 0) return { ...item };
    
    const systolicPrev = baseData[index - 1].systolic;
    const diastolicPrev = baseData[index - 1].diastolic;
    const systolicCurrent = item.systolic;
    const diastolicCurrent = item.diastolic;
    
    return { 
      ...item, 
      systolicChange: systolicCurrent - systolicPrev,
      diastolicChange: diastolicCurrent - diastolicPrev
    };
  });

  // Calculate overall trend if there is data
  const calculateTrend = () => {
    if (baseChartData.length < 2) return { systolicDiff: 0, diastolicDiff: 0 };
    
    const firstSystolic = baseChartData[0].systolic;
    const lastSystolic = baseChartData[baseChartData.length - 1].systolic;
    const systolicDiff = lastSystolic - firstSystolic;
    
    const firstDiastolic = baseChartData[0].diastolic;
    const lastDiastolic = baseChartData[baseChartData.length - 1].diastolic;
    const diastolicDiff = lastDiastolic - firstDiastolic;
    
    return { systolicDiff, diastolicDiff };
  };
  
  const { systolicDiff, diastolicDiff } = calculateTrend();

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
      {baseChartData.length > 1 ? (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Blood pressure trend: 
            <span className={(systolicDiff <= 0 && diastolicDiff <= 0) ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {(systolicDiff <= 0 && diastolicDiff <= 0) ? 'Decreased by ' : 'Changed by '}
              {Math.abs(systolicDiff)}/{Math.abs(diastolicDiff)} mmHg
            </span> over the displayed period
          </p>
        </div>
      ) : (
        <div className="mt-3 text-center text-sm text-gray-500">
          <p>Not enough data to calculate blood pressure trend. Record more measurements.</p>
        </div>
      )}
    </div>
  );
}
