'use client'

import { useMemo } from 'react'

interface DataPoint {
    label: string
    value: number
}

interface MetricsChartProps {
    data: DataPoint[]
    title?: string
    color?: string
    formatValue?: (value: number) => string
    height?: number
}

export function MetricsChart({
    data,
    title,
    color = 'var(--color-primary-500)',
    formatValue = (v) => v.toLocaleString(),
    height = 200,
}: MetricsChartProps) {
    const { maxValue, points, total } = useMemo(() => {
        const max = Math.max(...data.map((d) => d.value), 1)
        const sum = data.reduce((acc, d) => acc + d.value, 0)
        const pts = data.map((d, i) => ({
            x: (i / Math.max(data.length - 1, 1)) * 100,
            y: 100 - (d.value / max) * 100,
            ...d,
        }))
        return { maxValue: max, points: pts, total: sum }
    }, [data])

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-[var(--color-neutral-200)]">
                {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
                <div className="flex items-center justify-center h-[200px] text-[var(--color-neutral-400)]">
                    No data available
                </div>
            </div>
        )
    }

    // Create SVG path for the line
    const pathD = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ')

    // Create area path (line + bottom)
    const areaD = `${pathD} L 100 100 L 0 100 Z`

    return (
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-neutral-200)]">
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <span className="text-2xl font-bold" style={{ color }}>
                        {formatValue(total)}
                    </span>
                </div>
            )}

            <div className="relative" style={{ height }}>
                <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    {/* Grid lines */}
                    <g className="text-[var(--color-neutral-100)]">
                        {[0, 25, 50, 75, 100].map((y) => (
                            <line
                                key={y}
                                x1="0"
                                y1={y}
                                x2="100"
                                y2={y}
                                stroke="currentColor"
                                strokeWidth="0.5"
                            />
                        ))}
                    </g>

                    {/* Area fill */}
                    <path
                        d={areaD}
                        fill={color}
                        fillOpacity="0.1"
                    />

                    {/* Line */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Data points */}
                    {points.map((p, i) => (
                        <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r="1.5"
                            fill={color}
                            className="hover:r-3 transition-all"
                        />
                    ))}
                </svg>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-[var(--color-neutral-400)] -translate-x-full pr-2">
                    <span>{formatValue(maxValue)}</span>
                    <span>{formatValue(maxValue / 2)}</span>
                    <span>0</span>
                </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between mt-2 text-xs text-[var(--color-neutral-400)]">
                {data.length <= 7 ? (
                    data.map((d, i) => <span key={i}>{d.label}</span>)
                ) : (
                    <>
                        <span>{data[0]?.label}</span>
                        <span>{data[Math.floor(data.length / 2)]?.label}</span>
                        <span>{data[data.length - 1]?.label}</span>
                    </>
                )}
            </div>
        </div>
    )
}

// Simple bar chart variant
interface BarChartProps {
    data: DataPoint[]
    title?: string
    color?: string
    formatValue?: (value: number) => string
}

export function BarChart({
    data,
    title,
    color = 'var(--color-primary-500)',
    formatValue = (v) => v.toLocaleString(),
}: BarChartProps) {
    const maxValue = Math.max(...data.map((d) => d.value), 1)

    return (
        <div className="bg-white rounded-2xl p-6 border border-[var(--color-neutral-200)]">
            {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}

            <div className="space-y-3">
                {data.map((d, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{d.label}</span>
                            <span className="text-[var(--color-neutral-500)]">
                                {formatValue(d.value)}
                            </span>
                        </div>
                        <div className="h-2 bg-[var(--color-neutral-100)] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${(d.value / maxValue) * 100}%`,
                                    backgroundColor: color,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
