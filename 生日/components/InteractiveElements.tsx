
import React, { useState } from 'react';

type ElementType = 'balloon' | 'star' | 'popper';

interface InteractiveElementProps {
    type: ElementType;
    initialStyle: React.CSSProperties;
}

const generatePopperConfetti = (count = 30): any[] => {
    const pieces = [];
    const colors = ['bg-pink-400', 'bg-purple-400', 'bg-sky-300', 'bg-teal-300', 'bg-yellow-200', 'bg-rose-300'];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 180 - 135; // Shoots them upwards in a 90 degree arc
        const distance = Math.random() * 80 + 50; // How far they fly
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        const rotation = Math.random() * 720 - 360;
        const duration = Math.random() * 800 + 600;

        pieces.push({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            style: {
                '--transform-end': `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(0)`,
                animation: `popper-confetti-fly ${duration}ms ease-out forwards`,
            }
        });
    }
    return pieces;
};

const InteractiveElement: React.FC<InteractiveElementProps> = ({ type, initialStyle }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [confettiPieces, setConfettiPieces] = useState<any[]>([]);

    const handleClick = () => {
        if (isClicked) return;
        setIsClicked(true);
        
        if (type === 'popper') {
            setConfettiPieces(generatePopperConfetti());
            setTimeout(() => {
                setIsClicked(false);
                setConfettiPieces([]);
            }, 1500);
        } else if (type !== 'balloon') {
             setTimeout(() => setIsClicked(false), 1000);
        }
    };

    let content;
    let clickedClass = '';
    let message = null;

    switch (type) {
        case 'balloon':
            content = '🎈';
            clickedClass = isClicked ? 'animate-pop' : '';
            message = isClicked ? '耶!' : null;
            break;
        case 'star':
            content = '⭐';
            clickedClass = isClicked ? 'animate-shine' : '';
            message = isClicked ? '闪耀!' : null;
            break;
        case 'popper':
            content = '🎉';
            clickedClass = isClicked ? 'animate-explode' : '';
            message = isClicked ? '砰!' : null;
            break;
    }

    return (
        <div 
            className={`absolute cursor-pointer text-4xl transition-opacity duration-300 ${isClicked && type === 'balloon' ? 'opacity-0' : 'opacity-100'} animate-float`}
            style={initialStyle}
            onClick={handleClick}
        >
            <div className={`relative ${clickedClass}`}>
                {content}
                {type === 'popper' && confettiPieces.map(p => (
                    <div key={p.id} className={`absolute top-1/2 left-1/2 w-2 h-2 ${p.color} rounded-sm`} style={p.style} />
                ))}
            </div>
            {message && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-lg text-pink-600 font-bold animate-fade-out-up-msg">
                    {message}
                </span>
            )}
        </div>
    );
};

const InteractiveElements: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes pop {
                    0% { transform: scale(1); }
                    100% { transform: scale(2.5); }
                }
                .animate-pop {
                    animation: pop 0.3s ease-out forwards;
                }
                 @keyframes shine {
                    0%, 100% { transform: scale(1); filter: brightness(1); }
                    50% { transform: scale(1.5); filter: brightness(2); }
                }
                .animate-shine {
                    animation: shine 0.8s ease-in-out;
                }
                 @keyframes explode {
                    0% { transform: rotate(0deg) scale(1); }
                    25% { transform: rotate(15deg) scale(1.2); }
                    50% { transform: rotate(-10deg) scale(1.2); }
                    75% { transform: rotate(5deg) scale(1.2); }
                    100% { transform: rotate(0deg) scale(1); }
                }
                .animate-explode {
                    animation: explode 0.5s ease-out;
                }
                 @keyframes fade-out-up-msg {
                    0% { opacity: 1; transform: translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
                }
                .animate-fade-out-up-msg {
                    animation: fade-out-up-msg 1s ease-out forwards;
                }
                @keyframes popper-confetti-fly {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: var(--transform-end); opacity: 0; }
                }
            `}</style>
            <InteractiveElement type="star" initialStyle={{ top: '15%', left: '10%', animationDelay: '0.2s' }} />
            <InteractiveElement type="star" initialStyle={{ top: '15%', right: '10%', animationDelay: '0.2s' }} />
            <InteractiveElement type="popper" initialStyle={{ bottom: '15%', left: '10%', animationDelay: '0.7s' }} />
            <InteractiveElement type="popper" initialStyle={{ bottom: '15%', right: '10%', animationDelay: '0.7s' }} />
        </div>
    );
};

export default InteractiveElements;
