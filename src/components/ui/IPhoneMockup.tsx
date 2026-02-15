import Image from "next/image";

interface IPhoneMockupProps {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    imageClassName?: string;
    size?: "sm" | "md" | "lg";
    showBackdrop?: boolean;
}

export function IPhoneMockup({
    src,
    alt,
    priority = false,
    className = "",
    imageClassName = "",
    size = "md",
    showBackdrop = false
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

            {/* iPhone Frame */}
            <div className="relative z-10">
                {/* Outer frame - titanium/stainless steel look - Natural Titanium Color */}
                <div
                    className="relative rounded-[3.5rem] p-[4px]"
                    style={{
                        background: "linear-gradient(145deg, #787672 0%, #ddddda 30%, #a4a29e 50%, #686663 100%)",
                        boxShadow: `
                            0 25px 50px -12px rgba(0, 0, 0, 0.4),
                            inset 0 0 4px rgba(255, 255, 255, 0.3)
                        `
                    }}
                >
                    {/* Inner titanium ring */}
                    <div className="absolute inset-[1px] rounded-[3.4rem] bg-[#2a2a2a] z-0" />

                    {/* Screen bezel */}
                    <div className="relative rounded-[3.2rem] bg-black p-[6px] overflow-hidden z-10 border-[3px] border-black">
                        {/* Screen content */}
                        <div className="relative w-full aspect-[9/19.5] rounded-[2.8rem] overflow-hidden bg-black">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className={`object-cover ${imageClassName}`}
                                priority={priority}
                                sizes="(max-width: 768px) 300px, 500px"
                                quality={100}
                            />

                            {/* Dynamic Island - iPhone 16 Pro */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                                <div
                                    className="relative flex items-center justify-center transition-all duration-300 ease-spring"
                                    style={{
                                        width: "90px",
                                        height: "26px",
                                        background: "#000000",
                                        borderRadius: "20px",
                                    }}
                                >
                                    {/* Camera lens reflection */}
                                    <div className="absolute right-3 w-3 h-3 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d29]/60 backdrop-blur-sm" />
                                        <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-blue-400/30 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Home indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
                                <div className="w-32 h-1.5 rounded-full bg-white/40 backdrop-blur-md" />
                            </div>

                            {/* Screen gloss/reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Side buttons - Action Button + Vol */}
                <div className="absolute left-[-2px] top-[100px] w-[3px] h-[24px] bg-[#686663] rounded-l-sm" /> {/* Action Btn */}
                <div className="absolute left-[-2px] top-[140px] w-[3px] h-[40px] bg-[#686663] rounded-l-sm" /> {/* Vol Up */}
                <div className="absolute left-[-2px] top-[190px] w-[3px] h-[40px] bg-[#686663] rounded-l-sm" /> {/* Vol Down */}
                <div className="absolute right-[-2px] top-[130px] w-[3px] h-[65px] bg-[#686663] rounded-r-sm" /> {/* Power */}
            </div>
        </div>
    );
}
