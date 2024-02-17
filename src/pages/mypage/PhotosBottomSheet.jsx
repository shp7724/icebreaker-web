import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, forwardRef, useCallback, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import nextArrow from "../../../static/next_arrow.svg";
import prevArrow from "../../../static/prev_arrow.svg";
import baseURL from "../../baseUrl";
import ImageUploadButton from "./ImageUploadButton";
import Cookies from 'js-cookie';

const PhotosBottomSheet = forwardRef(function PhotosBottomSheet({ badgesRef, handlePhotoUploadFinished }, ref) {
    const controls = useAnimation();
    const [isDone, setIsDone] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const scrollViewRef = useRef();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isOverflown, setIsOverflown] = useState(false);

    const variants = {
        hidden: { y: '100%', opacity: 0 },
        visible: { y: '0%', opacity: 1 },
        done: () => ({ y: calculateDeltaYForDone(), borderRadius: '0' })
    };

    const transitionToDone = useCallback(async () => {
        await controls.start('done');
        setIsDone(true);
        await uploadSelectedImages(selectedImages, `${baseURL}/api/v1/upload`);
        await handlePhotoUploadFinished();
    }, [controls, selectedImages, handlePhotoUploadFinished]);

    async function uploadSelectedImages(selectedImages, uploadUrl) {
        const accessToken = Cookies.get('accessToken');
        const formData = new FormData();
        selectedImages.forEach((image, index) => {
            formData.append(`files`, image);
        });

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json(); // Or handle the response as per your needs
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }


    useEffect(() => {
        if (selectedImages.length > 0) {
            const timeout = setTimeout(() => {
                transitionToDone();
            }, 200);
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

    useEffect(() => {
        if (!scrollViewRef.current) {
            return;
        }

        const checkScrollPosition = () => {
            const { scrollLeft, scrollWidth, clientWidth } = scrollViewRef.current;
            setIsOverflown(scrollWidth > clientWidth);
            if (scrollLeft === 0) {
                setScrollPosition(0);
            } else if (scrollLeft + clientWidth === scrollWidth) {
                setScrollPosition(1);
            } else {
                setScrollPosition(-1);
            }
        };

        const currentRef = scrollViewRef.current;
        currentRef.addEventListener('scroll', checkScrollPosition);

        return () => {
            currentRef.removeEventListener('scroll', checkScrollPosition);
        };
    }, [scrollViewRef, selectedImages]);

    const shouldHideLeftGradient = useCallback(() => {
        console.log(scrollPosition, isOverflown);
        if (isOverflown && scrollPosition === -1) {
            return false;
        }
        return scrollPosition === 0;
    }, [scrollPosition, isOverflown]);

    const shouldHideRightGradient = useCallback(() => {
        if (isOverflown && scrollPosition === -1) {
            return false;
        }
        return scrollPosition === 1;
    }, [scrollPosition, isOverflown]);

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
                                    <div className={classNames("overflow-scroll-gradient",
                                        {
                                            'overflow-scroll-gradient-before-hidden': shouldHideLeftGradient(),
                                            'overflow-scroll-gradient-after-hidden': shouldHideRightGradient(),
                                        })}>
                                        <div ref={scrollViewRef} className="flex overflow-x-auto gap-x-4 mx-8">
                                            {selectedImages.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={URL.createObjectURL(photo)}
                                                    className="h-32 w-32 object-cover rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {!shouldHideRightGradient() && (
                                        <div className="absolute top-12 right-5  ">
                                            <img src={nextArrow} alt="다음" className="" />
                                        </div>
                                    )}
                                    {!shouldHideLeftGradient() && (
                                        <div className="absolute top-12 left-5 ">
                                            <img src={prevArrow
                                            } alt="이전" className="" />
                                        </div>
                                    )}
                                    <div className="absolute -top-3 right-6">
                                        <div className="flex flex-col gap-y-5">
                                            <ImageUploadButton onImagesSelected={(moreFiles) => {
                                                setSelectedImages([...selectedImages, ...moreFiles]);
                                            }} imgClassName="h-8 bg-[#C9D9E9]/50 backdrop-blur-md p-1 rounded-full shadow-sm" />
                                        </div>
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
