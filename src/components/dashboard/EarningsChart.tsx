"use client";

import { useTheme } from 'next-themes';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
    { name: 'Mon', value: 140 },
    { name: 'Tue', value: 250 },
    { name: 'Wed', value: 180 },
    { name: 'Thu', value: 320 },
    { name: 'Fri', value: 290 },
    { name: 'Sat', value: 450 },
    { name: 'Sun', value: 380 },
];

export function EarningsChart() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#262626" : "#e5e5e5"} vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke={isDark ? "#525252" : "#a3a3a3"}
                        tick={{ fill: isDark ? '#737373' : '#a3a3a3', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke={isDark ? "#525252" : "#a3a3a3"}
                        tick={{ fill: isDark ? '#737373' : '#a3a3a3', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#171717' : '#ffffff',
                            borderColor: isDark ? '#262626' : '#e5e5e5',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ color: isDark ? '#fff' : '#000' }}
                        formatter={(value: number | undefined) => [value ? `$${value}` : '$0', "Earnings"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: isDark ? '#fff' : '#fff' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
