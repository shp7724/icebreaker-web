import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
const transition = { type: 'spring', stiffness: 140, damping: 15 };

const FlippableCard = ({ index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };
    console.log(index);

    const rotateDegress = [7, 0, -7, 5, -5]

    return (
        <div className={classNames(`flex justify-center`)}
        >
            <div style={{
                transform: `rotate(${rotateDegress[index]}deg)`,
            }}>
                <motion.div
                    className="w-64 h-64 relative text-white flex justify-center items-center cursor-pointer"
                    onClick={flipCard}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={transition}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <CardSide className='rotate-y-0 bg-red-500' />
                    <CardSide className='rotate-y-180 bg-blue-500' />
                </motion.div>
            </div>
        </div >
    );
};

const CardSide = ({ children, className }) => {
    return (
        <motion.div
            className={classNames('absolute w-full h-full bg-blue-500 top-0 left-0 rounded-2xl shadow-lg', className)}
            style={{ backfaceVisibility: 'hidden' }}
        >
            {children}
        </motion.div>
    )
}

export default FlippableCard;
