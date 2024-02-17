import FlippableCard from './FlipCard';
import { useState } from 'react';
import cards from './cards';

const ResultPage = () => {
    const [zIndices, setZIndices] = useState(Array(cards.length).fill(0).map((_, i) => i));

    const handleDragEnd = (cardIndex) => {
        setZIndices(prevZIndices => {
            return prevZIndices.map((zIndex, index) => {
                if (index === cardIndex) return 0;
                if (zIndex < prevZIndices[cardIndex]) return zIndex + 1;
                return zIndex;
            });
        });
    }

    return (
        <div className='flex justify-center items-center flex-col h-full'>
            <div className='text-slate-500 font-semibold mb-16 text-xl'>
                두 분의 친구 카드가 도착했어요
            </div>
            <div className='grid'>
                {cards.map((card, i) => (
                    <div key={card.id} style={{ gridColumn: 1, gridRow: 1, zIndex: zIndices[i] }}>
                        <FlippableCard
                            index={i}
                            zIndex={zIndices[i]}
                            card={card}
                            handleDragEnd={handleDragEnd}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultPage;