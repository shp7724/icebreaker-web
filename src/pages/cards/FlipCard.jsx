import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
const transition = { type: 'spring', stiffness: 140, damping: 15 };
const rotateDegrees = [7, 0, -7, 5, -5];

const FlippableCard = ({ index, zIndex, handleDragEnd }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };


    return (
        <motion.div
            id={`flippable-card-${index}-${zIndex}`}
            className={classNames('flex justify-center')}
            drag
            onDragEnd={() => handleDragEnd(index)}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            style={{ rotate: rotateDegrees[index % rotateDegrees.length], zIndex: zIndex }}
        >
            <motion.div
                className="w-64 h-64 relative text-white flex justify-center items-center cursor-pointer"
                onTap={flipCard}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <CardSide className='rotate-y-0 bg-red-500'>{index} {zIndex}</CardSide>
                <CardSide className='rotate-y-180 bg-blue-500' >{index} {zIndex}</CardSide>
            </motion.div>
        </motion.div>
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
