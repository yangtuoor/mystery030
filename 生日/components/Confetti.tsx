
import React, { useState, useEffect } from 'react';

interface ConfettiPiece {
    id: number;
    style: React.CSSProperties;
    color: string;
}

const generateConfetti = (count = 80): ConfettiPiece[] => {
    const colors = ['bg-pink-400', 'bg-purple-400', 'bg-sky-300', 'bg-teal-300', 'bg-yellow-200', 'bg-rose-300', 'bg-white'];
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * 360;
        const distance = Math.random() * 200 + 150; // pixels
        const x = Math.cos(angle * Math.PI / 180) * distance;
        const y = Math.sin(angle * Math.PI / 180) * distance;
        const rotation = Math.random() * 720 - 360;
        const delay = Math.random() * 400; // ms
        const duration = Math.random() * 1500 + 1500; // ms
        pieces.push({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            style: {
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(1)`,
                transition: `transform ${duration}ms cubic-bezier(0.1, 1, 0.3, 1), opacity ${duration}ms ease-out`,
                transitionDelay: `${delay}ms`,
            },
        });
    }
    return pieces;
};

const confettiPieces = generateConfetti();

const Confetti: React.FC = () => {
    const [isBursting, setIsBursting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsBursting(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {confettiPieces.map(({ id, style, color }) => (
                <div
                    key={id}
                    className={`absolute w-3 h-3 rounded-sm ${color} transition-all`}
                    style={isBursting ? { ...style, opacity: 0 } : { transform: 'scale(0)', opacity: 1 }}
                />
            ))}
        </div>
    );
};

export default Confetti;