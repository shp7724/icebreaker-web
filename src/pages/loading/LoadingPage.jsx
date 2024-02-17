import Lottie from 'react-lottie';
import animationData from "./loadingLottie"
import { useRef, useEffect } from 'react';

const LoadingPage = () => {
    const lottieRef = useRef(null);

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        const anim = lottieRef.current.anim;
        anim.addEventListener('complete', () => {
            const newDirection = anim.playDirection === 1 ? -1 : 1;
            anim.setDirection(newDirection);
            anim.play();
        });
    }, [lottieRef]);

    return (
        <div className='flex items-center justify-center h-full'>
            <div>

                <div className='text-slate-500 text-2xl font-bold text-center'>
                    친구 카드를 만들고 있어요
                </div>

                <div className='' >
                    <Lottie ref={lottieRef} options={defaultOptions} height={300} width={300} isClickToPauseDisabled />
                </div>
            </div>
        </div>
    );
}

export default LoadingPage;