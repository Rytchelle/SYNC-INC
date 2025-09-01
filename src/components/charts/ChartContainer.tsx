import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { ResponsiveContainer, LineChart, BarChart, AreaChart, PieChart, RadialBarChart, Line, Bar, Area, Pie, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

interface ChartData {
  [key: string]: string | number;
}

interface ChartContainerProps {
  title: string;
  data: ChartData[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'radial';
  height?: number;
  width?: string;
  margin?: { top: number; right: number; left: number; bottom: number };
  colors?: string[];
  xAxisDataKey?: string;
  dataKeys?: string[];
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  data,
  type,
  height = 300,
  width = '100%',
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  colors = ['#f38220', '#e71008', '#07880e', '#f38524', '#9c7049'],
  xAxisDataKey,
  dataKeys = []
}) => {
  const commonProps = {
    data,
    height,
    width: typeof width === 'string' ? undefined : width,
    margin
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2, fill: colors[index % colors.length] }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart {...commonProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent || 0 * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKeys[0] || 'value'}
            >
              {data.map((_item, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      case 'radial':
        return (
          <RadialBarChart {...commonProps}>
            <RadialBar
              data={data}
              cx="50%"
              cy="50%"
              dataKey={dataKeys[0] || 'value'}
              label={{ position: 'insideStart', fill: '#fff' }}
            >
              {data.map((_item, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </RadialBar>
            <Tooltip />
            <Legend />
          </RadialBarChart>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardHeader
        title={title}
        sx={{
          backgroundColor: 'var(--accent)',
          '& .MuiCardHeader-title': {
            color: 'var(--primary)',
            fontWeight: 600,
          },
        }}
      />
      <CardContent sx={{ padding: 0 }}>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartContainer; 