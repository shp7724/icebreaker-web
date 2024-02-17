
import logo from '../../../static/friend_circle.svg';
import FlippableCard from './FlipCard';
import { useState } from 'react';

const ResultPage = () => {
    const [cards, setCards] = useState([
        { id: 1, title: 'Card 1', description: 'Description 1', cardDescription: 'Card Description 1', coverImg: logo },
        { id: 2, title: 'Card 2', description: 'Description 2', cardDescription: 'Card Description 2', coverImg: logo },
        { id: 3, title: 'Card 3', description: 'Description 3', cardDescription: 'Card Description 3', coverImg: logo },
    ]);

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
        <div className='flex justify-center items-center h-full'>
            <div className='grid'>
                {cards.map((card, i) => (
                    <div key={card.id} style={{ gridColumn: 1, gridRow: 1, zIndex: zIndices[i] }}>
                        <FlippableCard
                            index={i}
                            zIndex={zIndices[i]}
                            handleDragEnd={handleDragEnd}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultPage;