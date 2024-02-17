import { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const transition = { type: 'spring', stiffness: 140, damping: 15 };
const rotateDegrees = [7, 0, -7, 5, -5];
const FlippableCard = ({ index, zIndex, handleDragEnd, card }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const onDragEnd = () => {
        setIsFlipped(false);
        handleDragEnd(index);
    }

    return (
        <motion.div
            id={`flippable-card-${index}-${zIndex}`}
            className={classNames('flex justify-center')}
            drag
            onDragEnd={onDragEnd}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            animate={{ rotate: isFlipped ? 0 : rotateDegrees[index % rotateDegrees.length] }}
            style={{ zIndex: zIndex }}
        >
            <motion.div
                className="w-[281px] h-[392px] relative text-white flex justify-center items-center cursor-pointer"
                onTap={flipCard}
                animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.4 : 1 }}
                transition={transition}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <CardSide className='rotate-y-0 overflow-hidden'>
                    <img src={card.coverImg} />
                </CardSide>
                <CardSide className='rotate-y-180 overflow-hidden' >
                    <div className='bg-[#5C739B] w-full h-full'>
                    </div>
                </CardSide>
            </motion.div>
        </motion.div>
    );
};

const CardSide = ({ children, className }) => {
    return (
        <motion.div
            className={classNames('absolute w-full h-full top-0 left-0 rounded-2xl shadow-lg', className)}
            style={{ backfaceVisibility: 'hidden' }}
        >
            {children}
        </motion.div>
    )
}

FlippableCard.propTypes = {
    index: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired
};

CardSide.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default FlippableCard;
