"use client";

import Image from "next/image";

interface IPhoneMockupProps {
    src?: string;
    alt?: string;
    priority?: boolean;
    className?: string;
    imageClassName?: string;
    size?: "sm" | "md" | "lg";
    showBackdrop?: boolean;
    children?: React.ReactNode;
}

export function IPhoneMockup({
    src,
    alt,
    priority = false,
    className = "",
    imageClassName = "",
    size = "md",
    showBackdrop = false,
    children
}: IPhoneMockupProps) {
    const sizeClasses = {
        sm: "w-48 md:w-56",
        md: "w-56 md:w-64",
        lg: "w-64 md:w-72",
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* Frosted Glass Backdrop */}
            {showBackdrop && (
                <div className="absolute -inset-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-[3.5rem] -z-10 border border-white/20 dark:border-white/5 shadow-2xl" />
            )}

            {/* iPhone Frame - iPhone 17 Pro Style */}
            <div className="relative z-10">
                {/* Outer frame - titanium/stainless steel look - Natural Titanium Color */}
                <div
                    className="relative rounded-[3.0rem] p-[3px] shadow-2xl"
                    style={{
                        background: "linear-gradient(145deg, #8b8b8b 0%, #e2e2e2 30%, #a4a4a4 50%, #616161 100%)",
                        boxShadow: `
                            0 25px 50px -12px rgba(0, 0, 0, 0.4),
                            inset 0 0 2px rgba(255, 255, 255, 0.4)
                        `
                    }}
                >
                    {/* Inner titanium ring */}
                    <div className="absolute inset-[1px] rounded-[2.9rem] bg-[#2a2a2a] z-0" />

                    {/* Screen bezel - ultra thin */}
                    <div className="relative rounded-[2.9rem] bg-black p-[3px] overflow-hidden z-10">
                        {/* Screen content — neutral backdrop so an unloaded screenshot reads as a lit screen, not a dead black slab */}
                        <div className="relative w-full aspect-[9/19.5] rounded-[2.7rem] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                            {src ? (
                                <Image
                                    src={src}
                                    alt={alt || "Flav app screenshot"}
                                    fill
                                    className={`object-cover ${imageClassName}`}
                                    priority={priority}
                                    sizes="(max-width: 768px) 300px, 500px"
                                    quality={85}
                                />
                            ) : (
                                <div className="w-full h-full overflow-y-auto bg-white dark:bg-neutral-900 scroll-smooth overscroll-y-contain pointer-events-auto z-0" style={{ scrollbarWidth: 'none' }}>
                                    <style jsx>{`
                                        div::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    {children}
                                </div>
                            )}

                            {/* Dynamic Island - Smaller/Sleeker */}
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20">
                                <div
                                    className="relative flex items-center justify-center transition-all duration-300 ease-spring"
                                    style={{
                                        width: "80px",
                                        height: "22px",
                                        background: "#000000",
                                        borderRadius: "20px",
                                    }}
                                >
                                    {/* Camera lens reflection */}
                                    <div className="absolute right-2.5 w-2 h-2 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                        <div className="w-1 h-1 rounded-full bg-[#0d0d29]/60 backdrop-blur-sm" />
                                        <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-blue-400/30 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Home indicator */}
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20">
                                <div className="w-28 h-1 rounded-full bg-white/40 backdrop-blur-md" />
                            </div>

                            {/* Screen gloss/reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Side buttons - Action Button + Vol - Sleeker */}
                <div className="absolute left-[-2px] top-[100px] w-[2px] h-[20px] bg-[#616161] rounded-l-sm" /> {/* Action Btn */}
                <div className="absolute left-[-2px] top-[140px] w-[2px] h-[36px] bg-[#616161] rounded-l-sm" /> {/* Vol Up */}
                <div className="absolute left-[-2px] top-[185px] w-[2px] h-[36px] bg-[#616161] rounded-l-sm" /> {/* Vol Down */}
                <div className="absolute right-[-2px] top-[130px] w-[2px] h-[60px] bg-[#616161] rounded-r-sm" /> {/* Power */}
            </div>
        </div>
    );
}
