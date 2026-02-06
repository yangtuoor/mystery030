
import React, { useState } from 'react';
import GiftBox from './components/GiftBox';
import PixelCake from './components/PixelCake';
import Confetti from './components/Confetti';
import BirthdayMusic from './components/BirthdayMusic';
import InteractiveElements from './components/InteractiveElements';
import FloatingEmojis from './components/FloatingEmojis';

type CelebrationStep = 'GIFT' | 'CAKE' | 'CELEBRATE';

const App: React.FC = () => {
    const [step, setStep] = useState<CelebrationStep>('GIFT');

    const handleOpenGift = () => {
        setStep('CAKE');
    };

    const handleBlowCandle = () => {
        setStep('CELEBRATE');
    };

    const textShadowStyle = {
        textShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 15px rgba(236, 72, 153, 0.8), 0 0 25px rgba(236, 72, 153, 0.6)'
    };

    return (
        <main className="relative flex items-center justify-center min-h-screen font-sans overflow-hidden p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300"></div>
            
            {/* Dark overlay for the 'wish' moment */}
            <div className={`absolute inset-0 bg-black/70 z-20 transition-opacity duration-1000 ${step === 'CAKE' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
            
            {/* Emojis only appear after the wish */}
            {step === 'CELEBRATE' && <FloatingEmojis />}
            
            <div className={`${step === 'CAKE' ? 'z-30' : 'z-10'} w-full max-w-lg flex items-center justify-center`}>
                {step === 'GIFT' && <GiftBox onOpen={handleOpenGift} />}
                
                {step === 'CAKE' && <PixelCake isLit={true} onBlowCandle={handleBlowCandle} />}

                {step === 'CELEBRATE' && (
                    <div className="relative flex flex-col items-center justify-center">
                         <style>{`
                            @keyframes sway {
                                0%, 100% { transform: rotate(-2deg); }
                                50% { transform: rotate(2deg); }
                            }
                            .animate-sway {
                                animation: sway 4s ease-in-out infinite;
                            }
                        `}</style>
                        <BirthdayMusic />
                        <PixelCake isLit={false} />
                        <Confetti />
                        <InteractiveElements />
                        <div className="text-center animate-sway mt-4">
                             <h2 
                                className="text-4xl md:text-5xl font-bold text-white tracking-widest mb-2"
                                style={textShadowStyle}
                            >
                                 祝阿姨 
                            </h2>
                            <h1 
                                className="text-5xl md:text-7xl font-bold text-white tracking-widest"
                                style={textShadowStyle}
                            >
                                🥳生日快乐🥳
                            </h1>
                        </div>
                        <p className="text-sm text-pink-800/60 font-medium mt-2">
                            试试点击漂浮的图标!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default App;