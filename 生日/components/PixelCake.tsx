
import React, { useState, useEffect, useRef } from 'react';

interface PixelCakeProps {
    isLit: boolean;
    onBlowCandle?: () => void;
}

const PixelCake: React.FC<PixelCakeProps> = ({ isLit, onBlowCandle }) => {
    const [visible, setVisible] = useState(false);
    const cakeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleCakeClick = () => {
        // Only allow rotation on the cake, not the candle, and ensure the element exists.
        if (!isLit && cakeRef.current) {
            const cakeElement = cakeRef.current;
            
            // Remove the animation class to allow it to be re-added
            cakeElement.classList.remove('animate-rotate-one-turn');
            
            // This is a trick to trigger a DOM reflow, which is necessary to restart the CSS animation
            void cakeElement.offsetWidth;
            
            // Add the class back to trigger the animation again
            cakeElement.classList.add('animate-rotate-one-turn');
        }
    };
    
    // 'CAKE' step: Show a lit candle
    if (isLit) {
        return (
            <div className={`relative flex flex-col items-center transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} z-30`}>
                <div 
                    className="text-9xl cursor-pointer animate-pulse"
                    onClick={onBlowCandle}
                    style={{ filter: 'drop-shadow(0 0 15px rgba(254, 240, 138, 0.9)) drop-shadow(0 0 30px rgba(252, 165, 165, 0.7))' }}
                >
                    🕯️
                </div>
                <p className="mt-6 text-xl text-white/80 font-semibold tracking-wider">
                    点击蜡烛许个愿!
                </p>
            </div>
        );
    }

    // 'CELEBRATE' step: Show the cake
    return (
        <div className={`relative flex flex-col items-center transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} animate-sway-reverse`}>
             <style>{`
                @keyframes sway-reverse {
                    0%, 100% { transform: rotate(2deg); }
                    50% { transform: rotate(-2deg); }
                }
                .animate-sway-reverse {
                    animation: sway-reverse 4s ease-in-out infinite;
                }
                @keyframes rotate-one-turn {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
                .animate-rotate-one-turn {
                    animation: rotate-one-turn 1s ease-in-out;
                }
            `}</style>
            
            <div 
                ref={cakeRef}
                className={`text-[18rem] md:text-[22rem] transition-all duration-500`} 
                style={{ cursor: 'pointer' }}
                onClick={handleCakeClick}
            >
                🎂
            </div>
        </div>
    );
};

export default PixelCake;