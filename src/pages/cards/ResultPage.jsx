
import logo from '../../../static/friend_circle.svg';
import FlippableCard from './FlipCard';
const ResultPage = () => {

    const cards = [
        {
            id: 1,
            title: 'Card 1',
            description: 'Description 1',
            cardDescription: 'Card Description 1',
            coverImg: logo,
        },
        {
            id: 2,
            title: 'Card 2',
            description: 'Description 2',
            cardDescription: 'Card Description 2',
            coverImg: logo,
        },
        {
            id: 3,
            title: 'Card 3',
            description: 'Description 3',
            cardDescription: 'Card Description 3',
            coverImg: logo,
        },
    ]

    return (
        <div className='flex justify-center items-center h-full'>

            <div className='grid'>
                {cards.map((card, i) => {
                    return (
                        <div key={card.id} className='' style={{ gridColumn: 1, gridRow: 1 }}>
                            <FlippableCard index={i} />
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default ResultPage;