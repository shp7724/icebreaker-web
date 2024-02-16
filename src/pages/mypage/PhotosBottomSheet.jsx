import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, forwardRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const PhotosBottomSheet = forwardRef(function PhotosBottomSheet({ badgesRef }, ref) {
    const controls = useAnimation();
    const [isDone, setIsDone] = useState(false);

    const variants = {
        hidden: { y: '100%', opacity: 0 },
        visible: { y: '0%', opacity: 1 },
        done: () => ({ y: calculateDeltaYForDone(), borderRadius: '0' })
    };

    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    const calculateDeltaYForDone = () => {
        const sheetRect = ref.current.getBoundingClientRect();
        const badgesRect = badgesRef.current.getBoundingClientRect();
        return badgesRect.bottom - sheetRect.top;
    }

    const transitionToDone = async () => {
        await controls.start('done');
        setIsDone(true);
    };

    return (
        <>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                variants={variants}
                className={
                    classNames(
                        'md:w-[640px] container mx-auto bg-gradient-to-t from-background-primary via-30% via-background-primary to-[#B4CBE7]',
                        {
                            'fixed bottom-0 h-1/2 rounded-t-3xl': !isDone,
                            'h-96 !transform-none': isDone,
                        }
                    )
                }
            >
                <div>
                    <div className="flex justify-center">
                        <div
                            className="text-background-primary text-2xl font-semibold mt-10">
                            나를 설명하는 사진이 있나요?
                        </div>
                    </div>
                </div>
                <button onClick={transitionToDone} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Transition to Done
                </button>
            </motion.div>
        </>
    );
});

PhotosBottomSheet.propTypes = {
    badgesRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
};

export default PhotosBottomSheet;
