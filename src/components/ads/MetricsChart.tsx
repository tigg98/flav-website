'use client'

import { useMemo, useState } from 'react'

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
    minimal?: boolean
}

export function MetricsChart({
    data,
    title,
    color = '#f97316', // primary-500
    formatValue = (v) => v.toLocaleString(),
    height = 240,
    minimal = false,
}: MetricsChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const { points, areaPath, linePath } = useMemo(() => {
        if (data.length === 0) return { points: [], areaPath: '', linePath: '' }

        const max = Math.max(...data.map((d) => d.value), 1) * 1.1 // 10% headroom
        const width = 100
        const chartHeight = 100

        const pts = data.map((d, i) => ({
            x: (i / (data.length - 1)) * width,
            y: chartHeight - (d.value / max) * chartHeight,
            ...d,
        }))

        // Simple straight line interpolation
        const d = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ')

        return {
            points: pts,
            linePath: d,
            areaPath: `${d} L ${width} ${chartHeight} L 0 ${chartHeight} Z`,
        }
    }, [data])

    if (data.length === 0) {
        if (minimal) return null
        return (
            <div className="bg-background-elevated rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center h-[240px] text-neutral-400">
                No data available
            </div>
        )
    }

    const ChartContent = (
        <div className="relative w-full h-full" style={minimal ? {} : { height }} onMouseLeave={() => setHoveredIndex(null)}>
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
            >
                <defs>
                    <linearGradient id={`chartGradient-${title?.replace(/\s+/g, '') || 'default'}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={minimal ? 0.4 : 0.2} />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Lines - Hide in minimal */}
                {!minimal && [0, 25, 50, 75, 100].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="100"
                        y2={y}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="text-neutral-400"
                    />
                ))}

                {/* Area fill */}
                <path d={areaPath} fill={`url(#chartGradient-${title?.replace(/\s+/g, '') || 'default'})`} />

                {/* Line stroke */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={minimal ? 4 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Interactive Areas and Points - Hide in minimal if desired, or keep harmless */}
                {!minimal && points.map((p, i) => (
                    <g key={i}>
                        <rect
                            x={i === 0 ? 0 : (points[i - 1].x + p.x) / 2}
                            y="0"
                            width={
                                i === points.length - 1
                                    ? 100 - (points[i - 1].x + p.x) / 2
                                    : (points[i + 1].x + p.x) / 2 - (i === 0 ? 0 : (points[i - 1].x + p.x) / 2)
                            }
                            height="100"
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                        />
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="4"
                            fill={color}
                            stroke="white"
                            strokeWidth="2"
                            className={`transition-opacity duration-200 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                                } dark:stroke-neutral-800`}
                            pointerEvents="none"
                        />
                    </g>
                ))}
            </svg>

            {/* Tooltip */}
            {!minimal && hoveredIndex !== null && points[hoveredIndex] && (
                <div
                    className="absolute top-0 transform -translate-x-1/2 -translate-y-[120%] pointer-events-none z-10"
                    style={{
                        left: `${points[hoveredIndex].x}%`,
                        top: `${points[hoveredIndex].y}%`,
                    }}
                >
                    <div className="bg-neutral-900 border border-neutral-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                        <div className="font-semibold">{formatValue(points[hoveredIndex].value)}</div>
                        <div className="text-neutral-400">{points[hoveredIndex].label}</div>
                    </div>
                </div>
            )}
        </div>
    )

    if (minimal) {
        return ChartContent
    }

    return (
        <div className="bg-background-elevated rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
            )}

            {ChartContent}

            {/* X Axis Labels */}
            <div className="relative h-6 mt-4 text-xs text-neutral-500">
                {points.map((p, i) => (
                    <div
                        key={i}
                        className={`absolute top-0 whitespace-nowrap transition-colors duration-200 ${hoveredIndex === i ? 'text-primary-500 font-medium' : ''
                            }`}
                        style={{
                            left: `${p.x}%`,
                            transform: i === 0
                                ? 'translateX(0%)'
                                : i === points.length - 1
                                    ? 'translateX(-100%)'
                                    : 'translateX(-50%)'
                        }}
                    >
                        {p.label}
                    </div>
                ))}
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
