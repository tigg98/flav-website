import Image from "next/image";

interface IPhoneMockupProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    imageClassName?: string;
    size?: "sm" | "md" | "lg";
}

export function IPhoneMockup({
    src,
    alt,
    priority = false,
    className = "",
    imageClassName = "",
    size = "md"
}: IPhoneMockupProps) {
    const sizeClasses = {
        sm: "w-48 md:w-56",
        md: "w-56 md:w-64",
        lg: "w-64 md:w-72",
    };

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            {/* iPhone Frame */}
            <div className="relative">
                {/* Outer frame - titanium/stainless steel look */}
                <div
                    className="relative rounded-[3rem] p-[3px]"
                    style={{
                        background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1c 50%, #2a2a2e 100%)",
                        boxShadow: `
                            0 25px 50px -12px rgba(0, 0, 0, 0.5),
                            0 0 0 1px rgba(255, 255, 255, 0.05),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                        `
                    }}
                >
                    {/* Inner bezel */}
                    <div
                        className="relative rounded-[2.8rem] p-[2px]"
                        style={{
                            background: "linear-gradient(180deg, #1a1a1c 0%, #0a0a0a 100%)"
                        }}
                    >
                        {/* Screen area */}
                        <div className="relative rounded-[2.6rem] overflow-hidden bg-black">
                            {/* Screen content */}
                            <div className="relative w-full aspect-[9/19.5]">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className={`object-cover ${imageClassName}`}
                                    priority={priority}
                                    sizes="(max-width: 768px) 300px, 500px"
                                    quality={100}
                                />

                                {/* Dynamic Island - iPhone 17 Pro (compact) */}
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10">
                                    <div
                                        className="relative flex items-center justify-center"
                                        style={{
                                            width: "85px",
                                            height: "25px",
                                            background: "#000000",
                                            borderRadius: "14px",
                                            boxShadow: "inset 0 0 2px rgba(0,0,0,0.8)"
                                        }}
                                    >
                                        {/* Front camera */}
                                        <div
                                            className="absolute right-2.5 w-2 h-2 rounded-full"
                                            style={{
                                                background: "radial-gradient(circle at 30% 30%, #1a1a2e, #0a0a0e)",
                                                boxShadow: "inset 0 0 1px rgba(100, 100, 150, 0.3)"
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Home indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                                    <div
                                        className="w-32 h-1 rounded-full"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.3)"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side buttons - Left */}
                {/* Silent switch */}
                <div
                    className="absolute left-[-2px] top-[85px] w-[3px] h-[18px] rounded-l-sm"
                    style={{
                        background: "linear-gradient(90deg, #1a1a1c 0%, #2a2a2e 100%)"
                    }}
                />
                {/* Volume Up */}
                <div
                    className="absolute left-[-2px] top-[120px] w-[3px] h-[32px] rounded-l-sm"
                    style={{
                        background: "linear-gradient(90deg, #1a1a1c 0%, #2a2a2e 100%)"
                    }}
                />
                {/* Volume Down */}
                <div
                    className="absolute left-[-2px] top-[160px] w-[3px] h-[32px] rounded-l-sm"
                    style={{
                        background: "linear-gradient(90deg, #1a1a1c 0%, #2a2a2e 100%)"
                    }}
                />

                {/* Side button - Right (Power) */}
                <div
                    className="absolute right-[-2px] top-[130px] w-[3px] h-[48px] rounded-r-sm"
                    style={{
                        background: "linear-gradient(270deg, #1a1a1c 0%, #2a2a2e 100%)"
                    }}
                />

                {/* Subtle screen reflection */}
                <div
                    className="absolute inset-[5px] rounded-[2.5rem] pointer-events-none"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)"
                    }}
                />
            </div>
        </div>
    );
}
