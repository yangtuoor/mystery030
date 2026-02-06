
import React, { useState, useEffect } from 'react';

interface GiftBoxProps {
    onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
    const [visible, setVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpening, setIsOpening] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpening) {
            const timer = setTimeout(onOpen, 1000); // Wait for animation to finish
            return () => clearTimeout(timer);
        }
    }, [isOpening, onOpen]);

    const handleOpenClick = () => {
        if (!isOpening) {
            setIsOpening(true);
        }
    };

    return (
        <div 
            className={`flex flex-col items-center group transform transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${isOpening ? 'animate-box-fade-out' : ''}`}
            style={{ cursor: isOpening ? 'default' : 'pointer' }}
            onClick={handleOpenClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style>{`
                @keyframes open-lid-animation {
                    to { transform: translateY(-50%) rotate(-35deg) translateX(-20%); }
                }
                .animate-open-lid {
                    transform-origin: bottom left;
                    animation: open-lid-animation 0.7s ease-in-out forwards;
                }
                @keyframes box-fade-out-animation {
                    from { opacity: 1; transform: scale(1); }
                    to { opacity: 0; transform: scale(0.95); }
                }
                .animate-box-fade-out {
                    animation: box-fade-out-animation 0.5s ease-in forwards 0.5s;
                }
            `}</style>
            <div className={`relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-300 ease-in-out ${isHovered && !isOpening ? '-translate-y-2' : ''}`}>
                {/* Lid */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-12 bg-pink-500 rounded-t-lg shadow-lg z-20 ${isOpening ? 'animate-open-lid' : ''}`}>
                    {/* Horizontal Ribbon */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 bg-yellow-200/90"></div>
                    {/* Vertical Ribbon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-yellow-200"></div>
                </div>
                 {/* Lid Bow */}
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-yellow-100 rounded-full transform -rotate-45 transition-transform duration-300 z-30 ${isHovered ? 'scale-110' : ''} ${isOpening ? 'animate-open-lid' : ''}`}></div>
                <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-yellow-100 rounded-full transform rotate-45 transition-transform duration-300 z-30 ${isHovered ? 'scale-110' : ''} ${isOpening ? 'animate-open-lid' : ''}`}></div>

                {/* Box Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[calc(100%-2rem)] bg-pink-400 rounded-b-lg shadow-xl flex items-center justify-center">
                     <div className="w-8 h-full bg-yellow-200"></div>
                </div>
            </div>
            <p className="mt-6 text-xl text-pink-900/80 font-semibold tracking-wider group-hover:text-pink-600 transition-colors duration-300">
                点击打开!
            </p>
        </div>
    );
};

export default GiftBox;