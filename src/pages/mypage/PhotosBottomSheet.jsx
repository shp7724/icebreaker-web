import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, forwardRef, useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import ImageUploadButton from "./ImageUploadButton";

const PhotosBottomSheet = forwardRef(function PhotosBottomSheet({ badgesRef }, ref) {
    const controls = useAnimation();
    const [isDone, setIsDone] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const variants = {
        hidden: { y: '100%', opacity: 0 },
        visible: { y: '0%', opacity: 1 },
        done: () => ({ y: calculateDeltaYForDone(), borderRadius: '0' })
    };

    const transitionToDone = useCallback(async () => {
        await controls.start('done');
        setIsDone(true);
    }, [controls]);

    useEffect(() => {
        if (selectedImages.length > 0) {
            const timeout = setTimeout(() => {
                transitionToDone();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [selectedImages, controls, transitionToDone]);

    useEffect(() => {
        controls.start('visible');
    }, [controls]);


    const calculateDeltaYForDone = () => {
        const sheetRect = ref.current.getBoundingClientRect();
        const badgesRect = badgesRef.current.getBoundingClientRect();
        return badgesRect.bottom - sheetRect.top;
    }

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
                    {selectedImages.length == 0 && (
                        <div className="flex flex-col justify-center items-center">
                            <div
                                className="text-background-primary text-2xl font-semibold mt-10 mb-4">
                                나를 설명하는 사진이 있나요?
                            </div>
                            <ImageUploadButton onImagesSelected={setSelectedImages} imgClassName='opacity-90' />
                        </div>
                    )}
                    {
                        selectedImages.length > 0 && (
                            <div className="py-10 ">
                                <div className="relative">
                                    <div className="flex overflow-x-auto gap-x-4">
                                        {selectedImages.map((photo, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(photo)}
                                                className="h-32 w-32 object-cover rounded-lg first:ml-6 last:mr-6"
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute -top-3 right-3">
                                        <ImageUploadButton onImagesSelected={(moreFiles) => {
                                            setSelectedImages([...selectedImages, ...moreFiles]);
                                        }} imgClassName="h-8 bg-[#C9D9E9] p-1 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </motion.div>
        </>
    );
});

PhotosBottomSheet.propTypes = {
    badgesRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
};




export default PhotosBottomSheet;
