import { useEffect, useState } from 'react';
import FlippableCard from './FlipCard';
import cards from './cards';
import { useCallback } from 'react';
import { baseUrl } from '../../baseUrl';
import Cookies from 'js-cookie';
import { useQuery } from '../loading/LoadingPage';

const ResultPage = () => {
    const query = useQuery();
    const meetUpId = query.get('meetUpId');
    const [zIndices, setZIndices] = useState(Array(cards.length).fill(0).map((_, i) => i));
    const [streamJsonData, setStreamJsonData] = useState(null);

    const handleDragEnd = (cardIndex) => {
        setZIndices(prevZIndices => {
            return prevZIndices.map((zIndex, index) => {
                if (index === cardIndex) return 0;
                if (zIndex < prevZIndices[cardIndex]) return zIndex + 1;
                return zIndex;
            });
        });
    }

    const streamData = useCallback(async () => {
        if (!meetUpId) return;
        const response = await fetch(`${baseUrl}/api/v1/icebreaking/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/stream+json',
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify({
                'id': meetUpId
            })
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            try {
                const json = JSON.parse(chunk);
                setStreamJsonData(json);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
            return reader.read().then(processText);
        });
    }, [meetUpId]);

    useEffect(() => {
        streamData();
    }, [streamData]);

    return (
        <div className='flex justify-center items-center flex-col h-full select-none'>
            <div className='text-slate-500 font-semibold mb-16 text-xl'>
                두 분의 친구 카드가 도착했어요
            </div>
            <div className='grid'>
                {streamJsonData && streamJsonData.result.map((card, i) => (
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