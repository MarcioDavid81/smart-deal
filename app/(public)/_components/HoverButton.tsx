"use client"

import { useState } from "react";

interface HoverButtonProps {
    children: React.ReactNode;
    className?: string;
    hoverColor?: string;
    baseColor?: string;
    duration?: number;
    onClick?: () => void;
}

const HoverButton: React.FC<HoverButtonProps> = ({
    children,
    className = "",
    hoverColor = "bg-secondary",
    baseColor = "bg-transparent",
    duration = 300,
    onClick
}) => {
    const [isHovered, setIsHovered] = useState(false);
    return ( 
        <button
            className={`relative overflow-hidden px-6 py-3 font-medium border-2 border-secondary rounded-lg ${baseColor} text-gray-800 transition-all duration-300 ease-in-out ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <span className="relative z-10">
                {children}
            </span>
            <div
                className={`absolute top-0 left-0 w-0 h-full ${hoverColor} transition-all duration-300 ease-in-out hover:w-full`}
                style={{ width: isHovered ? "100%" : 0, transitionDuration: `${duration}ms` }}
            />
        </button>
     );
}
 
export default HoverButton;