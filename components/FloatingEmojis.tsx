
import React, { useState, useEffect, useCallback } from 'react';

interface FloatingElement {
    id: number;
    content: string;
    type: 'emoji' | 'balloon';
    style: React.CSSProperties;
    isPopped: boolean;
}

const emojiTypes = [
    { type: 'emoji' as 'emoji', content: '🥳' },
    { type: 'balloon' as 'balloon', content: '🎈' }
];
const elementCount = 30;

const generateElements = (): FloatingElement[] => {
    return Array.from({ length: elementCount }).map((_, i) => {
        const chosenEmoji = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
        return {
            id: i,
            ...chosenEmoji,
            isPopped: false,
            style: {
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1.5}rem`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                // Use a negative delay to make elements appear scattered from the start
                animationDelay: `-${Math.random() * 15}s`,
                opacity: Math.random() * 0.7 + 0.3,
            }
        };
    });
};

const FloatingEmojis: React.FC = () => {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        setElements(generateElements());
    }, []);

    const handlePop = useCallback((id: number) => {
        setElements(prevElements =>
            prevElements.map(el =>
                el.id === id ? { ...el, isPopped: true } : el
            )
        );
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <style>{`
                @keyframes floatUp {
                    from {
                        transform: translateY(10vh);
                    }
                    to {
                        transform: translateY(-110vh);
                    }
                }
                .floating-element {
                    position: absolute;
                    bottom: -10vh;
                    animation-name: floatUp;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                @keyframes pop-animation {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .animate-pop {
                    animation: pop-animation 0.3s ease-out forwards;
                }
                @keyframes fade-out-up-msg {
                    0% { opacity: 1; transform: translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
                }
                .animate-fade-out-up-msg {
                    animation: fade-out-up-msg 1s ease-out forwards;
                }
            `}</style>
            {elements.map((el) => (
                <div
                    key={el.id}
                    className={`
                        floating-element
                        ${el.type === 'balloon' && !el.isPopped ? 'cursor-pointer pointer-events-auto' : ''}
                    `}
                    style={el.style}
                    onClick={() => {
                        if (el.type === 'balloon' && !el.isPopped) {
                            handlePop(el.id);
                        }
                    }}
                >
                    <div className={el.isPopped ? 'animate-pop' : ''}>
                        {el.content}
                    </div>

                    {el.isPopped && el.type === 'balloon' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span 
                                className="text-xl text-white font-bold animate-fade-out-up-msg"
                                style={{ textShadow: '0 0 5px rgba(236, 72, 153, 0.8)' }}
                            >
                                砰!
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FloatingEmojis;
